package com.example.application.service;

import com.example.application.dto.UserDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.UserMapper;
import com.example.application.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class UserService {
    UserRepository userRepository;

    public UserDTO getUserById(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return UserMapper.INSTANCE.toDTO(user);
    }
}
