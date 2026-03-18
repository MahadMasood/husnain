"use client";
import React, { useState, useMemo } from "react";
import ProductHeader from "@/components/products/ProductHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductToolbar from "@/components/products/ProductToolbar";
import ProductsGrid from "@/components/products/ProductsGrid";
import { PRODUCTS } from "@/components/products/productsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [size, setSize] = useState("All");
  const [gender, setGender] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newArrivals, setNewArrivals] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      const matchesColor = color === "All" || product.colors.includes(color);
      const matchesSize = size === "All" || product.size.includes(size);
      const matchesGender = gender === "All" || product.gender === gender;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesNew = !newArrivals || product.new;
      return matchesSearch && matchesCategory && matchesColor && matchesSize &&
             matchesGender && matchesPrice && matchesRating && matchesStock && matchesNew;
    });

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "new") filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));

    return filtered;
  }, [search, category, color, size, gender, priceRange, minRating, inStockOnly, newArrivals, sortBy]);

  const activeFiltersCount = [
    category !== "All", color !== "All", size !== "All", gender !== "All",
    priceRange[0] !== 0 || priceRange[1] !== 250, minRating > 0, inStockOnly, newArrivals,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setCategory("All"); setColor("All"); setSize("All"); setGender("All");
    setPriceRange([0, 250]); setMinRating(0); setInStockOnly(false);
    setNewArrivals(false); setSearch("");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <ProductHeader
        search={search}
        onSearchChange={setSearch}
        filteredProductsCount={filteredProducts.length}
        activeFiltersCount={activeFiltersCount}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {showFilters && (
            <div className="w-full lg:w-64 shrink-0">
              <ProductFilters
                category={category} setCategory={setCategory}
                color={color} setColor={setColor}
                size={size} setSize={setSize}
                gender={gender} setGender={setGender}
                priceRange={priceRange} setPriceRange={setPriceRange}
                minRating={minRating} setMinRating={setMinRating}
                inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
                newArrivals={newArrivals} setNewArrivals={setNewArrivals}
                activeFiltersCount={activeFiltersCount}
                clearAllFilters={clearAllFilters}
              />
            </div>
          )}

          <main className="flex-1 min-w-0">
            <ProductToolbar
              sortBy={sortBy} onSortChange={setSortBy}
              viewMode={viewMode} onViewModeChange={setViewMode}
            />
            <ProductsGrid
              filteredProducts={filteredProducts}
              viewMode={viewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onClearAllFilters={clearAllFilters}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}