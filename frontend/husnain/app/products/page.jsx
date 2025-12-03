"use client";
import React, { useState, useMemo } from "react";
import ProductHeader from "@/components/products/ProductHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductToolbar from "@/components/products/ProductToolbar";
import ProductsGrid from "@/components/products/ProductsGrid";
import { PRODUCTS } from "@/components/products/productsData";
import Navbar from "@/components/Navbar";
import PixelBlast from "@/components/ui/PixelBlast";

export default function ClothingStore() {
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
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesColor = color === "All" || product.colors.includes(color);
      const matchesSize = size === "All" || product.size.includes(size);
      const matchesGender = gender === "All" || product.gender === gender;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesNew = !newArrivals || product.new;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesColor &&
        matchesSize &&
        matchesGender &&
        matchesPrice &&
        matchesRating &&
        matchesStock &&
        matchesNew
      );
    });

    // Sort
    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high")
      filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "name")
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "new")
      filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));

    return filtered;
  }, [
    search,
    category,
    color,
    size,
    gender,
    priceRange,
    minRating,
    inStockOnly,
    newArrivals,
    sortBy,
  ]);

  const activeFiltersCount = [
    category !== "All",
    color !== "All",
    size !== "All",
    gender !== "All",
    priceRange[0] !== 0 || priceRange[1] !== 250,
    minRating > 0,
    inStockOnly,
    newArrivals,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setCategory("All");
    setColor("All");
    setSize("All");
    setGender("All");
    setPriceRange([0, 250]);
    setMinRating(0);
    setInStockOnly(false);
    setNewArrivals(false);
    setSearch("");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* PixelBlast Background - Fixed position */}
      <div className="fixed inset-0 will-change-transform z-0">
        <PixelBlast
          variant="square"
          pixelSize={8}
          color="#ff474c"
          patternScale={3}
          patternDensity={3}
          pixelSizeJitter={0.3}
          enableRipples={true}
          rippleSpeed={1.2}
          rippleThickness={0.05}
          rippleIntensityScale={2}
          liquid={false}
          speed={0.5}
          edgeFade={0}
          transparent={true}
          antialias={false}
          autoPauseOffscreen={true}
        />
      </div>

      {/* Heavy dark overlay */}
      <div className="fixed inset-0 bg-black/94 z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20">
        <Navbar />
        
        <div className="min-h-screen text-white">
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
              {/* Sidebar Filters */}
              {showFilters && (
                <div className="w-full lg:w-64 shrink-0">
                  <ProductFilters
                    category={category}
                    setCategory={setCategory}
                    color={color}
                    setColor={setColor}
                    size={size}
                    setSize={setSize}
                    gender={gender}
                    setGender={setGender}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    newArrivals={newArrivals}
                    setNewArrivals={setNewArrivals}
                    activeFiltersCount={activeFiltersCount}
                    clearAllFilters={clearAllFilters}
                  />
                </div>
              )}

              {/* Products Grid */}
              <main className="flex-1 min-w-0">
                <ProductToolbar
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
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
        </div>
      </div>

      {/* Bottom glitch line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-30 pointer-events-none" />
    </div>
  );
}