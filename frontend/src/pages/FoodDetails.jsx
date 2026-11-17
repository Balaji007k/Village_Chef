import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiMinus, FiPlus, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { foodService } from '../services/api';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [relatedFoods, setRelatedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  // Fallback Mock Dataset for offline robust execution
  const fallbackFoods = [
    { id: 1, name: 'Classic Cheese Pizza', description: 'Freshly baked hand-tossed crust topped with rich tomato sauce, premium mozzarella cheese, and aromatic Italian herbs.', price: 299, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', category: 'Pizzas', rating: 4.8, ingredients: 'Mozzarella, Tomato Sauce, Oregano, Basil, Wheat Crust', veg: true, available: true },
    { id: 2, name: 'Spicy Paneer Tikka Burger', description: 'Crispy spiced paneer patty topped with fresh lettuce, onions, sliced tomatoes, and a special house-made tandoori mayonnaise in toasted buns.', price: 189, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.5, ingredients: 'Paneer, Lettuce, Onions, Tandoori Sauce, Burger Bun', veg: true, available: true },
    { id: 3, name: 'Village Special Chicken Curry', description: 'A hearty, slow-cooked farmhouse chicken curry infused with fresh roasted ground spices, coconut milk, and fresh curry leaves.', price: 349, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', category: 'Main Dishes', rating: 4.9, ingredients: 'Chicken, Ground Spices, Coconut Milk, Curry Leaves, Onions', veg: false, available: true },
    { id: 4, name: 'Traditional Veg Thali', description: 'A classic platter consisting of aromatic basmati rice, buttery dal tadka, dry mix veg sabzi, paneer butter masala, raita, and 2 fresh rotis.', price: 279, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', category: 'Main Dishes', rating: 4.7, ingredients: 'Rice, Dal, Paneer, Mixed Veg, Roti, Curd', veg: true, available: true },
    { id: 5, name: 'Country Fried Chicken Wings', description: "Crispy, deep-fried chicken wings coated in a spicy buttermilk batter and served with chef's signature smoky BBQ dipping sauce.", price: 249, imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.6, ingredients: 'Chicken Wings, Spicy Batter, BBQ Sauce, Garlic Butter', veg: false, available: true },
    { id: 6, name: 'Gourmet Garden Salad', description: 'A crisp, refreshing bowl of fresh romaine lettuce, cherry tomatoes, cucumbers, bell peppers, olives, and feta cheese, tossed in Greek vinaigrette.', price: 159, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', category: 'Salads', rating: 4.3, ingredients: 'Romaine Lettuce, Cherry Tomatoes, Olives, Cucumber, Feta Cheese', veg: true, available: true },
    { id: 7, name: 'Classic Fudge Brownie', description: 'Warm, fudgy chocolate brownie loaded with chocolate chips and served with a drizzle of rich hot chocolate fudge.', price: 129, imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', category: 'Desserts', rating: 4.7, ingredients: 'Dark Chocolate, Butter, Flour, Sugar, Chocolate Chips', veg: true, available: true },
    { id: 8, name: 'Fresh Strawberry Milkshake', description: 'Creamy, rich milkshake blended with fresh strawberries and vanilla ice cream, topped with whipped cream and a cherry.', price: 119, imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80', category: 'Drinks', rating: 4.4, ingredients: 'Fresh Strawberries, Whole Milk, Vanilla Ice Cream, Sugar', veg: true, available: true },
    { id: 9, name: 'Traditional Sweet Mango Lassi', description: 'A classic, cooling yoghurt-based drink blended with ripe sweet mangoes and topped with crushed pistachios.', price: 99, imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80', category: 'Drinks', rating: 4.8, ingredients: 'Sweet Mango Pulp, Yoghurt, Milk, Sugar, Cardamom', veg: true, available: true },
    { id: 10, name: 'Double Cheese Beef Burger', description: 'Juicy flame-grilled double beef patty layered with double cheddar cheese, dill pickles, onions, mustard, and ketchup in a brioche bun.', price: 259, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.9, ingredients: 'Beef Patty, Cheddar Cheese, Pickles, Brioche Bun, Mustard', veg: false, available: true },
    { id: 11, name: 'BBQ Paneer Pizza', description: 'Crispy thin crust pizza loaded with smoky BBQ marinated paneer cubes, red onions, bell peppers, and fresh cilantro.', price: 329, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', category: 'Pizzas', rating: 4.6, ingredients: 'Paneer, BBQ Sauce, Onions, Bell Peppers, Cilantro, Mozzarella', veg: true, available: true }
  ];

  useEffect(() => {
    const fetchFoodDetails = async () => {
      setLoading(true);
      try {
        const data = await foodService.getFoodById(id);
        setFood(data);
        
        // Fetch related foods in same category
        const allFoods = await foodService.getAllFoods();
        const related = allFoods
          .filter((item) => item.category === data.category && item.id !== data.id)
          .slice(0, 4);
        setRelatedFoods(related);
      } catch (error) {
        console.error("API error fetching detail, searching fallback dataset", error);
        
        const selected = fallbackFoods.find(item => item.id === parseInt(id));
        if (selected) {
          setFood(selected);
          const related = fallbackFoods
            .filter((item) => item.category === selected.category && item.id !== selected.id)
            .slice(0, 4);
          setRelatedFoods(related);
        } else {
          // If ID not found, navigate back to menu
          navigate('/menu');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
    setQuantity(1); // Reset quantity counter on ID switch
  }, [id]);

  const handleAddToCart = () => {
    if (food) {
      addToCart(food, quantity);
      setToastMessage(`Added ${quantity} x "${food.name}" to cart!`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleBuyNow = () => {
    if (food) {
      addToCart(food, quantity);
      navigate('/cart');
    }
  };

  const handleNotify = (name) => {
    setToastMessage(`Added "${name}" to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (!food) return null;

  // Split ingredients list
  const ingredientList = food.ingredients
    ? food.ingredients.split(',').map((i) => i.trim())
    : [];

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 md:px-12 py-12">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#F59E0B] text-[#0F0F0F] font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <FiCheckCircle className="w-5 h-5 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Back Link */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold text-sm"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </Link>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Food Image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-[#F59E0B]/5 bg-zinc-800">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            {/* Rating Indicator */}
            <div className="absolute top-6 left-6 bg-[#0F0F0F]/80 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
              <FiStar className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-sm font-bold text-white">{food.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Right: Info panel */}
          <div className="space-y-8">
            
            {/* Category and Badges */}
            <div className="flex items-center gap-3">
              <span className="bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {food.category}
              </span>
              <span className="bg-zinc-800 text-zinc-300 border border-white/5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${food.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                {food.veg ? 'Veg' : 'Non-Veg'}
              </span>
            </div>

            {/* Food Name & Price */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit] leading-tight">{food.name}</h1>
              <div className="flex items-baseline pt-1">
                <span className="text-xl font-light text-zinc-400">₹</span>
                <span className="text-3xl font-extrabold text-[#F59E0B] ml-1">{food.price.toFixed(0)}</span>
                <span className="text-zinc-500 text-sm ml-1">/-</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Description</h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{food.description}</p>
            </div>

            {/* Ingredients */}
            {ingredientList.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredientList.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3.5 py-1.5 bg-zinc-800/80 border border-white/5 rounded-xl text-xs text-zinc-300 font-semibold"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-white/5" />

            {/* Actions Panel */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Quantity controller */}
              <div className="flex items-center gap-4 bg-zinc-800/80 border border-white/5 p-2 rounded-2xl w-full sm:w-auto justify-between">
                <span className="text-xs font-bold text-zinc-400 pl-3 uppercase tracking-wider">Qty</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="w-10 h-10 rounded-xl bg-zinc-700 hover:bg-zinc-650 flex items-center justify-center text-white"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-base font-bold text-white select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-zinc-700 hover:bg-zinc-650 flex items-center justify-center text-white"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-4 border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#0F0F0F] rounded-full font-bold transition-all duration-300"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 sm:flex-initial px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full transition-all duration-300 shadow-lg shadow-[#F59E0B]/10"
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Related Items Section */}
        {relatedFoods.length > 0 && (
          <div className="space-y-8 pt-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-[Outfit]">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedFoods.map((item) => (
                <FoodCard key={item.id} food={item} onAddToCartNotify={handleNotify} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default FoodDetails;
