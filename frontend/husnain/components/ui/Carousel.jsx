"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, title }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-8 relative group">
      {title && (
        <div className="px-4 md:px-8 mb-8">
          <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2">Fresh in</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase text-slate-900 tracking-tighter">{title}</h2>
        </div>
      )}

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-amber-50 border border-stone-200 shadow-md p-3 rounded-full text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -ml-4"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 px-4 md:px-8 snap-x snap-mandatory pb-4"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-amber-50 border border-stone-200 shadow-md p-3 rounded-full text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block -mr-4"
          aria-label="Scroll Right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
