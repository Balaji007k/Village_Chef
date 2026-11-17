package com.villagechef.backend.dto;

public class FoodDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String category;
    private Double rating;
    private String ingredients;
    private boolean available;
    private boolean veg;

    public FoodDTO() {}

    public FoodDTO(Long id, String name, String description, Double price, String imageUrl,
                   String category, Double rating, String ingredients, boolean available, boolean veg) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.rating = rating;
        this.ingredients = ingredients;
        this.available = available;
        this.veg = veg;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public boolean isVeg() { return veg; }
    public void setVeg(boolean veg) { this.veg = veg; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private Double price;
        private String imageUrl;
        private String category;
        private Double rating;
        private String ingredients;
        private boolean available = true;
        private boolean veg = true;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder price(Double price) { this.price = price; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder ingredients(String ingredients) { this.ingredients = ingredients; return this; }
        public Builder available(boolean available) { this.available = available; return this; }
        public Builder veg(boolean veg) { this.veg = veg; return this; }

        public FoodDTO build() {
            return new FoodDTO(id, name, description, price, imageUrl, category, rating, ingredients, available, veg);
        }
    }
}
