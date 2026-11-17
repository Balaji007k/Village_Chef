import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food, onAddToCartNotify }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food, 1);
    if (onAddToCartNotify) {
      onAddToCartNotify(food.name);
    }
  };

  return (
    <div className="group relative bg-[#1C1C1E] hover:bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#F59E0B]/5 flex flex-col justify-between">
      
      {/* Link to Details */}
      <Link to={`/food/${food.id}`} className="block overflow-hidden relative">
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 z-10 bg-[#0F0F0F]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
          <FiStar className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-xs font-bold text-white">{food.rating.toFixed(1)}</span>
        </div>

        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-4 right-4 z-10 bg-[#0F0F0F]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
          <span className={`w-2 h-2 rounded-full ${food.veg ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] uppercase font-bold text-zinc-300">
            {food.veg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#F59E0B] uppercase mb-1 block">
            {food.category}
          </span>
          <Link to={`/food/${food.id}`} className="hover:text-[#F59E0B] transition-colors duration-200">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{food.name}</h3>
          </Link>
          <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">{food.description}</p>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-baseline">
            <span className="text-sm font-light text-zinc-400">₹</span>
            <span className="text-xl font-bold text-white ml-0.5">{food.price.toFixed(0)}</span>
            <span className="text-zinc-500 text-xs ml-1">/-</span>
          </div>
          
          <button
            onClick={handleAdd}
            className="w-9 h-9 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] flex items-center justify-center font-bold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            title="Add to Cart"
          >
            <FiPlus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
