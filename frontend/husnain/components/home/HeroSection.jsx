"use client";
import React, { memo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const HeroCards = memo(
  dynamic(() => import("./HeroCards"), { ssr: false })
);

const HeroContent = memo(() => {
  const router = useRouter();
  return (
    <div className="flex-1 max-w-2xl">
      <div className="inline-block bg-amber-100 text-amber-800 font-mono text-xs px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
        New Season — All Ages Welcome
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
        DRESS
        <br />
        YOUR STORY
      </h1>

      <p className="text-white/80 text-sm md:text-base max-w-md mb-12 leading-relaxed">
        Premium clothing for every generation. From playful kids' styles to refined adult essentials — quality that lasts.
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => router.push("/products")}
          className="font-mono text-sm px-8 py-4 bg-amber-600 text-white hover:bg-amber-700 transition-all duration-300 uppercase tracking-widest"
        >
          Shop Now
        </button>
        <button
          onClick={() => router.push("/products?gender=Kids")}
          className="font-mono text-sm px-8 py-4 border border-white/40 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 uppercase tracking-widest"
        >
          Kids Collection
        </button>
      </div>

      <div className="font-mono text-xs text-white/50 mt-16 flex items-center gap-6">
        <span>Free shipping over $100</span>
        <span className="w-1 h-1 bg-amber-500 rounded-full" />
        <span>30-day returns</span>
        <span className="w-1 h-1 bg-amber-500 rounded-full" />
        <span>Worldwide delivery</span>
      </div>
    </div>
  );
});
HeroContent.displayName = "HeroContent";

export default function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden bg-slate-900">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(200, 134, 10, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(148, 103, 50, 0.3) 0%, transparent 40%)`
        }}
      />

      <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
        <HeroContent />
        <div className="hidden lg:flex flex-1 items-center justify-center" style={{ minHeight: "520px" }}>
          <div className="relative" style={{ width: "460px", height: "500px",marginTop: "70px" }}>
            <HeroCards />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  );
}