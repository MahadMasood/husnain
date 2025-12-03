import React from "react";
import DomeGallery from "../ui/DomeGallery";
import PixelBlast from "../ui/PixelBlast";
import HeroCards from "./HeroCards";

export default function HeroSection() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* PixelBlast Background */}
      <div className="absolute inset-0">
        <PixelBlast
          variant="square"
          pixelSize={6}
          color="#ff474c"
          patternScale={4}
          patternDensity={3.5}
          pixelSizeJitter={0.5}
          enableRipples={true}
          rippleSpeed={1.5}
          rippleThickness={0.02}
          rippleIntensityScale={3}
          liquid={true}
          liquidStrength={0.05}
          liquidWobbleSpeed={8}
          speed={0.8}
          edgeFade={0}
          transparent={true}
        />
      </div>

      {/* Heavy dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Main Container - Two Column Layout */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
        {/* Left Side - Hero Content */}
        <div className="flex-1 max-w-2xl">
          {/* Terminal-style prefix */}
          <div className="font-mono text-red-500 text-sm mb-6 opacity-80">
            {'>'} INITIALIZING_PROTOCOL
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
          <button className="group relative font-mono text-sm md:text-base px-8 py-4 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 uppercase tracking-widest cursor-target">
            <span className="relative z-10">ENTER THE VOID</span>
          </button>

          {/* Terminal info line */}
          <div className="font-mono text-xs text-white mt-16 flex items-center gap-4 opacity-70">
            <span>STATUS: ONLINE</span>
            <span className="w-1 h-1 bg-red-500 animate-pulse" />
            <span>NODES: 47,392</span>
          </div>
        </div>

        {/* Right Side - Hero Cards */}
        <div className="hidden lg:block flex-1 h-[600px] max-w-lg">
          <HeroCards />
        </div>
      </div>

      {/* Corner accent - top right */}
      <div className="absolute top-8 right-8 font-mono text-xs text-white text-right opacity-60">
        ENCRYPTED
        <br />
        CONNECTION
      </div>

      {/* Bottom glitch line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </div>
  );
}