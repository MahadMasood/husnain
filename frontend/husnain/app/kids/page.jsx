"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCTS } from "@/components/products/productsData";
import Link from "next/link";

const kidsProducts = PRODUCTS.filter(p => p.gender === "Kids");
const ageGroups = ["All Ages", "2–4 Years", "5–7 Years", "8–10 Years", "11–14 Years"];

export default function KidsPage() {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (id) => setFavorites((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero */}
      <div className="pt-20 bg-gradient-to-br from-amber-400 to-orange-400">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-white/80 font-mono text-xs uppercase tracking-widest mb-3">Ages 2–14</p>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
              Kids<br />Collection
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-md">
              Bright colours, durable fabrics and playful designs built to keep up with your little adventurers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products?gender=Kids" className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors">
                Shop All Kids
              </Link>
              <Link href="/sale?gender=Kids" className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                Kids Sale
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm">
            {["👟", "🧥", "👕", "👖"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Age group filters */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
          {ageGroups.map((ag) => (
            <button key={ag} className="shrink-0 px-4 py-1.5 font-mono text-sm border border-stone-200 rounded-full text-stone-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors">
              {ag}
            </button>
          ))}
        </div>
      </div>

      {/* Benefits strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🎨", label: "Fun colours & prints" },
            { emoji: "💪", label: "Durable & machine washable" },
            { emoji: "📏", label: "Sizes for ages 2–14" },
            { emoji: "🌱", label: "Soft, skin-friendly fabrics" },
          ].map(({ emoji, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-amber-800">
              <span className="text-lg">{emoji}</span>
              <span className="font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900">{kidsProducts.length} Kids Styles</h2>
          <Link href="/products?gender=Kids" className="font-mono text-sm text-amber-600 hover:text-amber-700">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {kidsProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl p-10 text-center">
          <h3 className="text-3xl font-black text-white mb-2">Not sure on sizing?</h3>
          <p className="text-white/90 mb-6">Our size guide helps you find the perfect fit for every age group.</p>
          <button className="px-8 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors">
            View Size Guide
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
