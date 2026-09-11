"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const user = await login(email, password);
      if (user.isAdmin) {
        router.push('/admin');
      } else {
        setError('Unauthorized: You are not an admin.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center">
            <Lock className="text-amber-500 w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl font-black uppercase text-center tracking-tighter text-slate-900 mb-8">Admin Portal</h1>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-wider text-sm mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
