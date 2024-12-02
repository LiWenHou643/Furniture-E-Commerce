package com.example.application.service.person;

import com.example.application.dto.request.UpdateProfileRequest;
import com.example.application.dto.response.PersonResponse;
import com.example.application.entity.Address;
import com.example.application.entity.Person;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.example.application.repository.person.PersonRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.application.mapper.PersonMapper.PERSON_MAPPER;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PersonService {
    PersonRepository personRepository;

    public List<PersonResponse> getAll() {
        List<Person> people = personRepository.findAll();
        return people.stream()
                     .map(PERSON_MAPPER::toPersonResponse)
                     .collect(Collectors.toList());
    }

    public PersonResponse getPersonById(Long id) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return PERSON_MAPPER.toPersonResponse(person);
    }

    public Person findById(Long id) {
        return personRepository.findById(id)
                               .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public PersonResponse getPersonByEmail(String email) {
        Person person = personRepository.findByEmail(email)
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return PERSON_MAPPER.toPersonResponse(person);
    }

    public PersonResponse updatePerson(String email, UpdateProfileRequest request) {
        Person person = personRepository.findByEmail(email)
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        person.setFullName(request.fullName());
        person.setPhoneNumber(request.phoneNumber());
        person.setImage(request.image());

        // Update address if it exists, otherwise create a new address object
        Address existingAddress = person.getAddress();
        if (existingAddress != null) {
            existingAddress.setStreetAddress(request.address().getStreetAddress());
            existingAddress.setWard(request.address().getWard());
            existingAddress.setDistrict(request.address().getDistrict());
            existingAddress.setCity(request.address().getCity());
        } else {
            // If there's no existing address, create a new one
            person.setAddress(request.address());
        }

        Person updatedPerson = personRepository.save(person);
        return PERSON_MAPPER.toPersonResponse(updatedPerson);
    }
}