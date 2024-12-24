package com.example.application.dto.request;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthRequest {
    String username;
    String password;
    @Builder.Default
    boolean rememberMe = false;
    @Builder.Default
    boolean isAdmin = false;

    @JsonSetter
    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
}