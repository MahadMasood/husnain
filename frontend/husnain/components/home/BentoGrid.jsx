import { ArrowUpRight } from 'lucide-react';

export default function BentoGrid() {
  return (
    <section className="bg-black px-4 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter mb-2">
            Collections
          </h2>
          <p className="text-white/50 font-mono text-sm">
            CURATED_SELECTION // 2024
          </p>
        </div>

        {/* FIX 1: Changed h-[120vh] to h-auto so it grows with content on mobile.
           FIX 2: Added md:grid-rows-2 so rigid rows only apply to desktop.
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[80vh]">
          
          {/* Large Feature Item */}
          {/* FIX 3: Added h-[50vh] md:h-auto so this specific card is tall on mobile 
             but fills the grid cell automatically on desktop.
          */}
          <div className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-lg bg-zinc-900 border border-white/10 cursor-target h-[50vh] md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              alt="Main Model"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 font-mono text-xs mb-2 tracking-widest">FEATURED</p>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                    Outerwear
                  </h3>
                </div>
                <button className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Right Item - Added min-h for mobile safety */}
          <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-lg bg-zinc-900 border border-white/10 cursor-target min-h-[300px] md:min-h-0">
            <img 
              src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-90"
              alt="Detail Shot"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter">
                    Accessories
                  </h3>
                  <p className="text-white/60 font-mono text-xs mt-1 tracking-wider">LIMITED_EDITION</p>
                </div>
                <div className="w-2 h-2 bg-red-500 animate-pulse" />
              </div>
              <button className="self-end text-white font-mono text-xs uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1">
                Explore <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bottom Left - Sale Card - Added min-h for mobile safety */}
          <div className="col-span-1 relative group overflow-hidden rounded-lg bg-red-600 border border-red-500 flex items-center justify-center p-8 hover:bg-red-700 transition-colors cursor-target min-h-[300px] md:min-h-0">
            <div className="text-center">
              <p className="text-white/80 font-mono text-xs tracking-widest mb-2">FLASH_SALE</p>
              <h3 className="text-6xl md:text-7xl font-black uppercase text-white tracking-tighter mb-2">
                50%
              </h3>
              <p className="text-white font-mono text-sm tracking-wider">OFF_SELECTED_ITEMS</p>
              <div className="mt-4 h-px bg-white/20" />
              <p className="text-white/60 font-mono text-xs mt-3 tracking-wider">ENDS_SOON</p>
            </div>
          </div>

          {/* Bottom Right - Shoes - Added min-h for mobile safety */}
          <div className="col-span-1 relative group overflow-hidden rounded-lg bg-zinc-900 border border-white/10 cursor-target min-h-[300px] md:min-h-0">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
              alt="Shoes"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-black uppercase text-white tracking-tighter">
                Footwear
              </h3>
              <p className="text-white/60 font-mono text-xs mt-1">NEW_ARRIVALS</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}