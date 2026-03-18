"use client";
import React, { memo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const ProductHeader = memo(({
  search, onSearchChange, filteredProductsCount,
  activeFiltersCount, showFilters, onToggleFilters,
}) => {
  return (
    <div className="border-b border-stone-200 bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-1">All Products</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">Shop</h1>
            <p className="font-mono text-sm text-stone-400 mt-1">{filteredProductsCount} items available</p>
          </div>
          <button
            onClick={onToggleFilters}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-stone-200 text-slate-700 font-mono text-sm hover:border-amber-400 hover:text-amber-600 transition-colors rounded-lg"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search styles, categories…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 pl-12 pr-12 py-3.5 text-slate-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors font-mono text-sm rounded-xl"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ProductHeader.displayName = 'ProductHeader';
export default ProductHeader;
