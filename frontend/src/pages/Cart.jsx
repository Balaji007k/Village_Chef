import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight, FiCheckCircle, FiInbox } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VILLAGE20') {
      const discount = getCartTotal() * 0.20;
      setPromoDiscount(discount);
      setPromoSuccess('Promo code "VILLAGE20" (20% Off) applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "VILLAGE20"');
      setPromoSuccess('');
      setPromoDiscount(0);
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  const grandTotal = getCartTotal() - promoDiscount + deliveryFee;

  // Checkout Success Screen
  if (checkoutComplete) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] px-6 py-20 flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] rounded-full flex items-center justify-center shadow-lg shadow-[#F59E0B]/5">
          <FiCheckCircle className="w-10 h-10 stroke-[2]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white font-[Outfit]">Order Placed Successfully!</h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Thank you for choosing **Village Chef**! Your order is being freshly prepared on our traditional firewood fires and will be dispatched shortly.
        </p>
        <div className="bg-zinc-800/40 border border-white/5 p-4 rounded-2xl w-full text-left space-y-2 text-xs">
          <p className="text-zinc-500 font-bold uppercase tracking-wider">Estimated Delivery Time</p>
          <p className="text-white font-bold text-sm">30 - 45 Minutes</p>
          <p className="text-zinc-500">A confirmation email has been sent to your registered email address.</p>
        </div>
        <Link
          to="/menu"
          className="inline-block px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full transition-all duration-300 transform active:scale-95"
        >
          Explore More Foods
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">Shopping Cart</h1>
          <p className="text-zinc-500 text-sm">Manage items, apply coupons, and checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart UI */
          <div className="text-center py-24 bg-[#1C1C1E] border border-white/5 rounded-3xl max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-zinc-800 border border-white/5 text-zinc-500 rounded-full flex items-center justify-center mx-auto">
              <FiInbox className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Your Cart is Empty</h3>
              <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                Looks like you haven't added any items to your cart yet. Visit our menu to get started.
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-[#F59E0B]/5"
            >
              <span>Go to Menu</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Details Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between px-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                <span>Items ({cartItems.length})</span>
                <span>Actions</span>
              </div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary Panel */}
            <div className="lg:col-span-1 space-y-6 bg-[#1C1C1E] border border-white/5 rounded-3xl p-6">
              <h3 className="font-[Outfit] font-bold text-white text-lg border-b border-white/5 pb-3">
                Order Summary
              </h3>

              {/* Price Details */}
              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">₹{getCartTotal().toFixed(0)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount (20%)</span>
                    <span>- ₹{promoDiscount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-white font-semibold">₹{deliveryFee}</span>
                </div>
                <hr className="border-white/5" />
                <div className="flex justify-between text-base font-bold text-white pt-1">
                  <span>Grand Total</span>
                  <span className="text-[#F59E0B]">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Apply Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. VILLAGE20)"
                    className="flex-1 bg-zinc-800 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[#F59E0B] text-[#0F0F0F] rounded-xl text-xs font-bold hover:bg-[#D97706] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[10px] text-red-500 font-semibold">{promoError}</p>}
                {promoSuccess && <p className="text-[10px] text-green-500 font-semibold">{promoSuccess}</p>}
              </form>

              <hr className="border-white/5" />

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F59E0B]/10 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
