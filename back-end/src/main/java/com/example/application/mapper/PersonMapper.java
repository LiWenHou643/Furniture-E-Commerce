package com.example.application.mapper;

import com.example.application.dto.request.RegisterRequest;
import com.example.application.dto.response.PersonResponse;
import com.example.application.entity.Person;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PersonMapper {
    PersonMapper PERSON_MAPPER = Mappers.getMapper(PersonMapper.class);
    
    PersonResponse toPersonResponse(Person personEntity);

    Person toPersonEntity(RegisterRequest registerRequest);

}