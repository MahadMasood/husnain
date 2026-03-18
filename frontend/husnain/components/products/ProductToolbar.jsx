"use client";
import React, { memo } from 'react';
import { Grid, List } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A–Z' },
];

const ProductToolbar = memo(({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-white border border-stone-200 px-3 py-2 font-mono text-sm text-slate-700 focus:outline-none focus:border-amber-400 rounded-lg"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-lg border transition-colors ${viewMode === 'grid' ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-stone-200 text-stone-400 hover:border-amber-300'}`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-lg border transition-colors ${viewMode === 'list' ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-stone-200 text-stone-400 hover:border-amber-300'}`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

ProductToolbar.displayName = 'ProductToolbar';
export default ProductToolbar;
