import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
        <FiSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for delicious dishes, pizzas, desserts..."
        className="w-full pl-12 pr-10 py-3 bg-[#1C1C1E] hover:bg-zinc-900 border border-white/5 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-300 shadow-md"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
