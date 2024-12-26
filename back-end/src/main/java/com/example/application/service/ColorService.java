package com.example.application.service;

import com.example.application.dto.ColorDTO;
import com.example.application.entity.Color;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.ColorMapper;
import com.example.application.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ColorService {
    ColorRepository colorRepository;

    public List<ColorDTO> getColors() {
        return colorRepository.findAll().stream().map(ColorMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    public ColorDTO getColorById(Long id) {
        return ColorMapper.INSTANCE.toDTO(colorRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Color", "id", id)
        ));
    }

    public ColorDTO addColor(ColorDTO colorDTO) {
        return ColorMapper.INSTANCE.toDTO(colorRepository.save(ColorMapper.INSTANCE.toEntity(colorDTO)));
    }

    public ColorDTO updateColor(ColorDTO colorDTO) {
        Color color = colorRepository.findById(colorDTO.getColorId()).orElseThrow(
                () -> new ResourceNotFoundException("Color", "id", colorDTO.getColorId())
        );
        color.setColorName(colorDTO.getColorName());
        color.setHexCode(colorDTO.getHexCode());
        return ColorMapper.INSTANCE.toDTO(colorRepository.save(color));
    }


}
