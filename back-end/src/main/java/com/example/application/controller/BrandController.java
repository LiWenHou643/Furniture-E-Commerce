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

    @PostMapping("/brands")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BrandDTO>> addOrUpdateBrand(@RequestBody BrandDTO brandDTO) {
        return ResponseEntity.ok(
                ApiResponse.<BrandDTO>builder()
                           .status("success")
                           .message("Brand added")
                           .data(brandService.addOrUpdateBrand(brandDTO))
                           .build()
        );
    }

    @DeleteMapping("/brands/{brandId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteBrand(@PathVariable Long brandId) {
        brandService.deleteBrand(brandId);
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                           .status("success")
                           .message("Brand deleted")
                           .build()
        );
    }
}
