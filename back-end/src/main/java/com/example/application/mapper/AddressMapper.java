package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.AddressDTO;
import com.example.application.entity.Address;

@Mapper(componentModel = "spring")
public interface AddressMapper {
	@Mapping(target = "userId", ignore = true)
	AddressDTO toAddressDTO(Address address);

	@Mapping(target = "user", ignore = true)
	Address toAddress(AddressDTO addressDTO);
}
