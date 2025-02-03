package com.example.application.config.Jwt;

import com.example.application.dto.ApiResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtFilter extends OncePerRequestFilter {
    JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws IOException {

        try {
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new JwtException("Invalid token");
            }

            String token = authorizationHeader.substring(7);

            Jwt jwt = jwtUtils.decode(token);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);

            if (isExpired) {
                throw new JwtException("Token expired");
            } else if (isInvalidated) {
                throw new JwtException("Invalid token");
            } else {
                String username = jwt.getClaim("sub");
                String authorities = jwt.getClaim("scope");
                Long userId = jwt.getClaim("userId");

                // Create authentication object with userId in details
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities)
                );
                authentication.setDetails(userId);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (JwtException e) {
            var apiResponse = new ApiResponse<>("error", "Token invalid or expired", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(convertObjectToJson(apiResponse));
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String[] ignoreUrls = {"/products/**", "/categories/**", "/brands/**", "/materials/**", "/colors/**", "/error/**", "/favicon.ico", "/orders/*/paypal/**", "/feedbacks/**"};
        AntPathMatcher pathMatcher = new AntPathMatcher();
        String requestUrl = request.getRequestURI();
        String requestMethod = request.getMethod();

        Map<String, Predicate<String>> pathConditions = new HashMap<>();
        pathConditions.put("/auth/**", url -> pathMatcher.match("/auth/**", url));
        pathConditions.put("/test/**", url -> pathMatcher.match("/test/**", url));
        pathConditions.put("/chat/**", url -> pathMatcher.match("/chat/**", url));
        pathConditions.put("/app/**", url -> pathMatcher.match("/app/**", url));



        // Check if the requestUrl matches any condition
        boolean matches = pathConditions.values().stream()
                                        .anyMatch(predicate -> predicate.test(requestUrl));

        if (matches) {
            System.out.println("URL matches a pattern");
            return true;
        }

        // Ignore GET requests for other specified patterns
        for (String pattern : ignoreUrls) {
            if (pathMatcher.match(pattern, requestUrl) && "GET".equalsIgnoreCase(requestMethod)) {
                return true; // Skip filtering for matching GET requests
            }
        }

        // Apply the filter for other cases
        return false;
    }


}
