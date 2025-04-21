package com.example.application.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.application.dto.AreaDTO;
import com.example.application.mapper.AreaMapper;
import com.example.application.repository.AreaRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AreaService {
    AreaRepository areaRepository;
    AreaMapper areaMapper;

    public List<AreaDTO> getAllAreas() {
        return areaRepository.findAll().stream().map(areaMapper::toDTO).collect(Collectors.toList());
    }
}
