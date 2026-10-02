"use client";
import React, { memo } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';

const ProductCard = memo(({
  product,
  viewMode,
  isFavorite,
  onToggleFavorite,
  clickable = true,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToBag = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart({
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size?.[0] || 'One Size',
      color: product.colors?.[0] || 'Default',
      category: product.category,
    });
  };

  const getColorHex = (colorName) => {
    const colorMap = {
      'white': '#fff', 'black': '#111', 'gray': '#808080', 'blue': '#4169E1',
      'red': '#DC143C', 'navy': '#001f3f', 'olive': '#556B2F', 'brown': '#8B4513',
      'khaki': '#C3B091', 'charcoal': '#36454F', 'sand': '#C2B280',
      'burgundy': '#800020', 'pink': '#FFC0CB', 'cream': '#FFF8E7',
      'forest': '#228B22', 'yellow': '#F5C518',
    };
    return colorMap[colorName.toLowerCase()] || '#999';
  };

  return (
    <div
      onClick={() => clickable && router.push(`/products/${product._id || product.id}`)}
      className={`border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all group relative bg-white rounded-lg overflow-hidden cursor-pointer ${
        viewMode === 'list' ? 'flex gap-4' : ''
      }`}
    >
      {product.new && (
        <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white px-2 py-1 font-mono text-xs font-bold rounded-full">
          NEW
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(product._id || product.id); }}
        className="absolute top-2 right-2 z-10 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm"
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
      </button>

      <div className={`bg-stone-100 flex items-center justify-center relative overflow-hidden ${
        viewMode === 'list' ? 'w-40 h-40 shrink-0 rounded-l-lg' : 'h-64'
      }`}>
        <Image
          src={product.image || '/hero/hero1.jpg'}
          alt={product.name || 'Product'}
          width={800}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="font-mono text-xs text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="font-mono text-xs text-stone-400">{product.category} · {product.gender}</p>
        </div>

        <div className="flex items-center gap-1 mb-3 text-amber-500 text-sm">
          {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          <span className="text-stone-400 text-xs ml-1">{product.rating}</span>
        </div>

        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 5).map((c, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-stone-200 shadow-sm"
              style={{ backgroundColor: getColorHex(c) }}
              title={c}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-stone-400 self-center">+{product.colors.length - 5}</span>
          )}
        </div>

        <div className="font-mono text-xs text-stone-400 mb-3">
          {product.size.slice(0, 5).join(' · ')}{product.size.length > 5 ? ' …' : ''}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-slate-900">Rs. {product.price}</span>
          <button
            disabled={!product.inStock}
            onClick={handleAddToBag}
            className={`px-3 py-2 font-mono text-xs rounded transition-colors ${
              product.inStock
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Bag' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
