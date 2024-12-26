package com.example.application.service;

import com.example.application.dto.BrandDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.BrandMapper;
import com.example.application.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class BrandService {
    BrandRepository brandRepository;

    public List<BrandDTO> getBrands() {
        return brandRepository.findAll().stream()
                         .map(BrandMapper.INSTANCE::toDTO)
                         .toList();
    }

    public BrandDTO getBrandById(Long id) {
        return brandRepository.findById(id)
                              .map(BrandMapper.INSTANCE::toDTO)
                              .orElseThrow(() -> new ResourceNotFoundException("Brand", "id", id));
    }

    public BrandDTO addBrand(BrandDTO brandDTO) {
        var brand = BrandMapper.INSTANCE.toEntity(brandDTO);
        return BrandMapper.INSTANCE.toDTO(brandRepository.save(brand));
    }

    public  BrandDTO updateBrand(BrandDTO brandDTO) {
        var brand = brandRepository.findById(brandDTO.getBrandId())
                                   .orElseThrow(() -> new ResourceNotFoundException("Brand", "id", brandDTO.getBrandId()));
        brand.setBrandName(brandDTO.getBrandName());
        brand.setBrandDescription(brandDTO.getBrandDescription());
        return BrandMapper.INSTANCE.toDTO(brandRepository.save(brand));
    }
}
