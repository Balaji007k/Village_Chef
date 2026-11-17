import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiLogIn, FiMenu, FiX, FiUser, FiLogOut, FiChevronDown, FiShield } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-brand-yellow to-amber-400 rounded-tr-3xl rounded-bl-3xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#F59E0B]/20">
            <span className="text-[#0F0F0F] font-extrabold text-xl font-[Outfit]">V</span>
          </div>
          <div>
            <span className="font-[Outfit] font-bold text-2xl tracking-tight text-white group-hover:text-[#F59E0B] transition-colors duration-300">Village</span>
            <span className="font-[Outfit] font-light text-xl text-[#F59E0B] block -mt-2 tracking-widest text-center uppercase">Chef</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-medium transition-colors duration-300 hover:text-[#F59E0B] ${
              isActive('/') ? 'text-[#F59E0B]' : 'text-zinc-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-medium transition-colors duration-300 hover:text-[#F59E0B] ${
              isActive('/about') ? 'text-[#F59E0B]' : 'text-zinc-300'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/menu"
            className={`font-medium transition-colors duration-300 hover:text-[#F59E0B] ${
              isActive('/menu') ? 'text-[#F59E0B]' : 'text-zinc-300'
            }`}
          >
            Menu
          </Link>
          <Link
            to="/contact"
            className={`font-medium transition-colors duration-300 hover:text-[#F59E0B] ${
              isActive('/contact') ? 'text-[#F59E0B]' : 'text-zinc-300'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Action Icons & Login */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/menu" className="text-zinc-300 hover:text-[#F59E0B] transition-colors duration-300">
            <FiSearch className="w-5 h-5 cursor-pointer" />
          </Link>
          
          <Link to="/cart" className="relative text-zinc-300 hover:text-[#F59E0B] transition-colors duration-300">
            <FiShoppingCart className="w-5 h-5 cursor-pointer" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#0F0F0F] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark animate-pulse">
                {getCartCount()}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1C1E] border border-white/10 text-white hover:border-[#F59E0B]/40 font-medium transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F59E0B] to-amber-400 text-[#0F0F0F] text-xs font-bold flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name.split(' ')[0]}</span>
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#1C1C1E] border border-white/10 rounded-2xl p-2 shadow-xl z-50">
                  <div className="px-4 py-2.5 border-b border-white/5 mb-1.5">
                    <p className="text-xs text-zinc-500 font-medium">Logged in as</p>
                    <p className="text-sm text-white font-semibold truncate">{user.email}</p>
                  </div>
                  {user.role === 'ADMIN' && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300 hover:text-[#F59E0B] hover:bg-white/5 rounded-xl transition-all duration-200"
                    >
                      <FiShield className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                      navigate('/');
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-left"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#0F0F0F] hover:border-[#F59E0B] font-medium transition-all duration-300 transform active:scale-95 shadow-md shadow-[#F59E0B]/5"
            >
              <FiLogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative text-zinc-300 hover:text-[#F59E0B] transition-colors duration-300">
            <FiShoppingCart className="w-6 h-6 cursor-pointer" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#0F0F0F] font-bold text-[9px] w-5.5 h-5.5 rounded-full flex items-center justify-center border border-brand-dark">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-300 hover:text-[#F59E0B] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-[#1C1C1E]/90 rounded-2xl p-5 border border-white/5 space-y-4 animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-medium hover:text-[#F59E0B] ${isActive('/') ? 'text-[#F59E0B]' : 'text-zinc-300'}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-medium hover:text-[#F59E0B] ${isActive('/about') ? 'text-[#F59E0B]' : 'text-zinc-300'}`}
          >
            About Us
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-medium hover:text-[#F59E0B] ${isActive('/menu') ? 'text-[#F59E0B]' : 'text-zinc-300'}`}
          >
            Menu
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-medium hover:text-[#F59E0B] ${isActive('/contact') ? 'text-[#F59E0B]' : 'text-zinc-300'}`}
          >
            Contact
          </Link>
          <hr className="border-white/10" />
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F59E0B] to-amber-400 text-[#0F0F0F] font-bold flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-zinc-500 truncate max-w-[200px]">{user.email}</p>
                </div>
              </div>
              {user.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-all duration-200"
                >
                  <FiShield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-all duration-200"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#F59E0B] text-[#0F0F0F] hover:bg-[#D97706] font-medium transition-all duration-300"
            >
              <FiLogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
