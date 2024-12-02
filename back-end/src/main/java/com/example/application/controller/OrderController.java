package com.example.application.controller;

import com.example.application.dto.request.OrderRequest;
import com.example.application.dto.response.ApiResponse;
import com.example.application.dto.response.OrderResponse;
import com.example.application.dto.response.PaymentLink;
import com.example.application.entity.PaymentMethod;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.example.application.service.OrderService;
import com.example.application.service.PaymentService;
import com.example.application.service.person.PersonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/orders")
public class OrderController {
    OrderService orderService;
    PaymentService paymentService;
    private final PersonService personService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<PaymentLink> createOrder(@RequestBody OrderRequest req) {
        var order = orderService.createOrder(req);
        // Save the payment into database
        if (req.paymentMethod().equals(PaymentMethod.PAYPAL)) {
            paymentService.savePayment(order, null, req.paymentMethod()); // Save the payment
            PaymentLink link = paymentService.createPaypalPayment(order, req.selectedCartItems());
            return ApiResponse.<PaymentLink>builder().data(link).build();
        } else if (req.paymentMethod().equals(PaymentMethod.CASH_ON_DELIVERY)) {
            PaymentLink link = paymentService.createPayment(order, req.selectedCartItems());
            return ApiResponse.<PaymentLink>builder().data(link).build();
        } else {
            throw new AppException(ErrorCode.PAYMENT_METHOD_NOT_SUPPORTED);
        }
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyAuthority('SCOPE_USER', 'SCOPE_ADMIN')")
    public ApiResponse<?> listOrders() {
        return ApiResponse.builder().data(orderService.listOrder()).build();
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<List<OrderResponse>> getOrderByUserId() {
        var person = SecurityContextHolder.getContext().getAuthentication().getName();
        var id = personService.getPersonByEmail(person).getId();
        var orders = orderService.getAllByPersonId(id);
        return ApiResponse.<List<OrderResponse>>builder().data(orders).build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<OrderResponse> getOrderById(@PathVariable Long id) {
        var orders = orderService.getOrderById(id);
        return ApiResponse.<OrderResponse>builder().data(orders).build();
    }

    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<OrderResponse> cancelOrder(@PathVariable Long id) {
        var order = orderService.cancelOrder(id);
        return ApiResponse.<OrderResponse>builder().message("Order cancelled successfully").data(order).build();
    }

    @PutMapping("/confirmReceipt/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<OrderResponse> confirmReceipt(@PathVariable Long id) {
        return ApiResponse.<OrderResponse>builder().data(orderService.confirmReceipt(id)).build();
    }

    @GetMapping("/track/{id}")
    public ApiResponse<List<Object[]>> getStatusHistory(@PathVariable Long id) {
        List<Object[]> statusHistory = orderService.getStatusHistory(id);
        return ApiResponse.<List<Object[]>>builder().data(statusHistory).build();
    }


}
