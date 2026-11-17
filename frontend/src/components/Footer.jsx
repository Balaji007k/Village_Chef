import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#1C1C1E]/60 border-t border-white/5 pt-16 pb-8 px-6 md:px-12 text-zinc-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-brand-yellow to-amber-400 rounded-tr-2xl rounded-bl-2xl flex items-center justify-center">
              <span className="text-[#0F0F0F] font-extrabold text-lg font-[Outfit]">V</span>
            </div>
            <div>
              <span className="font-[Outfit] font-bold text-xl tracking-tight text-white">Village</span>
              <span className="font-[Outfit] font-light text-sm text-[#F59E0B] block -mt-1 tracking-widest uppercase">Chef</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-zinc-500">
            Bringing the authentic taste of rustic village recipe fires right to your cozy modern table. Fresh ingredients, traditional culinary skills.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-[#F59E0B] hover:text-[#0F0F0F] flex items-center justify-center text-white transition-colors duration-300">
              <FiFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-[#F59E0B] hover:text-[#0F0F0F] flex items-center justify-center text-white transition-colors duration-300">
              <FiTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-[#F59E0B] hover:text-[#0F0F0F] flex items-center justify-center text-white transition-colors duration-300">
              <FiInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-[Outfit] font-bold text-white text-lg mb-4 border-b border-[#F59E0B]/10 pb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#F59E0B] transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#F59E0B] transition-colors duration-300">About Us</Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-[#F59E0B] transition-colors duration-300">Our Menu</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F59E0B] transition-colors duration-300">Contact Us</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-[#F59E0B] transition-colors duration-300">Admin Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="font-[Outfit] font-bold text-white text-lg mb-4 border-b border-[#F59E0B]/10 pb-2">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li className="flex justify-between">
              <span>Monday - Friday</span>
              <span className="text-zinc-300">10:00 AM - 10:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-zinc-300">09:00 AM - 11:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-[#F59E0B] font-medium">09:00 AM - 11:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-[Outfit] font-bold text-white text-lg mb-4 border-b border-[#F59E0B]/10 pb-2">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FiMapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>128 Old Farm Road, Village Square, Greenhills</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="w-5 h-5 text-[#F59E0B] shrink-0" />
              <span>+1 (555) 492-3029</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="w-5 h-5 text-[#F59E0B] shrink-0" />
              <span>support@villagechef.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Rights */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
        <p>© 2026 Village Chef Food App. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
