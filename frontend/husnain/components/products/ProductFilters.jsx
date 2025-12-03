"use client";
import React, { memo } from "react";
import { X } from "lucide-react";
import ElasticSlider from "@/components/ui/ElasticSlider";
const CATEGORIES = ["All", "T-Shirts", "Hoodies", "Jackets", "Pants"];
const COLORS = [
  "All",
  "Black",
  "White",
  "Gray",
  "Blue",
  "Red",
  "Navy",
  "Olive",
  "Brown",
];
const SIZES = ["All", "XS", "S", "M", "L", "XL", "XXL"];
const GENDERS = ["All", "Men", "Women", "Unisex"];

const ProductFilters = memo(
  ({
    category,
    setCategory,
    color,
    setColor,
    size,
    setSize,
    gender,
    setGender,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    newArrivals,
    setNewArrivals,
    activeFiltersCount,
    clearAllFilters,
  }) => {
    return (
      <aside className="w-full space-y-4 md:space-y-6">
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="border border-red-500/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-sm text-red-500">ACTIVE FILTERS</h3>
              <button
                onClick={clearAllFilters}
                className="font-mono text-xs text-gray-400 hover:text-white cursor-target"
              >
                CLEAR ALL
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {category !== "All" && (
                <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-mono">
                  {category}
                </span>
              )}
              {color !== "All" && (
                <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-mono">
                  {color}
                </span>
              )}
              {size !== "All" && (
                <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-mono">
                  Size {size}
                </span>
              )}
              {gender !== "All" && (
                <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-mono">
                  {gender}
                </span>
              )}
              {inStockOnly && (
                <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-mono">
                  IN STOCK
                </span>
              )}
              {newArrivals && (
                <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-mono">
                  NEW
                </span>
              )}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="border border-white/10 p-4">
          <h3 className="font-mono text-sm mb-3 text-red-500">CATEGORY</h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  className="accent-red-500"
                />
                <span className="font-mono text-sm text-gray-400 group-hover:text-white">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="border border-white/10 p-4">
          <h3 className="font-mono text-sm mb-3 text-red-500">GENDER</h3>
          <div className="space-y-2">
            {GENDERS.map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="gender"
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  className="accent-red-500"
                />
                <span className="font-mono text-sm text-gray-400 group-hover:text-white">
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="border border-white/10 p-4">
          <h3 className="font-mono text-sm mb-3 text-red-500">SIZE</h3>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`py-2 font-mono text-xs border transition-colors cursor-target ${
                  size === s
                    ? "border-red-500 bg-red-500/20 text-red-500"
                    : "border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="border border-white/10 p-4">
          <h3 className="font-mono text-sm mb-3 text-red-500">COLOR</h3>
          <div className="space-y-2">
            {COLORS.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="color"
                  checked={color === c}
                  onChange={() => setColor(c)}
                  className="accent-red-500"
                />
                <span className="font-mono text-sm text-gray-400 group-hover:text-white">
                  {c}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="border border-white/10 p-4">
          <h3 className="font-mono text-sm mb-3 text-red-500">PRICE RANGE</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-gray-400">
                ${priceRange[0]}
              </span>
              <span className="font-mono text-sm text-gray-400">
                ${priceRange[1]}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <ElasticSlider
                leftIcon={<p>-</p>}
                rightIcon={<p>+</p>}
                startingValue={0}
                defaultValue={250}
                maxValue={250}
                isStepped
                onChange={(newValue) =>
                  // newValue is now a number directly, not an event object
                  setPriceRange([priceRange[0], newValue])
                }
                stepSize={10}
              />
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="border border-white/10 p-4">
          <h3 className="font-mono text-sm mb-3 text-red-500">MIN RATING</h3>
          <div className="space-y-2">
            {[0, 4, 4.5].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="accent-red-500"
                />
                <span className="font-mono text-sm text-gray-400 group-hover:text-white">
                  {rating === 0 ? "All Ratings" : `${rating}+ ⭐`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="border border-white/10 p-4 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-red-500"
            />
            <span className="font-mono text-sm text-gray-400 group-hover:text-white">
              IN STOCK ONLY
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={newArrivals}
              onChange={(e) => setNewArrivals(e.target.checked)}
              className="accent-red-500"
            />
            <span className="font-mono text-sm text-gray-400 group-hover:text-white">
              NEW ARRIVALS
            </span>
          </label>
        </div>
      </aside>
    );
  }
);

ProductFilters.displayName = "ProductFilters";

export default ProductFilters;
