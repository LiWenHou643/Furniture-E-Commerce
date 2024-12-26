package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.AreaDTO;
import com.example.application.service.AreaService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AreaController {
    AreaService areaService;

    @GetMapping("/areas")
    public ResponseEntity<ApiResponse<List<AreaDTO>>> getAllAreas() {
        return ResponseEntity.ok(
                ApiResponse.<List<AreaDTO>>builder()
                           .status("success")
                           .message("Areas fetched successfully")
                           .data(areaService.getAllAreas())
                           .build()
        );
    }
}
