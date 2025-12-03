"use client";
import React, { memo } from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = memo(({
  filteredProducts,
  viewMode,
  favorites,
  onToggleFavorite,
  onClearAllFilters,
}) => {
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-mono text-gray-400">No products match your filters</p>
        <button
          onClick={onClearAllFilters}
          className="mt-4 px-6 py-2 border border-red-500/50 text-red-500 font-mono text-sm hover:bg-red-500 hover:text-black transition-colors cursor-target"
        >
          CLEAR ALL FILTERS
        </button>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
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
