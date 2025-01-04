package com.example.application.service;

import com.example.application.dto.MaterialDTO;
import com.example.application.entity.Material;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.MaterialMapper;
import com.example.application.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MaterialService {
    private static final String MATERIAL_LIST_CACHE_KEY = "materialList";
    private static final String MATERIAL_CACHE_KEY = "material";

    MaterialRepository materialRepository;

    @Cacheable(cacheNames = MATERIAL_LIST_CACHE_KEY)
    public List<MaterialDTO> getMaterials() {
        return materialRepository.findAll().stream().map(MaterialMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Cacheable(cacheNames = MATERIAL_CACHE_KEY, key = "#id")
    public MaterialDTO getMaterialById(Long id) {
        return materialRepository.findById(id).map(MaterialMapper.INSTANCE::toDTO).orElseThrow(
                () -> new ResourceNotFoundException("Material", "id", id)
        );
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = MATERIAL_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = MATERIAL_CACHE_KEY, key = "#result.materialId")}
    )
    public MaterialDTO addMaterial(MaterialDTO materialDTO) {
        return MaterialMapper.INSTANCE.toDTO(materialRepository.save(MaterialMapper.INSTANCE.toEntity(materialDTO)));
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = MATERIAL_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = MATERIAL_CACHE_KEY, key = "#result.materialId")}
    )
    public MaterialDTO updateMaterial(MaterialDTO materialDTO) {
        Material material = materialRepository.findById(materialDTO.getMaterialId()).orElseThrow(
                () -> new ResourceNotFoundException("Material", "id", materialDTO.getMaterialId())
        );
        material.setMaterialName(materialDTO.getMaterialName());
        material.setMaterialDescription(materialDTO.getMaterialDescription());
        return MaterialMapper.INSTANCE.toDTO(materialRepository.save(material));
    }
}
