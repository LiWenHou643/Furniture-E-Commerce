package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.AddressDTO;
import com.example.application.entity.Address;

@Mapper(componentModel = "spring")
public interface AddressMapper {
	AddressMapper INSTANCE = Mappers.getMapper(AddressMapper.class);

	@Mapping(target = "userId", ignore = true)
	AddressDTO toAddressDTO(Address address);

	@Mapping(target = "user", ignore = true)
	Address toAddress(AddressDTO addressDTO);
}
