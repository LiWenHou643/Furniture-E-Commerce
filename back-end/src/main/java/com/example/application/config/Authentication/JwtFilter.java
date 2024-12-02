package com.example.application.config.Authentication;

import com.example.application.dto.response.ApiResponse;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final String[] publicEndpoints;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        AntPathMatcher antPathMatcher = new AntPathMatcher();

        for (String publicEndpoint : publicEndpoints) {
            boolean isPublicEndpoint = antPathMatcher.match(publicEndpoint, requestURI);

            if (isPublicEndpoint) {
                filterChain.doFilter(request, response);
                return;
            }
        }


        try {
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new AppException(ErrorCode.JWT_INVALID);
            }

            String token = authorizationHeader.substring(7);

            Jwt jwt = jwtUtils.getToken(token);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);

            if (isExpired) {
                throw new AppException(ErrorCode.JWT_EXPIRED);
            } else if (isInvalidated) {
                throw new AppException(ErrorCode.JWT_INVALID);
            } else {
                String username = jwt.getClaim("sub");
                String authorities = jwt.getClaim("scope");
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (AppException e) {
            var errorResponse = ApiResponse.<Void>builder()
                                           .code(e.getErrorCode().getCode())
                                           .message(e.getErrorCode().getMessage())
                                           .build();

            responseException(response, errorResponse);

        } catch (JwtException | InvalidBearerTokenException e) {
            log.info("Invalid JWT token: {}", e.getMessage());
            var code = isTokenExpired(e) ? ErrorCode.JWT_EXPIRED.getCode() : ErrorCode.JWT_INVALID.getCode();
            var message = isTokenExpired(e) ? ErrorCode.JWT_EXPIRED.getMessage() : ErrorCode.JWT_INVALID.getMessage();
            var errorResponse = ApiResponse.<Void>builder()
                                           .code(code)
                                           .message(message)
                                           .build();
            responseException(response, errorResponse);

        } catch (Exception e) {
            var code = ErrorCode.UNCATEGORIZED_EXCEPTION.getCode();
            var message = e.getMessage();
            ApiResponse<Void> errorResponse = ApiResponse.<Void>builder()
                                                         .code(code)
                                                         .message(message)
                                                         .build();
            responseException(response, errorResponse);
        }
    }

    private void responseException(HttpServletResponse response, ApiResponse<Void> errorResponse) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(convertObjectToJson(errorResponse));
    }

    private boolean isTokenExpired(Exception e) {
        String errorMessage = e.getMessage();
        return errorMessage != null && errorMessage.toLowerCase().contains("expired");
    }

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }

}
