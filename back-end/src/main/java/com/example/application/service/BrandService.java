package com.example.application.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.example.application.dto.BrandDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.BrandMapper;
import com.example.application.repository.BrandRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class BrandService {
    private static final String BRAND_LIST_CACHE_KEY = "brandList";
    private static final String BRAND_CACHE_KEY = "brand";

    BrandRepository brandRepository;
    BrandMapper brandMapper;

    @Cacheable(cacheNames = BRAND_LIST_CACHE_KEY)
    public List<BrandDTO> getBrands() {
        return brandRepository.findAll().stream()
                              .map(brandMapper::toDTO)
                              .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = BRAND_CACHE_KEY, key = "#id")
    public BrandDTO getBrandById(Long id) {
        return brandRepository.findById(id)
                              .map(brandMapper::toDTO)
                              .orElseThrow(() -> new ResourceNotFoundException("Brand", "id", id));
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = BRAND_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = BRAND_CACHE_KEY, key = "#result.brandId")}
    )
    public BrandDTO addOrUpdateBrand(BrandDTO brandDTO) {
        if (brandDTO.getBrandId() == null) {
            return brandMapper.toDTO(brandRepository.save(brandMapper.toEntity(brandDTO)));
        }

        var brand = brandRepository.findById(brandDTO.getBrandId()).orElseThrow(
                () -> new ResourceNotFoundException("Brand", "id", brandDTO.getBrandId())
        );

        brand.setBrandName(brandDTO.getBrandName());
        brand.setBrandDescription(brandDTO.getBrandDescription());
        return brandMapper.toDTO(brandRepository.save(brand));
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = BRAND_LIST_CACHE_KEY, allEntries = true)}
    )
    public void deleteBrand(Long brandId) {
        var brand = brandRepository.findById(brandId).orElseThrow(() -> new ResourceNotFoundException("Brand", "id", brandId));
        brandRepository.delete(brand);
    }
}
