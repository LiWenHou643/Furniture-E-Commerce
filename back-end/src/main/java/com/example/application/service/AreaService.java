package com.example.application.service;

import com.example.application.dto.AreaDTO;
import com.example.application.mapper.AreaMapper;
import com.example.application.repository.AreaRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AreaService {
    AreaRepository areaRepository;

    public List<AreaDTO> getAllAreas() {
        return areaRepository.findAll().stream().map(AreaMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }
}
