package com.example.application.dto.request;

import com.example.application.entity.Address;

public record UpdateProfileRequest(
        String fullName,
        String phoneNumber,
        Address address,
        String image
) {
}
