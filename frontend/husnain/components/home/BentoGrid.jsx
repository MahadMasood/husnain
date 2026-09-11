import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function BentoGrid() {
  return (
    <section className="bg-stone-50 px-4 py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2">Shop by Category</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase text-slate-900 tracking-tighter">
            Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[80vh]">

          {/* Large Feature - Outerwear */}
          <div className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl bg-stone-200 h-[50vh] md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              alt="Outerwear Collection"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-amber-300 font-mono text-xs mb-2 tracking-widest uppercase">Featured</p>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                    Summer Sale
                  </h3>
                </div>
                <Link href="/products?category=Summer" className="bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Accessories */}
          <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl bg-stone-200 min-h-[300px] md:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              alt="Accessories"
            />
            <div className="absolute inset-0 bg-slate-900/30" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter">
                    Winter Sale
                  </h3>
                  <p className="text-white/70 font-mono text-xs mt-1 tracking-wider uppercase">Up to 50% Off</p>
                </div>
                <span className="w-2 h-2 bg-amber-400 animate-pulse rounded-full" />
              </div>
              <Link href="/products?category=Winter" className="self-end text-white font-mono text-xs uppercase tracking-widest hover:text-amber-300 transition-colors flex items-center gap-1">
                Explore <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Kids Collection card */}
          <div className="col-span-1 relative group overflow-hidden rounded-2xl bg-amber-500 flex items-center justify-center p-8 hover:bg-amber-600 transition-colors min-h-[300px] md:min-h-0">
            <Link href="/products?gender=Kids" className="text-center">
              <p className="text-white/80 font-mono text-xs tracking-widest mb-2 uppercase">New In</p>
              <h3 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-2">
                Kids Collection
              </h3>
              <p className="text-white font-mono text-sm tracking-wider">Ages 2–14</p>
              <div className="mt-4 h-px bg-white/30" />
              <p className="text-white/80 font-mono text-xs mt-3 tracking-wider">Shop Now →</p>
            </Link>
          </div>

          {/* Footwear */}
          <div className="col-span-1 relative group overflow-hidden rounded-2xl bg-stone-200 min-h-[300px] md:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              alt="Footwear"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/60" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-black uppercase text-white tracking-tighter">
                Footwear
              </h3>
              <p className="text-white/70 font-mono text-xs mt-1 uppercase">New Arrivals</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
