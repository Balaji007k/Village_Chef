import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMessageSquare, FiGrid, FiDollarSign, FiPlusCircle, FiXCircle, FiTrendingUp } from 'react-icons/fi';
import { foodService, contactService } from '../services/api';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'messages'
  const [toastMessage, setToastMessage] = useState('');

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null); // null if adding
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Pizzas',
    rating: 5.0,
    ingredients: '',
    veg: true,
    available: true
  });

  // Mock fallbacks for resilient frontend visualization
  const fallbackFoods = [
    { id: 1, name: 'Classic Cheese Pizza', description: 'Freshly baked hand-tossed crust topped with rich tomato sauce, premium mozzarella cheese.', price: 299, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', category: 'Pizzas', rating: 4.8, ingredients: 'Mozzarella, Tomato, Basil', veg: true, available: true },
    { id: 2, name: 'Spicy Paneer Tikka Burger', description: 'Crispy paneer patty topped with fresh lettuce, onions, and tandoori mayo in toasted buns.', price: 189, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', category: 'Burgers', rating: 4.5, ingredients: 'Paneer, Bun, Tandoori Sauce', veg: true, available: true },
  ];

  const fallbackMessages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Hello! I would love to order catering for an event next month.', createdAt: '2026-06-18T12:00:00' },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const foodsData = await foodService.getAllFoods();
      setFoods(foodsData);
      
      const messagesData = await contactService.getAllMessages();
      setMessages(messagesData);
    } catch (error) {
      console.error("API error loading dashboard data, applying fallbacks", error);
      setFoods(fallbackFoods);
      setMessages(fallbackMessages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOpenAdd = () => {
    setEditingFood(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: 'Pizzas',
      rating: 5.0,
      ingredients: '',
      veg: true,
      available: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description || '',
      price: food.price,
      imageUrl: food.imageUrl || '',
      category: food.category,
      rating: food.rating,
      ingredients: food.ingredients || '',
      veg: food.veg,
      available: food.available
    });
    setIsModalOpen(true);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    };

    try {
      if (editingFood) {
        // Edit API call
        const updated = await foodService.updateFood(editingFood.id, formattedData);
        setFoods((prev) => prev.map((f) => (f.id === editingFood.id ? updated : f)));
        showToast(`Updated "${formattedData.name}" successfully!`);
      } else {
        // Create API call
        const created = await foodService.createFood(formattedData);
        setFoods((prev) => [...prev, created]);
        showToast(`Added "${formattedData.name}" successfully!`);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("API save failed, simulating local save for preview", error);
      
      if (editingFood) {
        const updated = { ...editingFood, ...formattedData };
        setFoods((prev) => prev.map((f) => (f.id === editingFood.id ? updated : f)));
        showToast(`Updated "${formattedData.name}" (Local update)`);
      } else {
        const created = { id: Date.now(), ...formattedData };
        setFoods((prev) => [...prev, created]);
        showToast(`Added "${formattedData.name}" (Local addition)`);
      }
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await foodService.deleteFood(id);
        setFoods((prev) => prev.filter((f) => f.id !== id));
        showToast(`Deleted "${name}" successfully.`);
      } catch (error) {
        console.error("API delete failed, performing local delete", error);
        setFoods((prev) => prev.filter((f) => f.id !== id));
        showToast(`Deleted "${name}" (Local delete)`);
      }
    }
  };

  const toggleAvailability = async (food) => {
    const updatedData = { ...food, available: !food.available };
    try {
      const updated = await foodService.updateFood(food.id, updatedData);
      setFoods((prev) => prev.map((f) => (f.id === food.id ? updated : f)));
      showToast(`Updated availability for "${food.name}"`);
    } catch (error) {
      console.error("API update availability failed, applying locally", error);
      setFoods((prev) => prev.map((f) => (f.id === food.id ? updatedData : f)));
      showToast(`Updated availability for "${food.name}" (Local update)`);
    }
  };

  // Stats
  const totalFoods = foods.length;
  const categoriesCount = new Set(foods.map((f) => f.category)).size;
  const vegCount = foods.filter((f) => f.veg).length;

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 md:px-12 py-12">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#F59E0B] text-[#0F0F0F] font-bold px-6 py-3 rounded-2xl shadow-xl animate-pulse">
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">Admin Dashboard</h1>
            <p className="text-zinc-500 text-sm">Manage food items, pricing, diets, and view contact submissions.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full transition-all shadow-md shadow-[#F59E0B]/5"
          >
            <FiPlus className="w-5 h-5 stroke-[2.5]" />
            <span>Add Food Item</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block">Total Foods</span>
              <span className="text-3xl font-extrabold text-white mt-1 block">{totalFoods}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
              <FiGrid className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block">Categories</span>
              <span className="text-3xl font-extrabold text-white mt-1 block">{categoriesCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <FiTrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block">Veg Options</span>
              <span className="text-3xl font-extrabold text-white mt-1 block">{vegCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <span className="w-4 h-4 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block">Inquiries</span>
              <span className="text-3xl font-extrabold text-white mt-1 block">{messages.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <FiMessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 gap-6">
          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'menu'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Manage Menu
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'messages'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Contact Messages ({messages.length})
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : activeTab === 'menu' ? (
          /* Food Management Table */
          <div className="bg-[#1C1C1E] border border-white/5 rounded-3xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-zinc-500 uppercase tracking-widest bg-zinc-900/40">
                    <th className="py-4 px-6">Dish Details</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-zinc-300">
                  {foods.map((food) => (
                    <tr key={food.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-4">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="w-12 h-12 rounded-xl object-cover bg-zinc-800 border border-white/5 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white block">{food.name}</span>
                            <span className={`w-2 h-2 rounded-full ${food.veg ? 'bg-green-500' : 'bg-red-500'}`} title={food.veg ? 'Veg' : 'Non-veg'} />
                          </div>
                          <span className="text-xs text-zinc-500 line-clamp-1">{food.description}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400">
                          {food.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">₹{food.price.toFixed(0)}</td>
                      <td className="py-4 px-6 font-semibold text-[#F59E0B]">★ {food.rating.toFixed(1)}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleAvailability(food)}
                          className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                            food.available
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}
                        >
                          {food.available ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleOpenEdit(food)}
                            className="p-2 bg-zinc-800 text-zinc-400 hover:text-[#F59E0B] rounded-xl hover:bg-zinc-700 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(food.id, food.name)}
                            className="p-2 bg-zinc-800 text-zinc-400 hover:text-red-500 rounded-xl hover:bg-zinc-700 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Contact Messages List */
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className="bg-[#1C1C1E] border border-white/5 p-6 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-2">
                    <div>
                      <h4 className="font-bold text-white">{msg.name}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{msg.email} | Phone: {msg.phone || 'N/A'}</p>
                    </div>
                    <span className="text-xs text-zinc-500 font-semibold font-mono">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-[#1C1C1E] border border-white/5 rounded-3xl text-zinc-500">
                No customer messages found.
              </div>
            )}
          </div>
        )}

      </div>

      {/* Edit/Add Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#1C1C1E] border border-white/5 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative">
            <h3 className="font-[Outfit] font-bold text-white text-2xl mb-6">
              {editingFood ? 'Edit Food Item' : 'Add New Food Item'}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-5">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Dish Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="E.g. Pepperoni Pizza"
                  className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="299"
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="Pizzas">Pizzas</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Main Dishes">Main Dishes</option>
                    <option value="Salads">Salads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://images.unsplash.com/photo..."
                  className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              {/* Ingredients & Rating */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Ingredients (comma-separated)</label>
                  <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    placeholder="Paneer, Bell Peppers, Cheese"
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe the dish flavors and cooking style..."
                  className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              {/* Checkboxes: Veg and Available */}
              <div className="flex gap-6 items-center pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold select-none text-white">
                  <input
                    type="checkbox"
                    name="veg"
                    checked={formData.veg}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 accent-brand-yellow"
                  />
                  <span>Is Vegetarian</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold select-none text-white">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 accent-brand-yellow"
                  />
                  <span>Is Available</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full text-center transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F0F0F] font-extrabold rounded-full text-center transition-all cursor-pointer shadow-md"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
