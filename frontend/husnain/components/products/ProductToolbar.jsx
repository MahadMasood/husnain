"use client";
import React, { memo } from 'react';
import { Grid, List } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A to Z' },
];

const ProductToolbar = memo(({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
      <div className="flex items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white/5 border border-white/10 px-4 py-2 font-mono text-sm focus:outline-none focus:border-red-500/50"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 border ${viewMode === 'grid' ? 'border-red-500 text-red-500' : 'border-white/10 text-gray-400'} cursor-target`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 border ${viewMode === 'list' ? 'border-red-500 text-red-500' : 'border-white/10 text-gray-400'} cursor-target`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

ProductToolbar.displayName = 'ProductToolbar';

export default ProductToolbar;
