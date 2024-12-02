package com.example.application.service;

import com.example.application.config.Authentication.JwtGenerator;
import com.example.application.dto.response.PaymentLink;
import com.example.application.entity.*;
import com.example.application.repository.payment.PaymentRepository;
import com.example.application.service.product.CartService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PaymentService {
    APIContext apiContext;
    JwtGenerator jwtGenerator;
    PaymentRepository paymentRepository;
    OrderService orderService;
    CartService cartService;

    // Create PayPal link for online payment
    public void savePayment(Orders orders, String transactionId, PaymentMethod paymentMethod) {
        var payment = Payments.builder()
                              .orders(orders)
                              .amount(orders.getTotal())
                              .paymentMethod(paymentMethod)
                              .transactionId(transactionId)
                              .build();

        paymentRepository.save(payment);
    }

    public PaymentLink createPayment(Orders orders, List<Long> selectedCartItems) {
        Cart cart = orders.getPerson().getCart();
        Set<CartItem> cartItems = cart.getCartItems();
        Set<CartItem> cartItemsToDelete = new HashSet<>();

        Set<Long> selectedItemsSet = new HashSet<>(selectedCartItems);

        // Iterate through cart items and add to the delete set if their ID matches an order item ID
        for (CartItem cartItem : cartItems) {
            if (selectedItemsSet.contains(cartItem.getId())) {
                cartItemsToDelete.add(cartItem);
            }
        }
        // Update product stock and sold quantity
        orders.getOrderItems().forEach(orderItem -> {
            orderItem.getProduct().setStockQuantity(
                    orderItem.getProduct().getStockQuantity() - orderItem.getQuantity());
            orderItem.getProduct().setSoldQuantity(
                    orderItem.getProduct().getSoldQuantity() + orderItem.getQuantity());
        });


        orderService.saveOrder(orders);
        cartService.deleteCartItems(cart.getId(), cartItemsToDelete);

        return PaymentLink.builder().paymentUrl("cod").orderId(orders.getId().toString()).build();
    }

    public PaymentLink createPaypalPayment(Orders orders, List<Long> selectedCartItems) {
        try {
            Person person = orders.getPerson();
            String jwt = jwtGenerator.generatePaypalToken(person);

            final String cancelUrl = "http://localhost:8080/payment/cancel";

            String selectedItemsString = selectedCartItems.stream()
                                                          .map(String::valueOf) // Convert each Long to String
                                                          .collect(Collectors.joining(",")); // Join with commas
            String encodedSelectedItems = URLEncoder.encode(selectedItemsString, StandardCharsets.UTF_8);

            final String successUrl = "http://localhost:8080/payment/success?orderId=%s&accessToken=%s&selectedItems=%s".formatted(
                    orders.getId(), jwt, encodedSelectedItems);
            Payment payment = createPaypalLink(
                    orders.getTotal(), "USD", "paypal", "sale", "Payment description",
                    cancelUrl, successUrl);

            return payment.getLinks().stream()
                          .filter(link -> "approval_url".equals(link.getRel()))
                          .findFirst()
                          .map(link -> PaymentLink.builder().paymentUrl(link.getHref())
                                                  .build())
                          .orElse(null);
        } catch (PayPalRESTException | ClassCastException e) {
            return PaymentLink.builder().paymentUrl("").build();
        }
    }

    public Payment createPaypalLink(BigDecimal total, String currency, String method, String intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription(description);

        List<Transaction> transactions = List.of(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(new Payer().setPaymentMethod(method));
        payment.setTransactions(transactions);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public void executePaypalPayment(String paymentId, String payerId, String orderId, String selectedItems) throws PayPalRESTException, UnsupportedEncodingException {
        // Update order status and product stock
        String decodedItems = URLDecoder.decode(selectedItems, StandardCharsets.UTF_8);

        // Split the decoded string into an array and convert to List<Long>
        List<Long> itemList = Arrays.stream(decodedItems.split(","))
                                    .map(Long::valueOf) // Convert each string to Long
                                    .toList();

        Orders orders = orderService.findById(Long.parseLong(orderId));
        Payments payments = orders.getPayment();
        Cart cart = orders.getPerson().getCart();
        Set<CartItem> cartItems = cart.getCartItems();
        Set<CartItem> cartItemsToDelete = new HashSet<>();

        // Create a set of order item IDs for quick lookup
        Set<Long> selectedItemsSet = new HashSet<>(itemList);

        // Iterate through cart items and add to the delete set if their ID matches an order item ID
        for (CartItem cartItem : cartItems) {
            if (selectedItemsSet.contains(cartItem.getId())) {
                cartItemsToDelete.add(cartItem);
            }
        }

        // Update product stock and sold quantity
        orders.getOrderItems().forEach(orderItem -> {
            orderItem.getProduct().setStockQuantity(
                    orderItem.getProduct().getStockQuantity() - orderItem.getQuantity());
            orderItem.getProduct().setSoldQuantity(
                    orderItem.getProduct().getSoldQuantity() + orderItem.getQuantity());
        });

        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);

        try {
            payment.execute(apiContext, paymentExecute);
            payment = Payment.get(apiContext, paymentId);
        } catch (PayPalRESTException e) {
            // Log error and throw a custom exception to trigger rollback
            orders.setStatus(OrderStatus.CANCELLED);
            payments.setStatus(PaymentStatus.FAILED);
            throw new PayPalRESTException("Error executing payment", e);
        }

        if ("approved".equals(payment.getState())) {
            List<Transaction> transactions = payment.getTransactions();
            if (transactions != null && !transactions.isEmpty()) {
                Transaction transaction = transactions.getFirst(); // Get the first transaction
                List<RelatedResources> relatedResources = transaction.getRelatedResources();
                if (relatedResources != null && !relatedResources.isEmpty()) {
                    Sale sale = relatedResources.getFirst().getSale(); // Get the sale resource
                    if (sale != null) {
                        String transactionId = sale.getId(); // This is your sandbox transaction ID

                        // Update the payment with the transaction ID
                        payments.setStatus(PaymentStatus.PAID);
                        payments.setTransactionId(transactionId);
                        payments.setOrders(orders);
                        paymentRepository.save(payments);
                        cartService.deleteCartItems(cart.getId(), cartItemsToDelete);
                    } else {
                        System.out.println("Sale not found in related resources.");
                    }
                } else {
                    System.out.println("No related resources found.");
                }
            } else {
                System.out.println("No transactions found in payment.");
            }
        } else {
            orderService.deleteOrder(orders);
            throw new PayPalRESTException("Payment not approved");
        }
    }
}
