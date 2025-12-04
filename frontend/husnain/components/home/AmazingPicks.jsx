"use client";
import React from "react";
import {
  DraggableCardContainer,
  DraggableCardBody,
} from "../ui/draggable-card";
import ProductCard from "../products/ProductCard";

export default function AmazingPicks() {
  const products = [
    // ... your product data remains exactly the same ...
    {
      id: 1,
      name: "Oversized Streetwear Hoodie",
      category: "Hoodies",
      size: ["S", "M", "L", "XL"],
      price: 89,
      rating: 4.7,
      inStock: true,
      colors: ["Black", "White", "Red"],
      gender: "Unisex",
      image: "/hero/hero1.jpg",
      new: true,
    },
    {
      id: 2,
      name: "Distressed Denim Jacket",
      category: "Jackets",
      size: ["M", "L", "XL"],
      price: 129,
      rating: 4.8,
      inStock: true,
      colors: ["Blue", "Black"],
      gender: "Unisex",
      image: "/hero/hero2.jpg",
      new: false,
    },
    {
      id: 3,
      name: "Cargo Pants Urban",
      category: "Pants",
      size: ["S", "M", "L", "XL", "XXL"],
      price: 79,
      rating: 4.5,
      inStock: false,
      colors: ["Olive", "Black", "Khaki"],
      gender: "Men",
      image: "/hero/hero3.jpg",
      new: false,
    },
    {
      id: 4,
      name: 'Graphic Tee "Revolution"',
      category: "T-Shirts",
      size: ["XS", "S", "M", "L", "XL"],
      price: 39,
      rating: 4.3,
      inStock: true,
      colors: ["Black", "White", "Gray"],
      gender: "Unisex",
      image: "/hero/hero1.jpg",
      new: true,
    },
    {
      id: 5,
      name: "Cropped Leather Jacket",
      category: "Jackets",
      size: ["S", "M", "L"],
      price: 199,
      rating: 4.9,
      inStock: true,
      colors: ["Black", "Brown"],
      gender: "Women",
      image: "/hero/hero2.jpg",
      new: true,
    },
  ];

  const positions = [
    "absolute top-20 left-[10%] -rotate-[6deg] z-10",
    "absolute top-40 left-[25%] rotate-[5deg] z-20",
    "absolute top-10 left-[45%] rotate-[8deg] z-30",
    "absolute top-32 left-[60%] -rotate-[4deg] z-20",
    "absolute top-20 right-[5%] rotate-[2deg] z-10",
  ];

  return (
    <section className="bg-neutral-950 overflow-hidden pb-40">
      {/* HEADER SECTION */}
      {/* max-w-7xl mx-auto: Centers content like standard page wrappers */}
      {/* px-4: Prevents text hitting edges on mobile */}
      {/* pt-24: Pushes it down from top */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24  relative z-10">
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter mb-2">
          Top Picks
        </h2>
        <p className="text-white/50 font-mono text-sm">
          CURATED_SELECTION // 2024
        </p>
      </div>

      <DraggableCardContainer className="relative flex min-h-[90vh] w-full items-center justify-center">
        {/* Background Text */}
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-black text-neutral-800 md:text-8xl select-none z-0">
          AMAZING
          <br />
          PICKS
        </p>

        {/* Draggable Items */}
        {products.map((product, index) => (
          <DraggableCardBody
            key={product.id}
            className={`${
              positions[index] || "hidden"
            } w-[300px] bg-black shadow-2xl`}
          >
            <ProductCard
              product={product}
              isFavorite={false}
              onToggleFavorite={() => console.log("Favorite toggled")}
              clickable={false}
            />
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}