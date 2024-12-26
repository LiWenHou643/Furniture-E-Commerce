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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class UserService {
    UserRepository userRepository;
    private final AddressRepository addressRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return UserMapper.INSTANCE.toDTO(user);
    }

    public UserDTO updateAddress(AddressDTO addressDTO) {
        if (addressDTO.getAddressId() == null) {
            // Add new address
            var user = userRepository.findById(addressDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User", "id", addressDTO.getUserId()));
            Address newAddress = AddressMapper.INSTANCE.toAddress(addressDTO);
            newAddress.setUser(user);
            user.getAddresses().add(newAddress);
            userRepository.save(user);
            return UserMapper.INSTANCE.toDTO(user);
        }

        // Update existing address
        var address = addressRepository.findById(addressDTO.getAddressId()).orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressDTO.getAddressId()));
        address.setStreetAddress(addressDTO.getStreetAddress());
        address.setWard(addressDTO.getWard());
        address.setDistrict(addressDTO.getDistrict());
        address.setCity(addressDTO.getCity());
        addressRepository.save(address);

        return UserMapper.INSTANCE.toDTO(address.getUser());
    }
}
