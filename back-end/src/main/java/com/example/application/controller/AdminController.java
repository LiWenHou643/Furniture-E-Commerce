package com.example.application.controller;

import com.example.application.dto.response.*;
import com.example.application.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin")
public class AdminController {
    private final OrderService orderService;

    @PutMapping("/confirm")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<OrderResponse> confirmOrder(@RequestParam(name = "orderId") Long id) {
        return ApiResponse.<OrderResponse>builder().data(orderService.confirm(id)).build();
    }

    @PutMapping("/ship")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<OrderResponse> shipOrder(@RequestParam(name = "orderId") Long id) {
        return ApiResponse.<OrderResponse>builder().data(orderService.ship(id)).build();
    }

    @PutMapping("/deliver")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<OrderResponse> delivered(@RequestParam(name = "orderId") Long id) {
        return ApiResponse.<OrderResponse>builder().data(orderService.delivered(id)).build();
    }

    @GetMapping("/monthly-totals")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<List<OrderCountDTO>> getMonthlyTotals() {
        return ApiResponse.<List<OrderCountDTO>>builder().data(orderService.getMonthlyTotals()).build();
    }

    @GetMapping("/top-sellers")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<Map<String, List<BestSellerDTO>>> getTopSellingProducts() {
        Map<String, List<BestSellerDTO>> topSellers = orderService.getTopSellingProductsForLastAndCurrentMonth();
        return ApiResponse.<Map<String, List<BestSellerDTO>>>builder()
                          .data(topSellers)
                          .build();
    }

    @GetMapping("/orders")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<Page<OrderAdminDTO>> getAllOrders(@RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return ApiResponse.<Page<OrderAdminDTO>>builder().data(orderService.findAllOrderForAdmin(page, size)).build();
    }


}