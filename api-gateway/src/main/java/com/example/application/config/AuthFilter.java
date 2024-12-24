package com.example.application.config;

import com.example.application.dto.ApiResponse;
import com.example.application.service.AuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthFilter implements GlobalFilter, Ordered {

    AuthService authService;
    ObjectMapper objectMapper;

    @Value("${app.api.prefix}")
    @NonFinal
    private String apiPrefix;

    @NonFinal
    private String[] publicEndpoints = {
            "/auth/.*",
            "/products",
            "/notification/email/send"
    };

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("Enter AuthFilter... ");

        // Check if the request is a public endpoint
        if (isPublicEndpoint(exchange.getRequest())) return chain.filter(exchange);

        // Get authorization header
        List<String> authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);

        // Check if the header is null or does not start with "Bearer "
        if (CollectionUtils.isEmpty(authHeader) || !authHeader.getFirst().startsWith("Bearer ")) {
            log.error("Authorization header is missing or invalid");
            return unauthenticated(exchange.getResponse());
        }

        String token = authHeader.getFirst().replace("Bearer ", "");

        // Verify the token
        return authService.introspect(token).flatMap(introspectResponse -> {
            if (introspectResponse.getData().isValid())
                return chain.filter(exchange);
            else
                return unauthenticated(exchange.getResponse());
        }).onErrorResume(throwable -> unauthenticated(exchange.getResponse()));
    }

    @Override
    public int getOrder() {
        return -1;
    }

    private boolean isPublicEndpoint(ServerHttpRequest request) {
        var a = request.getURI().getPath();
        var b = apiPrefix + publicEndpoints[1];
        var c = Arrays.stream(publicEndpoints)
              .anyMatch(s -> request.getURI().getPath().matches(apiPrefix + s));
        return Arrays.stream(publicEndpoints)
                     .anyMatch(s -> request.getURI().getPath().matches(apiPrefix + s));
    }

    Mono<Void> unauthenticated(ServerHttpResponse response) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                                                .status("failed")
                                                .message("Unauthenticated")
                                                .build();

        String body = null;
        try {
            body = objectMapper.writeValueAsString(apiResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        return response.writeWith(
                Mono.just(response.bufferFactory().wrap(body.getBytes())));
    }

}
