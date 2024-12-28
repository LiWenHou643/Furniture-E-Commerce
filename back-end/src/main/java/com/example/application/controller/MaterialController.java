package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.MaterialDTO;
import com.example.application.service.MaterialService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class MaterialController {
    MaterialService materialService;

    @GetMapping("/materials")
    public ResponseEntity<ApiResponse<List<MaterialDTO>>> getMaterials() {
        return ResponseEntity.ok(ApiResponse.<List<MaterialDTO>>builder()
                .status("success")
                .message("List materials found")
                .data(materialService.getMaterials())
                .build());
    }

    @GetMapping("/materials/{id}")
    public ResponseEntity<ApiResponse<MaterialDTO>> getMaterialById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.<MaterialDTO>builder()
                .status("success")
                .message("Material found")
                .data(materialService.getMaterialById(id))
                .build());
    }

    @PostMapping("/materials")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MaterialDTO>> addMaterial(@RequestBody MaterialDTO materialDTO) {
        return ResponseEntity.ok(ApiResponse.<MaterialDTO>builder()
                .status("success")
                .message("Material added")
                .data(materialService.addMaterial(materialDTO))
                .build());
    }

    @PutMapping("/materials")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MaterialDTO>> updateMaterial(@RequestBody MaterialDTO materialDTO) {
        return ResponseEntity.ok(ApiResponse.<MaterialDTO>builder()
                .status("success")
                .message("Material updated")
                .data(materialService.updateMaterial(materialDTO))
                .build());
    }
}
