"use client";
import React, { memo } from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = memo(({ filteredProducts, viewMode, favorites, onToggleFavorite, onClearAllFilters }) => {
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-stone-200">
        <div className="text-5xl mb-4">🔍</div>
        <p className="font-bold text-slate-700 mb-1">No products found</p>
        <p className="text-stone-400 text-sm mb-6">Try adjusting your filters</p>
        <button
          onClick={onClearAllFilters}
          className="px-6 py-2.5 bg-amber-500 text-white font-mono text-sm rounded-xl hover:bg-amber-600 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
      : 'space-y-4'
    }>
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
});

ProductsGrid.displayName = 'ProductsGrid';
export default ProductsGrid;
