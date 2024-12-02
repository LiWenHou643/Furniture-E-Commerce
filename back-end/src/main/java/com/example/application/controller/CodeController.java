package com.example.application.controller;

import com.example.application.dto.request.CodeCheckRequest;
import com.example.application.dto.response.ApiResponse;
import com.example.application.dto.response.CodeCheckResponse;
import com.example.application.service.product.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/code")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<CodeCheckResponse> checkCode(@RequestBody CodeCheckRequest request) {
        var response = codeService.checkCode(request);
        return ApiResponse.<CodeCheckResponse>builder().data(response).build();
    }
}
