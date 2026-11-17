import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('village_chef_user');
    return localUser ? JSON.parse(localUser) : null;
  });

  const register = async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      if (data.status === 'success') {
        const userSession = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token
        };
        setUser(userSession);
        localStorage.setItem('village_chef_user', JSON.stringify(userSession));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Server error during registration' 
      };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data.status === 'success') {
        const userSession = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token
        };
        setUser(userSession);
        localStorage.setItem('village_chef_user', JSON.stringify(userSession));
        return { success: true, user: userSession };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Invalid email or password' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('village_chef_user');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
