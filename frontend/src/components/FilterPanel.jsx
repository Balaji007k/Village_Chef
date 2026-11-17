import React from 'react';

const FilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  isVeg,
  setIsVeg,
  maxPrice,
  setMaxPrice,
  categories,
  onReset
}) => {
  return (
    <div className="bg-[#1C1C1E] border border-white/5 rounded-3xl p-6 space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="font-[Outfit] font-bold text-white text-lg">Filters</h3>
        <button
          onClick={onReset}
          className="text-xs text-[#F59E0B] hover:text-amber-300 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#F59E0B] text-[#0F0F0F]'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Veg / Non-Veg Toggle */}
      <div>
        <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Dietary Preferences</h4>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setIsVeg('')}
            className={`py-2 rounded-xl text-xs font-semibold text-center border transition-all duration-300 ${
              isVeg === ''
                ? 'bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]'
                : 'bg-zinc-800 border-transparent text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setIsVeg(true)}
            className={`py-2 rounded-xl text-xs font-semibold text-center border transition-all duration-300 flex items-center justify-center gap-1.5 ${
              isVeg === true
                ? 'bg-green-500/10 border-green-500 text-green-500'
                : 'bg-zinc-800 border-transparent text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Veg
          </button>
          <button
            onClick={() => setIsVeg(false)}
            className={`py-2 rounded-xl text-xs font-semibold text-center border transition-all duration-300 flex items-center justify-center gap-1.5 ${
              isVeg === false
                ? 'bg-red-500/10 border-red-500 text-red-500'
                : 'bg-zinc-800 border-transparent text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Non-Veg
          </button>
        </div>
      </div>

      {/* Price Filter Slider */}
      <div>
        <div className="flex justify-between text-sm font-semibold mb-2">
          <h4 className="text-zinc-300 uppercase tracking-wider text-xs font-bold">Max Price</h4>
          <span className="text-[#F59E0B]">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-yellow bg-zinc-800 h-1 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-semibold">
          <span>₹50</span>
          <span>₹500</span>
        </div>
      </div>

    </div>
  );
};

export default FilterPanel;
