import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiTruck, FiSmile, FiPhoneCall } from 'react-icons/fi';
import { foodService } from '../services/api';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await foodService.getAllFoods();
        // Take top 4 highest rated foods
        const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, 4);
        setFeaturedFoods(sorted);
      } catch (error) {
        console.error("Error fetching foods, using mock data fallback", error);
        // Fallback mock data in case backend is offline
        const mockFoods = [
          { id: 1, name: 'Classic Cheese Pizza', description: 'Hand-tossed crust topped with rich tomato sauce, premium mozzarella, and aromatic Italian herbs.', price: 299, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', category: 'Pizzas', rating: 4.8, veg: true },
          { id: 3, name: 'Village Special Chicken Curry', description: 'A slow-cooked chicken curry infused with roasted ground spices, coconut milk, and curry leaves.', price: 349, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', category: 'Main Dishes', rating: 4.9, veg: false },
          { id: 2, name: 'Spicy Paneer Tikka Burger', description: 'Crispy paneer patty topped with fresh lettuce, onions, and tandoori mayo in toasted buns.', price: 189, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.5, veg: true },
          { id: 10, name: 'Double Cheese Beef Burger', description: 'Juicy double beef patty layered with double cheddar, pickles, and mustard in brioche bun.', price: 259, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.9, veg: false },
        ];
        setFeaturedFoods(mockFoods);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleNotify = (name) => {
    setToastMessage(`Added "${name}" to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F0F] overflow-x-hidden">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#F59E0B] text-[#0F0F0F] font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <FiCheckCircle className="w-5 h-5 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-zinc-800/60 backdrop-blur-sm border border-white/5 py-1.5 px-4 rounded-full text-[#F59E0B] font-bold text-xs tracking-wider uppercase">
            <span>🔥 Hot Deals This Week</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight font-[Outfit]">
            Grab Big Deals on <br className="hidden md:inline"/>
            <span className="text-[#F59E0B]">Yummy Meals!</span>
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur. Aenean mau risnam tortor curabitur phasellus. Authentic recipes cooked by standard chefs with woodfire flames.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto text-center px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full transition-all duration-300 shadow-lg shadow-[#F59E0B]/10 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto text-center px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full border border-white/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Our Story</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Happy Customers (Overlapping avatars) */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                alt="customer"
                className="w-10 h-10 rounded-full object-cover border-2 border-brand-dark"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                alt="customer"
                className="w-10 h-10 rounded-full object-cover border-2 border-brand-dark"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                alt="customer"
                className="w-10 h-10 rounded-full object-cover border-2 border-brand-dark"
              />
            </div>
            <div className="text-sm">
              <span className="text-white font-bold block">Our Happy Customers</span>
              <span className="text-zinc-400">★ 4.8 <span className="text-zinc-600">(18.5k Reviews)</span></span>
            </div>
          </div>
        </div>

        {/* Right Hero Image Platter */}
        <div className="flex-1 relative max-w-md lg:max-w-xl">
          {/* Main Food Platter */}
          <div className="relative z-10 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full overflow-hidden border-8 border-zinc-900 shadow-2xl shadow-[#F59E0B]/5 mx-auto animate-spin-slow">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="village food platter"
              className="w-full h-full object-cover scale-110"
            />
          </div>

          {/* Floating Courier Badge */}
          <div className="absolute bottom-6 left-0 sm:-left-6 z-20 flex items-center gap-3 bg-[#1C1C1E]/90 backdrop-blur-md border border-white/5 py-2.5 px-4 rounded-2xl shadow-xl max-w-xs transition-transform duration-300 hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
              alt="courier"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Jon Williamson</span>
              <span className="text-[10px] text-zinc-500 block">Food Courier</span>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] flex items-center justify-center transition-colors">
              <FiPhoneCall className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Floating Food Tag */}
          <div className="absolute top-12 right-0 sm:-right-4 z-20 bg-[#1C1C1E]/90 backdrop-blur-md border border-white/5 p-3 rounded-2xl shadow-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&h=100&q=80"
              alt="Cheese Pizza"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="text-left text-xs">
              <span className="font-bold text-white block">Cheese Pizza</span>
              <span className="text-[#F59E0B] font-bold block">₹299/-</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-[#1C1C1E]/30 border-y border-white/5 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Special Selection</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">Featured Foods</h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto">
              Savor our chef's hand-picked specialties, made with freshly harvested local village ingredients.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredFoods.map((food) => (
                <FoodCard key={food.id} food={food} onAddToCartNotify={handleNotify} />
              ))}
            </div>
          )}

          <div className="text-center pt-6">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-[#F59E0B] font-bold hover:text-amber-300 transition-colors"
            >
              <span>View Full Menu</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Our Strengths</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">Why Choose Us?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-3xl space-y-4 group hover:border-[#F59E0B]/25 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-[#0F0F0F] transition-all duration-500">
              <FiSmile className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Traditional Cooking</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Our meals are crafted with woodfire recipes passed down through generations in native farming families.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-3xl space-y-4 group hover:border-[#F59E0B]/25 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-[#0F0F0F] transition-all duration-500">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Fresh Farm Ingredients</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We source daily vegetables and meats directly from cooperative village farmers, ensuring high quality.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-3xl space-y-4 group hover:border-[#F59E0B]/25 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-[#0F0F0F] transition-all duration-500">
              <FiTruck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Super-fast Delivery</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Our dedicated courier team guarantees that your food reaches you piping hot, fresh out of the ovens.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
