"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PRODUCTS } from "@/components/products/productsData";
import ProductCard from "@/components/products/ProductCard";
import { useState } from "react";
import Link from "next/link";

// Create sale products — discount select items
const SALE_PRODUCTS = PRODUCTS.map((p, i) => ({
  ...p,
  originalPrice: p.price,
  price: i % 3 === 0 ? Math.round(p.price * 0.5) : i % 2 === 0 ? Math.round(p.price * 0.7) : Math.round(p.price * 0.8),
  discount: i % 3 === 0 ? 50 : i % 2 === 0 ? 30 : 20,
})).filter((_, i) => i < 12);

export default function SalePage() {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-amber-600 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-amber-100 font-mono text-xs uppercase tracking-widest mb-3">Limited Time</p>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">SALE</h1>
          <p className="text-amber-100 text-lg mb-2">Up to 50% off selected styles</p>
          <p className="font-mono text-amber-200 text-sm">For the whole family · Kids & Adults</p>
        </div>
      </div>

      {/* Sale Filters */}
      <div className="bg-amber-50 border-b border-amber-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
          {["All Sale", "50% Off", "30% Off", "20% Off", "Kids", "Adults"].map((f) => (
            <button key={f} className="shrink-0 px-4 py-1.5 font-mono text-sm border border-amber-300 rounded-full text-amber-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors">
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-sm text-stone-500">{SALE_PRODUCTS.length} items on sale</p>
          </div>
          <p className="font-mono text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            ⏰ Sale ends Sunday midnight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SALE_PRODUCTS.map((product) => (
            <div key={product.id} className="relative">
              <div className="absolute top-2 left-2 z-20 bg-red-500 text-white px-2 py-1 font-mono text-xs font-bold rounded-full">
                -{product.discount}%
              </div>
              <ProductCard product={product} isFavorite={favorites.includes(product.id)} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16 py-12 border-t border-stone-200">
          <p className="text-stone-500 mb-4">Looking for more styles?</p>
          <Link href="/products" className="px-8 py-3 bg-slate-900 text-white font-mono text-sm rounded-xl hover:bg-amber-600 transition-colors">
            Browse Full Collection
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}