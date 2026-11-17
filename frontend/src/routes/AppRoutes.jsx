import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import FoodDetails from '../pages/FoodDetails';
import Cart from '../pages/Cart';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AdminDashboard from '../pages/AdminDashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminLogin from '../pages/AdminLogin';
import { useAuth } from '../context/AuthContext';

// Protected Admin Route wrapper
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/food/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
      {/* Redirect fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
