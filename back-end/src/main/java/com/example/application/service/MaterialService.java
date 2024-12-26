package com.example.application.service;

import com.example.application.dto.MaterialDTO;
import com.example.application.entity.Material;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.MaterialMapper;
import com.example.application.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MaterialService {
    MaterialRepository materialRepository;

    public List<MaterialDTO> getMaterials() {
        return materialRepository.findAll().stream().map(MaterialMapper.INSTANCE::toDTO).toList();
    }

    public MaterialDTO getMaterialById(Long id) {
        return materialRepository.findById(id).map(MaterialMapper.INSTANCE::toDTO).orElseThrow(
                () -> new ResourceNotFoundException("Material", "id", id)
        );
    }

    public MaterialDTO addMaterial(MaterialDTO materialDTO) {
        return MaterialMapper.INSTANCE.toDTO(materialRepository.save(MaterialMapper.INSTANCE.toEntity(materialDTO)));
    }

    public MaterialDTO updateMaterial(MaterialDTO materialDTO) {
        Material material = materialRepository.findById(materialDTO.getMaterialId()).orElseThrow(
                () -> new ResourceNotFoundException("Material", "id", materialDTO.getMaterialId())
        );
        material.setMaterialName(materialDTO.getMaterialName());
        material.setMaterialDescription(materialDTO.getMaterialDescription());
        return MaterialMapper.INSTANCE.toDTO(materialRepository.save(material));
    }
}
