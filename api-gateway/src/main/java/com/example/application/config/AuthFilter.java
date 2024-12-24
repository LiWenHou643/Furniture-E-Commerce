package com.example.application.config;

import com.example.application.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthFilter implements GlobalFilter, Ordered {

    AuthService authService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("Enter AuthFilter... ");

        // Get authorization header
        List<String> authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);

        // Check if the header is null or does not start with "Bearer "
        if (CollectionUtils.isEmpty(authHeader) || !authHeader.getFirst().startsWith("Bearer ")) {
            log.error("Authorization header is missing or invalid");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().writeWith(Mono.just(
                    exchange.getResponse().bufferFactory().wrap("Authorization header is missing or invalid".getBytes())
            ));
        }

        String token = authHeader.getFirst().replace("Bearer ", "");

        // Verify the token
        authService.introspect(token).subscribe(
                response -> log.info("Token is {}", response.getData().isValid()),
                error -> {
                    if (error instanceof WebClientResponseException webClientError) {
                        if (webClientError.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                            log.error("Unauthorized access: {}", webClientError.getMessage());
                        } else {
                            log.error("Unexpected error: {}", webClientError.getMessage());
                        }
                    } else {
                        log.error("An error occurred: {}", error.getMessage());
                    }
                }
        );


        // Continue to the next filter
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }

}
