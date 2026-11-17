import axios from 'axios';

// Get API base URL from environment variables, or use default local Spring Boot backend url
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const foodService = {
  // Fetch all foods with filters
  getAllFoods: async (filters = {}) => {
    const params = {};
    if (filters.category && filters.category !== 'All') {
      params.category = filters.category;
    }
    if (filters.isVeg !== undefined && filters.isVeg !== null && filters.isVeg !== '') {
      params.isVeg = filters.isVeg;
    }
    if (filters.maxPrice) {
      params.maxPrice = filters.maxPrice;
    }
    if (filters.search) {
      params.search = filters.search;
    }

    const response = await api.get('/foods', { params });
    return response.data;
  },

  // Get single food by ID
  getFoodById: async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
  },

  // Add new food
  createFood: async (foodData) => {
    const response = await api.post('/foods', foodData);
    return response.data;
  },

  // Update existing food
  updateFood: async (id, foodData) => {
    const response = await api.put(`/foods/${id}`, foodData);
    return response.data;
  },

  // Delete food
  deleteFood: async (id) => {
    await api.delete(`/foods/${id}`);
  },
};

export const contactService = {
  // Submit contact message
  submitMessage: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
  // Get all contact messages (Admin Dashboard)
  getAllMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  },
};

export const authService = {
  // Register a new user
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  // Login user or admin
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export default api;
