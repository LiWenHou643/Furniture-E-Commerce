package com.example.application.config.Authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    String[] PUBLIC_ENDPOINTS = {
            "/api/auth/**", "/error", "/favicon.ico", "/api/products/**", "/api/categories/**"
    };

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) {

        try {
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new BadJwtException("Invalid token");
            }

            String token = authorizationHeader.substring(7);

            Jwt jwt = jwtUtils.getToken(token);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);

            if (isExpired) {
                throw new BadJwtException("Invalid token");
            } else if (isInvalidated) {
                throw new BadJwtException("Invalid token");
            } else {
                String username = jwt.getClaim("sub");
                String authorities = jwt.getClaim("scope");
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        return Arrays.stream(PUBLIC_ENDPOINTS).anyMatch(p -> new AntPathMatcher().match(p, request.getRequestURI()));
    }

//    @Override
//    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
//        return new AntPathRequestMatcher("/api/products/**").matches(request);
//    }
}
