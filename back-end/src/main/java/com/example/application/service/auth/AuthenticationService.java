package com.example.application.service.auth;

import com.example.application.config.Authentication.JwtGenerator;
import com.example.application.config.Authentication.JwtUtils;
import com.example.application.repository.UserRepository;
import com.example.application.repository.auth.RefreshTokenRepository;
import com.example.application.repository.auth.RolesRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    JwtGenerator jwtGenerator;
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RefreshTokenRepository refreshTokenRepository;
    RolesRepository rolesRepository;
    JwtUtils jwtUtils;

//    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
//        Person person = userRepository
//                .findByEmail(request.username())
//                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
//
//        boolean authenticated = passwordEncoder.matches(request.password(), person.getPassword());
//        if (!authenticated) throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
//
//        String token = jwtGenerator.generateAccessToken(person);
//        String refreshToken = jwtGenerator.generateRefreshToken(person);
//
//        saveUserRefreshToken(person, refreshToken);
//        boolean persistent = request.persistent();
//        if (persistent) createRefreshTokenCookie(response, refreshToken);
//
//        Jwt jwt = jwtUtils.getToken(token);
//        int duration = jwtUtils.getDuration(jwt);
//
//        return AuthenticationResponse.builder().accessToken(token).accessTokenExpiry(duration)
//                                     .tokenType(TokenType.Bearer).username(person.getEmail())
//                                     .role(person.getRoles().getName()).build();
//    }
//
//    private void saveUserRefreshToken(Person person, String refreshToken) {
//        var refreshTokenEntity = RefreshToken.builder()
//                                             .person(person)
//                                             .refreshToken(refreshToken)
//                                             .revoked(false)
//                                             .build();
//        refreshTokenRepository.save(refreshTokenEntity);
//    }
//
//    private void createRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
//        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
//        refreshTokenCookie.setHttpOnly(true);
//        refreshTokenCookie.setSecure(true);
//        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // in seconds (15 days)
//        response.addCookie(refreshTokenCookie);
//    }
//
//    public PersonResponse register(RegisterRequest request) {
//        Optional<Roles> role = rolesRepository.getByRoleName(AppConstants.ROLE_USER);
//        if (role.isEmpty()) throw new AppException(ErrorCode.ROLE_NOT_FOUND);
//
//        request.setFullName(request.getFullName().trim());
//        request.setEmail(request.getEmail().trim());
//        request.setPassword(request.getPassword().trim());
//
//        Users personExist = userRepository.findByEmail(request.getEmail()).orElse(null);
//        if (personExist != null) throw new AppException(ErrorCode.USER_EXISTED);
//
//        Person person = new Person();
//        person.setFullName(request.getFullName());
//        person.setEmail(request.getEmail());
//        person.setPassword(passwordEncoder.encode(request.getPassword()));
//        person.setRoles(role.get());
//        Person isSaved = userRepository.save(person);
//
//        Cart cart = Cart.builder().person(isSaved).build();
//        cartRepository.save(cart);
//
//        return PERSON_MAPPER.toPersonResponse(isSaved);
//    }
//
//    public AuthenticationResponse refreshToken(HttpServletRequest request) {
//        String refreshToken = getRefreshToken(request);
//
//        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
//                                                   .orElseThrow(() -> new AppException(
//                                                           ErrorCode.REFRESH_TOKEN_INVALID));
//        if (token.isRevoked()) {
//            throw new AppException(ErrorCode.REFRESH_TOKEN_REVOKED);
//        }
//
//        Person person = token.getPerson();
//        String newAccessToken = jwtGenerator.generateAccessToken(person);
//
//        return AuthenticationResponse.builder().accessToken(newAccessToken).accessTokenExpiry(5 * 60)
//                                     .tokenType(TokenType.Bearer).username(person.getEmail())
//                                     .role(person.getRoles().getName()).build();
//    }
//
//    private static String getRefreshToken(HttpServletRequest request) {
//        Cookie[] cookies = request.getCookies();
//        String refreshToken = null;
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if (cookie.getName().equals("refresh_token")) {
//                    refreshToken = cookie.getValue();
//                    break;
//                }
//            }
//        }
//        if (refreshToken == null) {
//            throw new AppException(ErrorCode.REFRESH_TOKEN_INVALID);
//        }
//        refreshToken = refreshToken.replace("Bearer ", "");
//        return refreshToken;
//    }
}