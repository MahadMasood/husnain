import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const LOOKS = [
  {
    id: 1, title: "Autumn Essentials", season: "Fall 2025", gender: "Adults",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    description: "Layered warmth meets understated elegance.",
    products: [1, 7, 13],
  },
  {
    id: 2, title: "Weekend Casual", season: "All Season", gender: "Unisex",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800",
    description: "Easy, effortless style for every weekend.",
    products: [4, 9, 6],
  },
  {
    id: 3, title: "Kids Play Day", season: "Fall 2025", gender: "Kids",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    description: "Durable, colourful and ready for adventure.",
    products: [16, 18, 19],
  },
  {
    id: 4, title: "Winter Layers", season: "Winter 2025", gender: "Adults",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    description: "Stay warm, stay stylish through the coldest months.",
    products: [2, 5, 10],
  },
  {
    id: 5, title: "Street Smart", season: "All Season", gender: "Unisex",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800",
    description: "Urban-inspired looks for the modern wardrobe.",
    products: [12, 14, 3],
  },
  {
    id: 6, title: "Little Explorers", season: "All Season", gender: "Kids",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    description: "Bright, playful styles built for growing minds.",
    products: [17, 20, 16],
  },
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="pt-24 pb-4 max-w-7xl mx-auto px-4">
        <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2">Style Inspiration</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-4">Lookbook</h1>
        <p className="text-stone-500 max-w-xl">Curated outfits for every season and every member of the family. Click any look to shop the pieces.</p>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-0 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
          {["All", "Adults", "Kids", "Unisex", "Fall 2025", "Winter 2025"].map((f) => (
            <button key={f} className="shrink-0 px-4 py-1.5 font-mono text-sm border border-stone-200 rounded-full text-stone-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors bg-white">
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOOKS.map((look) => (
            <div key={look.id} className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all">
              <div className="aspect-[4/5] relative overflow-hidden bg-stone-100">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 text-slate-700 font-mono text-xs px-2 py-1 rounded-full">{look.season}</span>
                  <span className="bg-amber-500 text-white font-mono text-xs px-2 py-1 rounded-full">{look.gender}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-1">{look.title}</h3>
                  <p className="text-white/80 text-sm">{look.description}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="font-mono text-xs text-stone-400 mb-3 uppercase tracking-wider">Shop this look</p>
                <div className="flex gap-2">
                  {look.products.map((id) => (
                    <Link
                      key={id}
                      href={`/products/${id}`}
                      className="flex-1 text-center py-2 border border-stone-200 rounded-lg font-mono text-xs text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                    >
                      Item {id}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/products?gender=${look.gender}`}
                  className="mt-3 w-full block text-center py-2.5 bg-slate-900 text-white font-mono text-xs rounded-xl hover:bg-amber-600 transition-colors"
                >
                  View Full Collection →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}