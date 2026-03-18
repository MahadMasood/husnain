"use client";
import React from "react";
import { DraggableCardContainer, DraggableCardBody } from "../ui/draggable-card";
import ProductCard from "../products/ProductCard";
import { PRODUCTS } from "../products/productsData";

export default function AmazingPicks() {
  const products = PRODUCTS.filter(p => p.rating >= 4.7).slice(0, 5);

  const positions = [
    "absolute top-20 left-[10%] -rotate-[6deg] z-10",
    "absolute top-40 left-[25%] rotate-[5deg] z-20",
    "absolute top-10 left-[45%] rotate-[8deg] z-30",
    "absolute top-32 left-[60%] -rotate-[4deg] z-20",
    "absolute top-20 right-[5%] rotate-[2deg] z-10",
  ];

  return (
    <section className="bg-stone-100 overflow-hidden pb-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 relative z-10">
        <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2">Highly Rated</p>
        <h2 className="text-5xl md:text-7xl font-black uppercase text-slate-900 tracking-tighter mb-2">
          Top Picks
        </h2>
        <p className="text-stone-400 font-mono text-sm">Drag to explore · Our customers' favourites</p>
      </div>

      <DraggableCardContainer className="relative flex min-h-[90vh] w-full items-center justify-center">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-black text-stone-200 md:text-8xl select-none z-0 uppercase">
          Top<br />Picks
        </p>

        {products.map((product, index) => (
          <DraggableCardBody
            key={product.id}
            className={`${positions[index] || "hidden"} w-[300px] shadow-2xl rounded-xl overflow-hidden`}
          >
            <ProductCard product={product} isFavorite={false} onToggleFavorite={() => {}} clickable={false} />
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}
