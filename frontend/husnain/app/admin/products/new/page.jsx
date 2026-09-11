"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    gender: 'Unisex',
    image: '',
    inStock: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataData = new FormData();
    formDataData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.post('/upload', formDataData, config);

      setFormData((prev) => ({ ...prev, image: data.image }));
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/products', {
        ...formData,
        price: Number(formData.price),
        colors: ['Standard'], // Defaulting for simplicity
        size: ['M'], // Defaulting for simplicity
      });
      router.push('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-stone-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Products
        </Link>
      </div>

      <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tighter mb-8">Add New Product</h2>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 max-w-2xl">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-stone-600 mb-1">Product Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Price ($)</label>
              <input 
                type="number" 
                name="price"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Category</label>
              <input 
                type="text" 
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Gender</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-stone-600 mb-1">Image Upload</label>
              <input 
                type="file" 
                name="image"
                onChange={uploadFileHandler}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
              {uploading && <p className="text-sm mt-2 text-stone-500">Uploading...</p>}
              {formData.image && <p className="text-sm mt-2 text-green-600">Image selected: {formData.image}</p>}
            </div>

            <div className="col-span-2 flex items-center gap-3">
              <input 
                type="checkbox" 
                id="inStock"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-stone-600">Product is currently in stock</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-slate-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
