package com.villagechef.backend.service;

import com.villagechef.backend.dto.FoodDTO;
import java.util.List;

public interface FoodService {
    List<FoodDTO> getAllFoods(String category, Boolean isVeg, Double maxPrice, String search);
    FoodDTO getFoodById(Long id);
    FoodDTO createFood(FoodDTO foodDTO);
    FoodDTO updateFood(Long id, FoodDTO foodDTO);
    void deleteFood(Long id);
}
