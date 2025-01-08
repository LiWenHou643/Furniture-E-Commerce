package com.example.application.service;

import com.example.application.dto.AddressDTO;
import com.example.application.dto.UserDTO;
import com.example.application.entity.Address;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.AddressMapper;
import com.example.application.mapper.UserMapper;
import com.example.application.repository.AddressRepository;
import com.example.application.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class UserService {
    UserRepository userRepository;
    AddressRepository addressRepository;
    PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(Long userId) {
        var user = userRepository.findById(userId)
                                 .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return UserMapper.INSTANCE.toDTO(user);
    }

    public UserDTO updateAddress(Long userId, AddressDTO addressDTO) {
        if (addressDTO.getAddressId() == null || addressDTO.getAddressId().toString().isEmpty()) {
            // Add new address
            var user = userRepository.findById(userId).orElseThrow(
                    () -> new ResourceNotFoundException("User", "id", userId));
            Address newAddress = AddressMapper.INSTANCE.toAddress(addressDTO);
            newAddress.setUser(user);
            user.getAddresses().add(newAddress);
            userRepository.save(user);
            return UserMapper.INSTANCE.toDTO(user);
        }

        // Update existing address
        var address = addressRepository.findById(addressDTO.getAddressId()).orElseThrow(
                () -> new ResourceNotFoundException("Address", "id", addressDTO.getAddressId()));

        if (!address.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("Address does not belong to user");
        }

        address.setStreetAddress(addressDTO.getStreetAddress());
        address.setWard(addressDTO.getWard());
        address.setDistrict(addressDTO.getDistrict());
        address.setCity(addressDTO.getCity());
        addressRepository.save(address);

        return UserMapper.INSTANCE.toDTO(address.getUser());
    }

    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        var user = userRepository.findById(userId)
                                 .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAvatar(userDTO.getAvatar());
        userRepository.save(user);
        return UserMapper.INSTANCE.toDTO(user);
    }

    public UserDTO updatePassword(UserDTO userDTO) {
        var user = userRepository.findById(userDTO.getUserId())
                                 .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDTO.getUserId()));
        // Check if old password is correct
        if (!passwordEncoder.matches(userDTO.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(userDTO.getNewPassword()));
        userRepository.save(user);
        return UserMapper.INSTANCE.toDTO(user);
    }

    public UserDTO updateAvatar(Long userId, String avatarUrl) {
        var user = userRepository.findById(userId)
                                 .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setAvatar(avatarUrl);
        userRepository.save(user);
        return UserMapper.INSTANCE.toDTO(user);
    }
}
