import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#0F0F0F]">
      <div className="w-full max-w-md bg-[#1C1C1E]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/40">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 bg-gradient-to-tr from-[#F59E0B] to-amber-400 rounded-tr-3xl rounded-bl-3xl items-center justify-center mb-4 shadow-lg shadow-[#F59E0B]/20">
            <span className="text-[#0F0F0F] font-extrabold text-2xl font-[Outfit]">V</span>
          </div>
          <h2 className="text-3xl font-[Outfit] font-bold text-white mb-2">Create Account</h2>
          <p className="text-zinc-400 text-sm">Join Village Chef and start ordering gourmet delights</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                <FiUser className="w-5 h-5" />
              </span>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-2.5 bg-[#131315] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5" htmlFor="email">
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
                placeholder="john@example.com"
                className="w-full pl-11 pr-4 py-2.5 bg-[#131315] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5" htmlFor="password">
              Password
            </label>
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
                placeholder="At least 6 characters"
                className="w-full pl-11 pr-4 py-2.5 bg-[#131315] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                <FiLock className="w-5 h-5" />
              </span>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full pl-11 pr-4 py-2.5 bg-[#131315] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all duration-200"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] disabled:bg-zinc-700 disabled:text-zinc-500 text-[#0F0F0F] font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#F59E0B]/10 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0F0F0F] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FiUserPlus className="w-5 h-5" />
                  <span>Register</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm">
          <p className="text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F59E0B] hover:underline font-medium">
              Log in instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
