"use client";
import React, { memo } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import {useRouter} from "next/navigation";

const ProductCard = memo(({
  product,
  viewMode,
  isFavorite,
  onToggleFavorite,
  clickable = true,
}) => {
    const router = useRouter();
  const getColorHex = (colorName) => {
    const colorMap = {
      'white': '#fff',
      'black': '#000',
      'gray': '#808080',
      'blue': '#4169E1',
      'red': '#DC143C',
      'navy': '#001f3f',
      'olive': '#556B2F',
      'brown': '#8B4513',
      'khaki': '#C3B091',
      'charcoal': '#36454F',
      'sand': '#C2B280',
      'burgundy': '#800020',
      'pink': '#FFC0CB',
      'cream': '#FFFDD0',
      'forest': '#228B22',
    };
    return colorMap[colorName.toLowerCase()] || '#666';
  };

  return (
    <div
    onClick={()=>clickable && router.push("products/123")}
      className={`border border-white/10 hover:border-red-500/50 transition-all group relative ${
        viewMode === 'list' ? 'flex gap-4' : ''
      }`}
    >
      {/* New Badge */}
      {product.new && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-black px-2 py-1 font-mono text-xs font-bold">
          NEW
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-2 right-2 z-10 p-2 bg-black/80 hover:bg-black transition-colors cursor-target"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite
              ? 'fill-red-500 text-red-500'
              : 'text-white'
          }`}
        />
      </button>

      <div className={`bg-white/5 flex items-center justify-center text-6xl relative overflow-hidden ${
        viewMode === 'list' ? 'w-40 h-40' : 'h-64'
      }`}>
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="font-mono text-sm text-gray-400">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-lg group-hover:text-red-500 transition-colors mb-1">
            {product.name}
          </h3>
          <p className="font-mono text-xs text-gray-400">{product.category} • {product.gender}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">⭐ {product.rating}</span>
        </div>

        {/* Available Colors */}
        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 4).map((c, i) => (
            <div
              key={i}
              className="w-6 h-6 border border-white/20"
              style={{ backgroundColor: getColorHex(c) }}
              title={c}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-400 self-center">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Available Sizes */}
        <div className="font-mono text-xs text-gray-400 mb-3">
          Sizes: {product.size.join(', ')}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-red-500">
            ${product.price}
          </span>
          <button
            disabled={!product.inStock}
            className={`px-4 py-2 font-mono text-sm transition-colors cursor-target ${
              product.inStock
                ? 'border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black'
                : 'border border-gray-700 text-gray-600 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'ADD TO BAG' : 'SOLD OUT'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
