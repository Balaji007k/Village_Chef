import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { foodService } from '../services/api';
import FoodCard from '../components/FoodCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  // Filtering States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVeg, setIsVeg] = useState(''); // '' (All), true, false
  const [maxPrice, setMaxPrice] = useState(500);

  // Sorting state
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'rating'

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Categories list
  const categories = ['All', 'Burgers', 'Pizzas', 'Main Dishes', 'Drinks', 'Desserts', 'Salads'];

  // Fallback Mock Data in case backend is offline
  const fallbackFoods = [
    { id: 1, name: 'Classic Cheese Pizza', description: 'Hand-tossed crust topped with rich tomato sauce, premium mozzarella, and aromatic Italian herbs.', price: 299, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', category: 'Pizzas', rating: 4.8, veg: true },
    { id: 2, name: 'Spicy Paneer Tikka Burger', description: 'Crispy paneer patty topped with fresh lettuce, onions, and tandoori mayo in toasted buns.', price: 189, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.5, veg: true },
    { id: 3, name: 'Village Special Chicken Curry', description: 'A slow-cooked chicken curry infused with roasted ground spices, coconut milk, and curry leaves.', price: 349, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', category: 'Main Dishes', rating: 4.9, veg: false },
    { id: 4, name: 'Traditional Veg Thali', description: 'Basmati rice, dal tadka, mix veg, paneer butter masala, raita, and 2 fresh rotis.', price: 279, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', category: 'Main Dishes', rating: 4.7, veg: true },
    { id: 5, name: 'Country Fried Chicken Wings', description: 'Crispy chicken wings in buttermilk batter served with signature BBQ dipping sauce.', price: 249, imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.6, veg: false },
    { id: 6, name: 'Gourmet Garden Salad', description: 'Romaine lettuce, cherry tomatoes, cucumbers, bell peppers, olives, feta, tossed in Greek dressing.', price: 159, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', category: 'Salads', rating: 4.3, veg: true },
    { id: 7, name: 'Classic Fudge Brownie', description: 'Warm fudgy brownie loaded with chocolate chips, served with hot chocolate fudge drizzle.', price: 129, imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', category: 'Desserts', rating: 4.7, veg: true },
    { id: 8, name: 'Fresh Strawberry Milkshake', description: 'Creamy milkshake blended with fresh strawberries and vanilla ice cream, topped with cream.', price: 119, imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80', category: 'Drinks', rating: 4.4, veg: true },
    { id: 9, name: 'Traditional Sweet Mango Lassi', description: 'Cooling yoghurt-based drink blended with ripe sweet mangoes and topped with pistachios.', price: 99, imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80', category: 'Drinks', rating: 4.8, veg: true },
    { id: 10, name: 'Double Cheese Beef Burger', description: 'Juicy double beef patty layered with double cheddar, pickles, and mustard in brioche bun.', price: 259, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.9, veg: false },
    { id: 11, name: 'BBQ Paneer Pizza', description: 'BBQ marinated paneer cubes, red onions, bell peppers, fresh cilantro and mozzarella.', price: 329, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', category: 'Pizzas', rating: 4.6, veg: true }
  ];

  // Fetch foods with filters
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const data = await foodService.getAllFoods({
          category: selectedCategory,
          isVeg: isVeg,
          maxPrice: maxPrice,
          search: search,
        });
        setFoods(data);
      } catch (error) {
        console.error("API error, applying client-side filtering on mock data", error);
        
        // Apply manual client side filters to mock data
        let filtered = [...fallbackFoods];
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(f => f.category === selectedCategory);
        }
        if (isVeg !== '') {
          filtered = filtered.filter(f => f.veg === isVeg);
        }
        if (maxPrice) {
          filtered = filtered.filter(f => f.price <= maxPrice);
        }
        if (search) {
          const query = search.toLowerCase();
          filtered = filtered.filter(f => f.name.toLowerCase().includes(query) || f.description.toLowerCase().includes(query));
        }
        setFoods(filtered);
      } finally {
        setLoading(false);
      }
    };

    // Add a small debounce for search input
    const delayDebounceFn = setTimeout(() => {
      fetchFoods();
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedCategory, isVeg, maxPrice]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setIsVeg('');
    setMaxPrice(500);
    setSortBy('default');
    setCurrentPage(1);
  };

  const handleNotify = (name) => {
    setToastMessage(`Added "${name}" to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sort Foods
  const sortedFoods = [...foods].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default sorting (no change)
  });

  // Client Side Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 md:px-12 py-12">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#F59E0B] text-[#0F0F0F] font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <FiCheckCircle className="w-5 h-5 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">Village Oven Menu</h1>
          <p className="text-zinc-500 text-sm max-w-lg">
            Explore our traditional collection of hot rustic meals, freshly baked pizzas, slow cooked curries, and home-spun milkshakes.
          </p>
        </div>

        {/* Search & Sort Panel */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1C1C1E]/40 border border-white/5 p-4 rounded-2xl">
          <div className="w-full md:max-w-xl">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1C1C1E] border border-white/5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]"
            >
              <option value="default">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isVeg={isVeg}
              setIsVeg={setIsVeg}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              categories={categories}
              onReset={handleReset}
            />
          </div>

          {/* Foods Display Grid */}
          <div className="lg:col-span-3 space-y-8">
            {loading ? (
              <Loader />
            ) : currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((food) => (
                    <FoodCard key={food.id} food={food} onAddToCartNotify={handleNotify} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-xl bg-[#1C1C1E] hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-[#1C1C1E] flex items-center justify-center text-white font-bold transition-all border border-white/5 cursor-pointer"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-zinc-400 text-sm font-semibold">
                      Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-xl bg-[#1C1C1E] hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-[#1C1C1E] flex items-center justify-center text-white font-bold transition-all border border-white/5 cursor-pointer"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-[#1C1C1E] border border-white/5 rounded-3xl space-y-4">
                <p className="text-zinc-400 font-bold text-lg">No dishes match your filters</p>
                <p className="text-zinc-600 text-xs">Try adjusting your filters or clearing search query</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold text-sm transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Menu;
