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
    category: 'Hoodies',
    gender: 'Unisex',
    image: '',
    inStock: true,
    isNew: false,
    colors: '',
    size: '',
    rating: 0,
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadPrimaryImageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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

  const uploadAdditionalImagesHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const formDataData = new FormData();
    files.forEach(file => formDataData.append('images', file));
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.post('/upload/multiple', formDataData, config);
      setFormData((prev) => ({ ...prev, images: data.images }));
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
        rating: Number(formData.rating),
        colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
        size: formData.size.split(",").map((s) => s.trim()).filter(Boolean),
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
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="Hoodies">Hoodies</option>
                <option value="Jackets">Jackets</option>
                <option value="Pants">Pants</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Accessories">Accessories</option>
              </select>
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

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Rating</label>
              <input 
                type="number" 
                name="rating"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Colors (comma separated)</label>
              <input 
                type="text" 
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Black, White, Red"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Sizes (comma separated)</label>
              <input 
                type="text" 
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="S, M, L, XL"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-stone-600 mb-1">Primary Image</label>
              <input 
                type="file" 
                name="image"
                accept="image/*"
                onChange={uploadPrimaryImageHandler}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white" 
              />
              {uploading && !formData.image && <p className="text-sm mt-2 text-stone-500">Uploading...</p>}
              {formData.image && <p className="text-sm mt-2 text-green-600 truncate">Selected: {formData.image.split('/').pop()}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-stone-600 mb-1">Additional Images (Gallery)</label>
              <input 
                type="file" 
                name="images"
                multiple
                accept="image/*"
                onChange={uploadAdditionalImagesHandler}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white" 
              />
              {uploading && formData.images.length === 0 && <p className="text-sm mt-2 text-stone-500">Uploading...</p>}
              {formData.images.length > 0 && <p className="text-sm mt-2 text-green-600">{formData.images.length} images selected</p>}
            </div>

            <div className="col-span-2 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-stone-600">In Stock</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="isNew" className="text-sm font-medium text-stone-600">New Arrival</label>
              </div>
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
