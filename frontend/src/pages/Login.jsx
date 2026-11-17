import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to previous page or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#0F0F0F]">
      <div className="w-full max-w-md bg-[#1C1C1E]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/40">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 bg-gradient-to-tr from-[#F59E0B] to-amber-400 rounded-tr-3xl rounded-bl-3xl items-center justify-center mb-4 shadow-lg shadow-[#F59E0B]/20">
            <span className="text-[#0F0F0F] font-extrabold text-2xl font-[Outfit]">V</span>
          </div>
          <h2 className="text-3xl font-[Outfit] font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-zinc-400 text-sm">Log in to order delicious food and track your orders</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                <FiMail className="w-5 h-5" />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-[#131315] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-zinc-300 text-sm font-medium" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                <FiLock className="w-5 h-5" />
              </span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#131315] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#F59E0B] hover:bg-[#D97706] disabled:bg-zinc-700 disabled:text-zinc-500 text-[#0F0F0F] font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#F59E0B]/10 active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#0F0F0F] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FiLogIn className="w-5 h-5" />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm space-y-3">
          <p className="text-zinc-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#F59E0B] hover:underline font-medium">
              Create an account
            </Link>
          </p>
          <p className="text-zinc-500 text-xs">
            Are you an administrator?{' '}
            <Link to="/admin-login" className="text-zinc-400 hover:text-[#F59E0B] hover:underline">
              Admin Portal
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
