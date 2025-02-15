package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ColorDTO;
import com.example.application.service.ColorService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ColorController {
    ColorService colorService;

    @GetMapping("/colors")
    public ResponseEntity<ApiResponse<List<ColorDTO>>> getColors() {
        return ResponseEntity.ok(
                ApiResponse.<List<ColorDTO>>builder()
                           .status("success")
                           .message("Colors fetched successfully")
                           .data(colorService.getColors())
                           .build());
    }

    @GetMapping("/colors/{id}")
    public ResponseEntity<ApiResponse<ColorDTO>> getColorById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.<ColorDTO>builder()
                           .status("success")
                           .message("Color fetched successfully")
                           .data(colorService.getColorById(id))
                           .build());
    }

    @PostMapping("/colors")
    public ResponseEntity<ApiResponse<ColorDTO>> addOrUpdateColor(@RequestBody ColorDTO colorDTO) {
        return ResponseEntity.ok(
                ApiResponse.<ColorDTO>builder()
                           .status("success")
                           .message("Color added successfully")
                           .data(colorService.addOrUpdateColor(colorDTO))
                           .build());
    }

}
