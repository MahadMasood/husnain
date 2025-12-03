"use client";
import React, { useState } from "react";
import { Heart, ShoppingBag, Truck, Shield, ArrowLeft, Star, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PixelBlast from "@/components/ui/PixelBlast";
import { useRouter } from "next/navigation";
// Mock product data - replace with your actual product data
const PRODUCT = {
  id: 1,
  name: "TACTICAL STEALTH HOODIE",
  category: "Hoodies",
  price: 89,
  rating: 4.8,
  reviews: 156,
  description: "Military-grade streetwear engineered for the urban underground. Features advanced moisture-wicking fabric, reinforced stitching, and hidden internal pockets for maximum utility.",
  images: [
    "/hero/hero1.jpg",
    "/hero/hero2.jpg",
    "/hero/hero3.jpg",
    "/hero/hero1.jpg",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Navy", hex: "#001f3f" },
    { name: "Olive", hex: "#556B2F" },
  ],
  inStock: true,
  features: [
    "Water-resistant fabric treatment",
    "Reinforced stress points",
    "Hidden zippered pockets",
    "Adjustable hood with drawstrings",
    "Ribbed cuffs and hem",
    "YKK premium zippers",
  ],
  specs: {
    material: "80% Cotton, 20% Polyester",
    weight: "450gsm",
    fit: "Regular fit",
    origin: "Manufactured in controlled facilities",
  },
};

const RELATED_PRODUCTS = [
  {
    id: 2,
    name: "URBAN COMBAT PANTS",
    price: 79,
    image: "/hero/hero2.jpg",
    rating: 4.7,
  },
  {
    id: 3,
    name: "TACTICAL VEST",
    price: 129,
    image: "/hero/hero3.jpg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "STEALTH CARGO JACKET",
    price: 159,
    image: "/hero/hero1.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "RECON BOOTS",
    price: 199,
    image: "/hero/hero2.jpg",
    rating: 4.8,
  },
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

    const router = useRouter();

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* PixelBlast Background */}
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

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/94 z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20">
        <Navbar />

        <div className="min-h-screen text-white pt-20">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <button onClick={() => router.push("/products")} className="flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-red-500 transition-colors cursor-target">
              <ArrowLeft className="w-4 h-4" />
              BACK TO SHOP
            </button>
          </div>

          {/* Product Details Section */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-white/5 border border-white/10 overflow-hidden group">
                  <Image
                    src={PRODUCT.images[selectedImage]}
                    alt={PRODUCT.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {PRODUCT.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-black px-3 py-1 font-mono text-xs font-bold">
                      IN STOCK
                    </div>
                  )}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-black transition-colors cursor-target"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {PRODUCT.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-white/5 border overflow-hidden transition-all cursor-target ${
                        selectedImage === idx
                          ? "border-red-500"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`View ${idx + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="space-y-6">
                {/* Terminal prefix */}
                <div className="font-mono text-red-500 text-xs opacity-80">
                  {'>'} PRODUCT_ID: {PRODUCT.id.toString().padStart(6, '0')}
                </div>

                {/* Product Name & Category */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                    {PRODUCT.name}
                  </h1>
                  <p className="font-mono text-sm text-gray-400">
                    {PRODUCT.category} • SKU: TH-{PRODUCT.id}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-red-500 text-red-500" />
                    <span className="font-mono text-sm">{PRODUCT.rating}</span>
                  </div>
                  <span className="font-mono text-xs text-gray-400">
                    ({PRODUCT.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="text-5xl font-black text-red-500">
                  ${PRODUCT.price}
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {PRODUCT.description}
                </p>

                {/* Color Selection */}
                <div>
                  <h3 className="font-mono text-sm text-red-500 mb-3">
                    COLOR: {selectedColor.name}
                  </h3>
                  <div className="flex gap-3">
                    {PRODUCT.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 border-2 transition-all cursor-target ${
                          selectedColor.name === color.name
                            ? "border-red-500 scale-110"
                            : "border-white/20 hover:border-white/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-mono text-sm text-red-500 mb-3">
                    SELECT SIZE {selectedSize && `• ${selectedSize}`}
                  </h3>
                  <div className="grid grid-cols-6 gap-2">
                    {PRODUCT.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 font-mono text-sm border transition-all cursor-target ${
                          selectedSize === size
                            ? "border-red-500 bg-red-500/20 text-red-500"
                            : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-mono text-sm text-red-500 mb-3">
                    QUANTITY
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center cursor-target"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xl w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center cursor-target"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!selectedSize}
                  className={`w-full py-4 font-mono text-sm transition-all flex items-center justify-center gap-3 cursor-target ${
                    selectedSize
                      ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                      : "border border-gray-700 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
                </button>

                {/* Features */}
                <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-6 space-y-4">
                  <h3 className="font-mono text-sm text-red-500 mb-4">
                    KEY FEATURES
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {PRODUCT.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 font-mono text-xs text-gray-300"
                      >
                        <span className="text-red-500 mt-0.5">▸</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Returns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-4 flex items-start gap-3">
                    <Truck className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="font-mono text-xs text-white mb-1">
                        FREE SHIPPING
                      </h4>
                      <p className="font-mono text-xs text-gray-400">
                        On orders over $100
                      </p>
                    </div>
                  </div>
                  <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="font-mono text-xs text-white mb-1">
                        30-DAY RETURNS
                      </h4>
                      <p className="font-mono text-xs text-gray-400">
                        Easy return policy
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-6">
                  <h3 className="font-mono text-sm text-red-500 mb-4">
                    SPECIFICATIONS
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(PRODUCT.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between font-mono text-xs border-b border-white/5 pb-2"
                      >
                        <span className="text-gray-400 uppercase">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-24">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="font-mono text-red-500 text-xs mb-2 opacity-80">
                    {'>'} RECOMMENDED
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter">
                    YOU MIGHT ALSO LIKE
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {RELATED_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="border border-white/10 hover:border-red-500/50 transition-all group cursor-pointer"
                  >
                    <div className="aspect-square bg-white/5 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-red-500 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-red-500">
                          ${product.price}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-red-500 text-red-500" />
                          <span className="font-mono text-xs">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glitch line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-30 pointer-events-none" />
    </div>
  );
}