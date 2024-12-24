package com.example.application.service;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.request.IntrospectRequest;
import com.example.application.dto.response.IntrospectResponse;
import com.example.application.repository.AuthClient;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    AuthClient authClient;

    public Mono<ApiResponse<IntrospectResponse>> introspect(String token) {
        return authClient.introspect(IntrospectRequest.builder().token(token).build());
    }
}