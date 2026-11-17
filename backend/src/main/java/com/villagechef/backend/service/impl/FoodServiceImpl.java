package com.villagechef.backend.service.impl;

import com.villagechef.backend.dto.FoodDTO;
import com.villagechef.backend.entity.Food;
import com.villagechef.backend.exception.ResourceNotFoundException;
import com.villagechef.backend.repository.FoodRepository;
import com.villagechef.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Autowired
    public FoodServiceImpl(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public List<FoodDTO> getAllFoods(String category, Boolean isVeg, Double maxPrice, String search) {
        List<Food> foods;
        if (category == null && isVeg == null && maxPrice == null && search == null) {
            foods = foodRepository.findAll();
        } else {
            foods = foodRepository.searchFoods(category, isVeg, maxPrice, search);
        }
        return foods.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public FoodDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with ID: " + id));
        return mapToDTO(food);
    }

    @Override
    public FoodDTO createFood(FoodDTO foodDTO) {
        Food food = mapToEntity(foodDTO);
        Food savedFood = foodRepository.save(food);
        return mapToDTO(savedFood);
    }

    @Override
    public FoodDTO updateFood(Long id, FoodDTO foodDTO) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with ID: " + id));

        food.setName(foodDTO.getName());
        food.setDescription(foodDTO.getDescription());
        food.setPrice(foodDTO.getPrice());
        food.setImageUrl(foodDTO.getImageUrl());
        food.setCategory(foodDTO.getCategory());
        food.setRating(foodDTO.getRating());
        food.setIngredients(foodDTO.getIngredients());
        food.setAvailable(foodDTO.isAvailable());
        food.setVeg(foodDTO.isVeg());

        Food updatedFood = foodRepository.save(food);
        return mapToDTO(updatedFood);
    }

    @Override
    public void deleteFood(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with ID: " + id));
        foodRepository.delete(food);
    }

    // Mapper helper methods
    private FoodDTO mapToDTO(Food food) {
        return FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .description(food.getDescription())
                .price(food.getPrice())
                .imageUrl(food.getImageUrl())
                .category(food.getCategory())
                .rating(food.getRating())
                .ingredients(food.getIngredients())
                .available(food.isAvailable())
                .veg(food.isVeg())
                .build();
    }

    private Food mapToEntity(FoodDTO dto) {
        return Food.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .rating(dto.getRating())
                .ingredients(dto.getIngredients())
                .available(dto.isAvailable())
                .veg(dto.isVeg())
                .build();
    }
}
