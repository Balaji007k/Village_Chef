package com.villagechef.backend.repository;

import com.villagechef.backend.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("SELECT f FROM Food f WHERE " +
           "(:category IS NULL OR f.category = :category) AND " +
           "(:isVeg IS NULL OR f.veg = :isVeg) AND " +
           "(:maxPrice IS NULL OR f.price <= :maxPrice) AND " +
           "(:search IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(f.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Food> searchFoods(
            @Param("category") String category,
            @Param("isVeg") Boolean isVeg,
            @Param("maxPrice") Double maxPrice,
            @Param("search") String search
    );
}
