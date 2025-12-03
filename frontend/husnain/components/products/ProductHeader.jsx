"use client";
import React, { memo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const ProductHeader = memo(({
  search,
  onSearchChange,
  filteredProductsCount,
  activeFiltersCount,
  showFilters,
  onToggleFilters,
}) => {
  return (
    <div className="border-b border-red-500/20 backdrop-blur-sm pt-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* Terminal-style prefix */}
            <div className="font-mono text-red-500 text-xs mb-2 opacity-80">
              {'>'} CATALOG_ACTIVE
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              SHOP
            </h1>
            <p className="font-mono text-sm text-gray-400 mt-2">
              {filteredProductsCount} items available • Urban Collection
            </p>
          </div>
          
          {/* Mobile filter toggle */}
          <button
            onClick={onToggleFilters}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-500 font-mono text-sm hover:bg-red-500 hover:text-black transition-colors cursor-target"
          >
            <SlidersHorizontal className="w-4 h-4" />
            FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search styles, categories..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors font-mono text-sm"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-target"
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