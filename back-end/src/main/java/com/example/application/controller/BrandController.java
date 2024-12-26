package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.BrandDTO;
import com.example.application.service.BrandService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class BrandController {
    BrandService brandService;

    @GetMapping("/brands")
    public ResponseEntity<ApiResponse<List<BrandDTO>>> getBrands() {
        return ResponseEntity.ok(
                ApiResponse.<List<BrandDTO>>builder()
                           .status("success")
                           .message("List brands found")
                           .data(brandService.getBrands())
                           .build()
        );
    }

    @GetMapping("/brands/{id}")
    public ResponseEntity<ApiResponse<BrandDTO>> getBrandById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.<BrandDTO>builder()
                           .status("success")
                           .message("Brand found")
                           .data(brandService.getBrandById(id))
                           .build()
        );
    }

    @PostMapping("/add-brand")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BrandDTO>> addBrand(@RequestBody BrandDTO brandDTO) {
        return ResponseEntity.ok(
                ApiResponse.<BrandDTO>builder()
                           .status("success")
                           .message("Brand added")
                           .data(brandService.addBrand(brandDTO))
                           .build()
        );
    }

    @PutMapping("/update-brand")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BrandDTO>> updateBrand(@RequestBody BrandDTO brandDTO) {
        return ResponseEntity.ok(
                ApiResponse.<BrandDTO>builder()
                           .status("success")
                           .message("Brand updated")
                           .data(brandService.updateBrand(brandDTO))
                           .build()
        );
    }
}
