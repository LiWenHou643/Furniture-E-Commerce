package com.example.application.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.example.application.dto.ColorDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.ColorMapper;
import com.example.application.repository.ColorRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ColorService {
    private static final String COLOR_LIST_CACHE_KEY = "colorList";
    private static final String COLOR_CACHE_KEY = "color";

    ColorRepository colorRepository;
    ColorMapper colorMapper;
    

    @Cacheable(cacheNames = COLOR_LIST_CACHE_KEY)
    public List<ColorDTO> getColors() {
        return colorRepository.findAll().stream().map(colorMapper::toDTO).collect(Collectors.toList());
    }

    @Cacheable(cacheNames = COLOR_CACHE_KEY, key = "#id")
    public ColorDTO getColorById(Long id) {
        return colorMapper.toDTO(colorRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Color", "id", id)
        ));
    }

    @Caching(
            evict = {
                    @CacheEvict(cacheNames = COLOR_LIST_CACHE_KEY, allEntries = true),
            },
            put = {
                    @CachePut(cacheNames = COLOR_CACHE_KEY, key = "#result.colorId")
            }

    )
    public ColorDTO addOrUpdateColor(ColorDTO colorDTO) {
        if (colorDTO.getColorId() == null) {
            return colorMapper.toDTO(colorRepository.save(colorMapper.toEntity(colorDTO)));
        }
        var color = colorRepository.findById(colorDTO.getColorId()).orElseThrow(
                () -> new ResourceNotFoundException("Color", "id", colorDTO.getColorId())
        );
        color.setColorName(colorDTO.getColorName());
        color.setHexCode(colorDTO.getHexCode());
        return colorMapper.toDTO(colorRepository.save(color));
    }


}
