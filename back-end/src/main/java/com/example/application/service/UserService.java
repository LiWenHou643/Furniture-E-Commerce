package com.example.application.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class UserService {
	UserRepository userRepository;
	AddressRepository addressRepository;
	PasswordEncoder passwordEncoder;

	public Page<UserDTO> getAllUsers(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		var users = userRepository.findAllUsers(pageable);
		return users.map(UserMapper.INSTANCE::toDTO);
	}
	
	public Long getAdminId() {
        return userRepository.findAdminId();
        }

	public UserDTO getUserById(Long userId) {
		var user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
		return UserMapper.INSTANCE.toDTO(user);
	}

	public UserDTO updateAddress(Long userId, AddressDTO addressDTO) {
		if (addressDTO.getAddressId() == null || addressDTO.getAddressId().toString().isEmpty()) {
			// Add new address
			var user = userRepository.findById(userId)
					.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
			Address newAddress = AddressMapper.INSTANCE.toAddress(addressDTO);
			newAddress.setUser(user);
			user.getAddresses().add(newAddress);
			userRepository.save(user);
			return UserMapper.INSTANCE.toDTO(user);
		}

		// Update existing address
		var address = addressRepository.findById(addressDTO.getAddressId())
				.orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressDTO.getAddressId()));

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

	public UserDTO deleteAddress(Long userId, Long addressId) {
		var user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		boolean addressRemoved = user.getAddresses().removeIf(a -> a.getAddressId().equals(addressId));

		if (!addressRemoved) {
			throw new ResourceNotFoundException("Address", "id", addressId);
		}

		userRepository.save(user);
		return UserMapper.INSTANCE.toDTO(user);
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

	public UserDTO updatePassword(Long userId, UserDTO userDTO) {
		var user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		// Check if old password is correct
		if (!passwordEncoder.matches(userDTO.getOldPassword(), user.getPassword())) {
			throw new IllegalArgumentException("Old password is incorrect");
		} else if (passwordEncoder.matches(userDTO.getNewPassword(), user.getPassword())) {
			throw new IllegalArgumentException("New password should not be the same as old password");
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

	public UserDTO changeUserStatus(Long userId) {
		var user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user Id", userId));
		user.setUserStatus(!user.getUserStatus());

		return UserMapper.INSTANCE.toDTO(userRepository.save(user));
	}

	public UserDTO changeDefaultAddress(Long oldDefaultAddressId, Long newDefaultAddressId) {
		var oldDefaultAddress = addressRepository.findById(oldDefaultAddressId)
				.orElseThrow(() -> new ResourceNotFoundException("Address", "id", oldDefaultAddressId));
		var newDefaultAddress = addressRepository.findById(newDefaultAddressId)
				.orElseThrow(() -> new ResourceNotFoundException("Address", "id", newDefaultAddressId));

		if (oldDefaultAddress.getUser().getUserId() != newDefaultAddress.getUser().getUserId()) {
			throw new IllegalArgumentException("Addresses do not belong to the same user");
		}

		oldDefaultAddress.setDefaultAddress(false);
		newDefaultAddress.setDefaultAddress(true);

		addressRepository.save(oldDefaultAddress);
		addressRepository.save(newDefaultAddress);

		return UserMapper.INSTANCE.toDTO(newDefaultAddress.getUser());
	}
	
	public int countUsers() {
		return (int) userRepository.count() - 1; // -1 to exclude the admin user
	}
}
