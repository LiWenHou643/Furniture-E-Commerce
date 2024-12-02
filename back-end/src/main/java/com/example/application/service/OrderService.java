package com.example.application.service;

import com.example.application.dto.request.OrderRequest;
import com.example.application.dto.response.*;
import com.example.application.entity.*;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.example.application.repository.order.OrderRepository;
import com.example.application.repository.order.OrderTrackHistoryRepository;
import com.example.application.repository.payment.PaymentRepository;
import com.example.application.repository.person.PersonRepository;
import com.example.application.service.product.CodeService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.application.mapper.OrderMapper.ORDER_MAPPER;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    CodeService codeService;
    PersonRepository personRepository;
    OrderTrackHistoryRepository orderTrackHistoryRepository;
    PaymentRepository paymentRepository;

    public Orders findById(Long id) {
        return orderRepository.findById(id)
                              .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    public OrderResponse getOrderById(Long id) {
        Orders orders = findById(id);
        var sortedOrderItems = orders.getOrderItems()
                                     .stream()
                                     .sorted(Comparator.comparing(OrderItem::getId))
                                     .map(ORDER_MAPPER::toOrderItemResponse)
                                     .collect(Collectors.toList());

        var orderDTO = ORDER_MAPPER.toOrderResponse(orders);
        orderDTO.setOrderItems(sortedOrderItems);
        return orderDTO;
    }

    public List<OrderResponse> getAllByPersonId(Long personId) {
        return orderRepository.findAllByPersonIdOrderByCreatedAtDesc(personId)
                              .stream()
                              .map(order -> {
                                  // Sort order items by ID
                                  List<OrderItemResponse> sortedOrderItems = order.getOrderItems()
                                                                                  .stream()
                                                                                  .map(ORDER_MAPPER::toOrderItemResponse)
                                                                                  .sorted(Comparator.comparing(OrderItemResponse::getId))
                                                                                  .collect(Collectors.toList());

                                  // Map the order to an OrderResponse, setting the sorted order items
                                  OrderResponse orderResponse = ORDER_MAPPER.toOrderResponse(order);
                                  // Log only the IDs of each OrderItemResponse
                                  List<Long> orderItemIds = sortedOrderItems.stream()
                                                                            .map(OrderItemResponse::getId) // Extract IDs
                                                                            .collect(Collectors.toList()); // Collect as a list
                                  log.info("OrderResponse Item IDs: {}", orderItemIds); // Log the list of IDs
                                  orderResponse.setOrderItems(sortedOrderItems); // assuming you have a setter for orderItems

                                  return orderResponse;
                              })
                              .collect(Collectors.toList());
    }


    @Transactional
    public Orders createOrder(OrderRequest req) {
        Person person = personRepository.findById(req.personId())
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Code code = req.promoCode().isEmpty() ? null : codeService.checkCode(req.promoCode());
        BigDecimal percent = code == null ? BigDecimal.ZERO : code.getValue();

        List<Long> reqCartItemIds = req.selectedCartItems();
        Set<OrderItem> orderItems = new HashSet<>();
        // Get cart items from cart
        Cart cart = person.getCart();
        Set<CartItem> cartItems = (cart.getCartItems());
        // Convert cart items to map for easy access
        Map<Long, CartItem> cartItemMap = cartItems.stream()
                                                   .collect(Collectors.toMap(CartItem::getId,
                                                           cartItem -> cartItem));
        // Collect insufficient stock errors
        List<String> insufficientStockErrors = new ArrayList<>();

        Orders orders = new Orders();
        for (Long id : reqCartItemIds) {
            CartItem cartItem = cartItemMap.get(id);
            if (cartItem == null) {
                throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
            }

            Product product = cartItem.getProduct();
            int requestedQuantity = cartItem.getQuantity();

            if (product.getStockQuantity() < requestedQuantity) {
                insufficientStockErrors.add(
                        String.format("Product '%s': Available: %d, Requested: %d",
                                product.getTitle(), product.getStockQuantity(), requestedQuantity)
                );
            } else {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrders(orders);
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setPrice(cartItem.getPrice());
                orderItem.setDiscountPercentage(cartItem.getDiscountPercentage());
                orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
                orderItem.setTotalPrice(cartItem.getTotalPrice());

                orderItems.add(orderItem);
                // Remove the item from the cart items list
                cartItemMap.remove(cartItem.getProduct().getId()); // Remove from the map as well
            }
        }

        // Throw exception if any stock issues exist
        if (!insufficientStockErrors.isEmpty()) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK, String.join(". \n", insufficientStockErrors));
        }

        if (orderItems.isEmpty() || cartItems.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }

        // Calculate subtotal
        BigDecimal subTotal = orderItems.stream()
                                        .map(OrderItem::getTotalPrice)
                                        .reduce(BigDecimal.ZERO, BigDecimal::add);
        // Calculate discount
        BigDecimal discount = subTotal.multiply(percent.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP));

        orders.setPerson(person);
        orders.setShippingAddress(req.shippingAddress());
        orders.setNotes(req.notes());
        orders.setPromoCode(req.promoCode());
        orders.setSubTotal(subTotal);
        orders.setShipCost(req.shipCost());
        orders.setDiscountPercentage(percent);
        orders.setTotal(subTotal.subtract(discount).add(req.shipCost()));
        orders.setOrderItems(orderItems);

        // Save the order
        var savedOrder = saveOrder(orders);
        var orderTrackHistory = OrderTrackHistory.builder()
                                                 .orderId(savedOrder.getId())
                                                 .status(OrderStatus.PENDING)
                                                 .build();
        orderTrackHistoryRepository.save(orderTrackHistory);

        return savedOrder;
    }

    public Orders saveOrder(Orders orders) {
        return orderRepository.save(orders);
    }

    public List<OrderResponse> listOrder() {
        List<Orders> orders = orderRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
        return orders.stream()
                     .map(ORDER_MAPPER::toOrderResponse)
                     .collect(Collectors.toList());
    }

    public OrderResponse cancelOrder(Long id) {
        Orders orders = findById(id);
        orders.setStatus(OrderStatus.CANCELLED);
        var trackHistory = OrderTrackHistory.builder()
                                            .orderId(orders.getId())
                                            .status(OrderStatus.CANCELLED)
                                            .build();
        try {
            saveOrder(orders);
            orderTrackHistoryRepository.save(trackHistory);
            return ORDER_MAPPER.toOrderResponse(orders);
        } catch (Exception e) {
            log.error("Error cancelling order: {}", e.getMessage());
            throw new AppException(ErrorCode.ORDER_CANCEL_FAILED);
        }
    }

    public OrderResponse confirmReceipt(Long id) {
        Orders orders = findById(id);
        orders.setStatus(OrderStatus.FINISHED);
        var trackHistory = OrderTrackHistory.builder()
                                            .orderId(orders.getId())
                                            .status(OrderStatus.FINISHED)
                                            .build();
        orderTrackHistoryRepository.save(trackHistory);
        try {
            saveOrder(orders);
            return ORDER_MAPPER.toOrderResponse(orders);
        } catch (Exception e) {
            log.error("Error confirming receipt: {}", e.getMessage());
            throw new AppException(ErrorCode.ORDER_CONFIRM_FAILED);
        }
    }

    public OrderResponse delivered(Long id) {
        Orders orders = findById(id);
        orders.setStatus(OrderStatus.DELIVERED);
        var trackHistory = OrderTrackHistory.builder()
                                            .orderId(orders.getId())
                                            .status(OrderStatus.DELIVERED)
                                            .build();
        orderTrackHistoryRepository.save(trackHistory);
        var payment = orders.getPayment();
        if (payment != null) {
            payment.setStatus(PaymentStatus.PAID);
        }
        try {
            saveOrder(orders);
            assert payment != null;
            paymentRepository.save(payment);
            return ORDER_MAPPER.toOrderResponse(orders);

        } catch (Exception e) {
            log.error("Error delivering order: {}", e.getMessage());
            throw new AppException(ErrorCode.ORDER_CONFIRM_FAILED);
        }
    }

    public void deleteOrder(Orders orders) {
        orderRepository.delete(orders);
    }

    public List<Object[]> getStatusHistory(Long orderId) {
        return orderTrackHistoryRepository.findStatusHistoryByOrderId(orderId);
    }

    public OrderResponse confirm(Long id) {
        Orders orders = findById(id);
        orders.setStatus(OrderStatus.CONFIRMED);
        var trackHistory = OrderTrackHistory.builder()
                                            .orderId(orders.getId())
                                            .status(OrderStatus.CONFIRMED)
                                            .build();
        orderTrackHistoryRepository.save(trackHistory);
        try {
            saveOrder(orders);
            return ORDER_MAPPER.toOrderResponse(orders);
        } catch (Exception e) {
            log.error("Error confirming order: {}", e.getMessage());
            throw new AppException(ErrorCode.ORDER_CONFIRM_FAILED);
        }
    }

    public OrderResponse ship(Long id) {
        Orders orders = findById(id);
        orders.setStatus(OrderStatus.SHIPPED);
        var trackHistory = OrderTrackHistory.builder()
                                            .orderId(orders.getId())
                                            .status(OrderStatus.SHIPPED)
                                            .build();
        orderTrackHistoryRepository.save(trackHistory);
        try {
            saveOrder(orders);
            return ORDER_MAPPER.toOrderResponse(orders);
        } catch (Exception e) {
            log.error("Error shipping order: {}", e.getMessage());
            throw new AppException(ErrorCode.ORDER_CONFIRM_FAILED);
        }
    }

    public List<OrderCountDTO> getMonthlyTotals() {
        return orderRepository.findMonthlyTotalsForFinishedOrders();
    }

    public Map<String, List<BestSellerDTO>> getTopSellingProductsForLastAndCurrentMonth() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfCurrentMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfLastMonth = startOfCurrentMonth.minusMonths(1);

        // Current Month
        List<BestSellerDTO> currentMonthTopSellers = orderRepository.findTopSellingProducts(startOfCurrentMonth, now,
                PageRequest.of(0, 5));

        // Last Month
        LocalDateTime startOfNextMonth = startOfCurrentMonth.plusMonths(1);
        List<BestSellerDTO> lastMonthTopSellers = orderRepository.findTopSellingProducts(startOfLastMonth,
                startOfNextMonth, PageRequest.of(0, 5));

        // Create a map to hold both lists
        Map<String, List<BestSellerDTO>> topSellersMap = new HashMap<>();
        topSellersMap.put("lastMonth", lastMonthTopSellers);
        topSellersMap.put("currentMonth", currentMonthTopSellers);

        return topSellersMap;
    }

    public Page<OrderAdminDTO> findAllOrderForAdmin(int page, int size) {
        return orderRepository.findAllOrderForAdminDTO(PageRequest.of(page - 1, size));
    }
}
