"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, title }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -320 : 320; 
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-8 relative group">
      {/* Title - Updated to text-white for dark theme */}
      {title && (
         <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter mb-2">
            {title}
          </h2>
          <p className="text-white/50 font-mono text-sm">
            CURATED_SELECTION // 2024
          </p>
        </div>
      )}

      <div className="relative">
        {/* Left Arrow - Updated for dark mode (Dark bg, white text, subtle border) */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black border border-white/10 backdrop-blur-sm shadow-lg p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -ml-4"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {children}
        </div>

        {/* Right Arrow - Updated for dark mode */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black border border-white/10 backdrop-blur-sm shadow-lg p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -mr-4"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;