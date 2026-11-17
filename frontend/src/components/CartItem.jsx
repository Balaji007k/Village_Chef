import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#1C1C1E] hover:bg-zinc-900 border border-white/5 rounded-2xl transition-all duration-300">
      
      {/* Item Image and Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/5">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-white text-base truncate pr-2">{item.name}</h4>
          <span className="text-xs text-[#F59E0B] font-medium uppercase tracking-wider">{item.category}</span>
          <div className="flex items-center gap-2 mt-1 sm:hidden">
            <span className="text-sm font-semibold text-white">₹{item.price.toFixed(0)}</span>
            <span className="text-zinc-500 text-xs">x {item.quantity}</span>
          </div>
        </div>
      </div>

      {/* Control Quantity, Subtotal, and Delete */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
        
        {/* Unit Price (Desktop only) */}
        <div className="hidden sm:block text-right">
          <span className="text-zinc-400 text-xs font-light">Price</span>
          <p className="font-semibold text-white">₹{item.price.toFixed(0)}</p>
        </div>

        {/* Quantity Controllers */}
        <div className="flex items-center bg-zinc-800 border border-white/5 rounded-xl px-2 py-1.5 gap-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="w-6 text-center text-sm font-bold text-white select-none">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[70px]">
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block sm:hidden">Total</span>
          <p className="font-bold text-[#F59E0B]">₹{(item.price * item.quantity).toFixed(0)}</p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-zinc-500 hover:text-red-500 transition-colors p-1"
          title="Remove Item"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>

      </div>
      
    </div>
  );
};

export default CartItem;
