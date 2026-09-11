"use client";
import React, { memo } from "react";
import ElasticSlider from "@/components/ui/ElasticSlider";

const CATEGORIES = ["All", "T-Shirts", "Hoodies", "Jackets", "Pants"];
const COLORS = ["All", "Black", "White", "Gray", "Blue", "Red", "Navy", "Olive", "Pink", "Brown"];
const SIZES = ["All", "XS", "S", "M", "L", "XL", "XXL"];
const GENDERS = ["All", "Men", "Women", "Unisex", "Kids"];

const FilterSection = ({ title, children }) => (
  <div className="border border-stone-200 rounded-xl p-4 bg-white">
    <h3 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">{title}</h3>
    {children}
  </div>
);

const RadioOption = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center gap-2 cursor-pointer group py-0.5">
    <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-amber-500" />
    <span className={`font-mono text-sm transition-colors ${checked ? 'text-amber-600 font-semibold' : 'text-stone-500 group-hover:text-slate-800'}`}>
      {label}
    </span>
  </label>
);

const ProductFilters = memo(({
  category, setCategory, color, setColor, size, setSize,
  gender, setGender, priceRange, setPriceRange, minRating, setMinRating,
  inStockOnly, setInStockOnly, newArrivals, setNewArrivals,
  activeFiltersCount, clearAllFilters,
}) => {
  return (
    <aside className="w-full space-y-3">
      {activeFiltersCount > 0 && (
        <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">Active Filters</h3>
            <button onClick={clearAllFilters} className="font-mono text-xs text-amber-600 hover:text-amber-800 underline">
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {category !== "All" && <Chip label={category} />}
            {color !== "All" && <Chip label={color} />}
            {size !== "All" && <Chip label={`Size ${size}`} />}
            {gender !== "All" && <Chip label={gender} />}
            {inStockOnly && <Chip label="In Stock" />}
            {newArrivals && <Chip label="New Arrivals" />}
          </div>
        </div>
      )}

      <FilterSection title="Category">
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <RadioOption key={cat} name="category" value={cat} checked={category === cat} onChange={() => setCategory(cat)} label={cat} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Who's it for">
        <div className="space-y-1">
          {GENDERS.map((g) => (
            <RadioOption key={g} name="gender" value={g} checked={gender === g} onChange={() => setGender(g)} label={g} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`py-2 font-mono text-xs rounded-lg border transition-colors ${
                size === s
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colour">
        <div className="space-y-1">
          {COLORS.map((c) => (
            <RadioOption key={c} name="color" value={c} checked={color === c} onChange={() => setColor(c)} label={c} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-stone-500">Rs. {priceRange[0]}</span>
            <span className="font-mono text-sm text-stone-500">Rs. {priceRange[1]}</span>
          </div>
          <div className="flex items-center justify-center">
            <ElasticSlider
              leftIcon={<p>-</p>}
              rightIcon={<p>+</p>}
              startingValue={0}
              defaultValue={250}
              maxValue={250}
              isStepped
              onChange={(newValue) => setPriceRange([priceRange[0], newValue])}
              stepSize={10}
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-1">
          {[0, 4, 4.5].map((rating) => (
            <RadioOption
              key={rating}
              name="rating"
              checked={minRating === rating}
              onChange={() => setMinRating(rating)}
              label={rating === 0 ? "All Ratings" : `${rating}+ ★`}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-2">
          {[
            { checked: inStockOnly, onChange: (e) => setInStockOnly(e.target.checked), label: "In Stock Only" },
            { checked: newArrivals, onChange: (e) => setNewArrivals(e.target.checked), label: "New Arrivals" },
          ].map(({ checked, onChange, label }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={checked} onChange={onChange} className="accent-amber-500" />
              <span className={`font-mono text-sm ${checked ? 'text-amber-600 font-semibold' : 'text-stone-500 group-hover:text-slate-800'}`}>{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
});

const Chip = ({ label }) => (
  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-mono rounded-full">{label}</span>
);

ProductFilters.displayName = "ProductFilters";
export default ProductFilters;
