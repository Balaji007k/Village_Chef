package com.villagechef.backend.controller;

import com.villagechef.backend.dto.FoodDTO;
import com.villagechef.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isVeg,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search) {
        List<FoodDTO> foods = foodService.getAllFoods(category, isVeg, maxPrice, search);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        FoodDTO food = foodService.getFoodById(id);
        return ResponseEntity.ok(food);
    }

    @PostMapping
    public ResponseEntity<FoodDTO> createFood(@RequestBody FoodDTO foodDTO) {
        FoodDTO createdFood = foodService.createFood(foodDTO);
        return new ResponseEntity<>(createdFood, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodDTO> updateFood(
            @PathVariable Long id,
            @RequestBody FoodDTO foodDTO) {
        FoodDTO updatedFood = foodService.updateFood(id, foodDTO);
        return ResponseEntity.ok(updatedFood);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
