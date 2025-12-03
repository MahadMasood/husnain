"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Lazy load PixelBlast with no SSR
const PixelBlast = dynamic(() => import("../ui/PixelBlast"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

// Memoize HeroCards to prevent unnecessary re-renders
const HeroCards = memo(
  dynamic(() => import("./HeroCards"), {
    ssr: false,
  })
);

// Memoize static content components
const HeroContent = memo(() => {
    const router = useRouter();
  return (
  <div className="flex-1 max-w-2xl">
    {/* Terminal-style prefix */}
    <div className="font-mono text-red-500 text-sm mb-6 opacity-80">
      {">"} INITIALIZING_PROTOCOL
    </div>

    {/* Main Heading */}
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
      BREAK
      <br />
      THE GRID
    </h1>

    {/* Subheading */}
    <p className="font-mono text-white text-sm md:text-base max-w-md mb-12 leading-relaxed opacity-90">
      Decentralized. Unstoppable. Anonymous.
      <br />
      The revolution will not be centralized.
    </p>

    {/* Single CTA */}
    <button
      onClick={() => router.push("/products")}
      className="group relative font-mono text-sm md:text-base px-8 py-4 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 uppercase tracking-widest cursor-target"
    >
      <span className="relative z-10">ENTER THE VOID</span>
    </button>

    {/* Terminal info line */}
    <div className="font-mono text-xs text-white mt-16 flex items-center gap-4 opacity-70">
      <span>STATUS: ONLINE</span>
      <span className="w-1 h-1 bg-red-500 animate-pulse" />
      <span>NODES: 47,392</span>
    </div>
  </div>
  );
});

HeroContent.displayName = "HeroContent";

const CornerAccent = memo(() => (
  <div className="absolute top-8 right-8 font-mono text-xs text-white text-right opacity-60">
    ENCRYPTED
    <br />
    CONNECTION
  </div>
));

CornerAccent.displayName = "CornerAccent";

export default function HeroSection() {
  const [showPixelBlast, setShowPixelBlast] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay PixelBlast initialization slightly to prioritize content rendering
          requestAnimationFrame(() => {
            setTimeout(() => setShowPixelBlast(true), 100);
          });
          observerRef.current?.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden" ref={containerRef}>
      {/* PixelBlast Background - Optimized settings */}
      <div className="absolute inset-0 will-change-transform">
        {showPixelBlast && (
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
        )}
      </div>

      {/* Heavy dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Main Container - Two Column Layout */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
        {/* Left Side - Hero Content */}
        <HeroContent />

        {/* Right Side - Hero Cards */}
        <div className="hidden lg:block flex-1 h-[600px] max-w-lg will-change-transform">
          <HeroCards />
        </div>
      </div>

      {/* Corner accent - top right */}
      <CornerAccent />

      {/* Bottom glitch line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </div>
  );
}
