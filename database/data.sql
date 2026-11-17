-- Seed data for Village Chef Foods Table
USE village_chef;

INSERT INTO foods (name, description, price, image_url, category, rating, ingredients, available, is_veg) VALUES
('Classic Cheese Pizza', 'Freshly baked hand-tossed crust topped with rich tomato sauce, premium mozzarella cheese, and aromatic Italian herbs.', 299.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', 'Pizzas', 4.8, 'Mozzarella, Tomato Sauce, Oregano, Basil, Wheat Crust', TRUE, TRUE),

('Spicy Paneer Tikka Burger', 'Crispy spiced paneer patty topped with fresh lettuce, onions, sliced tomatoes, and a special house-made tandoori mayonnaise in toasted buns.', 189.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', 'Burgers', 4.5, 'Paneer, Lettuce, Onions, Tandoori Sauce, Burger Bun', TRUE, TRUE),

('Village Special Chicken Curry', 'A hearty, slow-cooked farmhouse chicken curry infused with fresh roasted ground spices, coconut milk, and fresh curry leaves.', 349.00, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', 'Main Dishes', 4.9, 'Chicken, Ground Spices, Coconut Milk, Curry Leaves, Onions', TRUE, FALSE),

('Traditional Veg Thali', 'A classic platter consisting of aromatic basmati rice, buttery dal tadka, dry mix veg sabzi, paneer butter masala, raita, and 2 fresh rotis.', 279.00, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', 'Main Dishes', 4.7, 'Rice, Dal, Paneer, Mixed Veg, Roti, Curd', TRUE, TRUE),

('Country Fried Chicken Wings', 'Crispy, deep-fried chicken wings coated in a spicy buttermilk batter and served with chef''s signature smoky BBQ dipping sauce.', 249.00, 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', 'Burgers', 4.6, 'Chicken Wings, Spicy Batter, BBQ Sauce, Garlic Butter', TRUE, FALSE),

('Gourmet Garden Salad', 'A crisp, refreshing bowl of fresh romaine lettuce, cherry tomatoes, cucumbers, bell peppers, olives, and feta cheese, tossed in Greek vinaigrette.', 159.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', 'Salads', 4.3, 'Romaine Lettuce, Cherry Tomatoes, Olives, Cucumber, Feta Cheese', TRUE, TRUE),

('Classic Fudge Brownie', 'Warm, fudgy chocolate brownie loaded with chocolate chips and served with a drizzle of rich hot chocolate fudge.', 129.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', 'Desserts', 4.7, 'Dark Chocolate, Butter, Flour, Sugar, Chocolate Chips', TRUE, TRUE),

('Fresh Strawberry Milkshake', 'Creamy, rich milkshake blended with fresh strawberries and vanilla ice cream, topped with whipped cream and a cherry.', 119.00, 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80', 'Drinks', 4.4, 'Fresh Strawberries, Whole Milk, Vanilla Ice Cream, Sugar', TRUE, TRUE),

('Traditional Sweet Mango Lassi', 'A classic, cooling yoghurt-based drink blended with ripe sweet mangoes and topped with crushed pistachios.', 99.00, 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80', 'Drinks', 4.8, 'Sweet Mango Pulp, Yoghurt, Milk, Sugar, Cardamom', TRUE, TRUE),

('Double Cheese Beef Burger', 'Juicy flame-grilled double beef patty layered with double cheddar cheese, dill pickles, onions, mustard, and ketchup in a brioche bun.', 259.00, 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', 'Burgers', 4.9, 'Beef Patty, Cheddar Cheese, Pickles, Brioche Bun, Mustard', TRUE, FALSE),

('BBQ Paneer Pizza', 'Crispy thin crust pizza loaded with smoky BBQ marinated paneer cubes, red onions, bell peppers, and fresh cilantro.', 329.00, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', 'Pizzas', 4.6, 'Paneer, BBQ Sauce, Onions, Bell Peppers, Cilantro, Mozzarella', TRUE, TRUE);

-- Seed user accounts
INSERT INTO users (name, email, password, role) VALUES
('Village Chef Admin', 'admin@villagechef.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'ADMIN'),
('John Doe User', 'user@villagechef.com', 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', 'USER');
