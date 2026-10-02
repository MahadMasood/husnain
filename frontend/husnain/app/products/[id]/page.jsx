"use client";
import React, { useState } from "react";
import { Heart, ShoppingBag, Truck, Shield, ArrowLeft, Star, Plus, Minus, RotateCcw } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter, useParams } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const getColorHex = (colorName) => {
  const colorMap = {
    'white': '#fff', 'black': '#111', 'gray': '#808080', 'blue': '#4169E1',
    'red': '#DC143C', 'navy': '#001f3f', 'olive': '#556B2F', 'brown': '#8B4513',
    'khaki': '#C3B091', 'charcoal': '#36454F', 'sand': '#C2B280',
    'burgundy': '#800020', 'pink': '#FFC0CB', 'cream': '#FFF8E7',
    'forest': '#228B22', 'yellow': '#F5C518',
  };
  return colorMap[colorName?.toLowerCase()] || '#999';
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const product = products.find((p) => String(p._id) === String(productId) || String(p.id) === String(productId));
  const related = products.filter((p) => String(p._id) !== String(productId) && String(p.id) !== String(productId) && (p.category === product?.category || p.gender === product?.gender)).slice(0, 4);

  React.useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-stone-500 font-mono">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h1>
          <p className="text-stone-400 mb-8">This product doesn't exist or may have been removed.</p>
          <Link href="/products" className="px-6 py-3 bg-amber-500 text-white font-mono text-sm rounded-xl hover:bg-amber-600 transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const safeImage = product.image || '/hero/hero1.jpg';
  const additionalImages = product.images || [];
  const images = [safeImage, ...additionalImages];

  const handleAddToBag = () => {
    if (!selectedSize) return;
    // Add item to cart for each unit of the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: safeImage,
        size: selectedSize,
        color: selectedColor,
        category: product.category,
      });
    }
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-4">
        <div className="flex items-center gap-2 text-sm text-stone-400 font-mono">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-slate-700 truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-stone-100 rounded-2xl overflow-hidden group">
              <Image
                src={images[selectedImage]}
                alt={product.name || 'Product'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.new && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 font-mono text-xs font-bold rounded-full">
                  NEW ARRIVAL
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-stone-700 text-white px-3 py-1 font-mono text-xs font-bold rounded-full">
                  SOLD OUT
                </div>
              )}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-amber-500 text-amber-500" : "text-stone-400"}`} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-stone-100 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-amber-400" : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} width={200} height={200} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6 lg:pt-2">
            <div>
              <p className="font-mono text-xs text-amber-600 uppercase tracking-widest mb-2">
                {product.category} · {product.gender}
              </p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">{product.name}</h1>
              <p className="font-mono text-xs text-stone-400">SKU: TC-{String(product._id || product.id).slice(-4).padStart(4, '0')}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-400 text-lg">
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="font-mono text-sm text-stone-500">{product.rating} · 128 reviews</span>
            </div>

            <div className="text-4xl font-black text-slate-900">Rs. {product.price}</div>

            <p className="text-stone-600 leading-relaxed">
              Premium quality {product.category.toLowerCase()} crafted for everyday wear. Designed for comfort and durability across every season, suitable for the whole family.
            </p>

            {/* Color */}
            <div>
              <h3 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                Colour: <span className="text-slate-800">{selectedColor}</span>
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${
                      selectedColor === color ? "border-amber-500 scale-110" : "border-stone-200 hover:border-stone-400"
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
                  Size {selectedSize && `· ${selectedSize}`}
                </h3>
                <button className="font-mono text-xs text-amber-600 hover:text-amber-700 underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 font-mono text-sm rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="font-mono text-xs text-stone-400 mt-2">Please select a size</p>}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-stone-100 transition-colors text-stone-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono text-lg font-bold text-slate-900 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-3 hover:bg-stone-100 transition-colors text-stone-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              disabled={!product.inStock || !selectedSize}
              onClick={handleAddToBag}
              className={`w-full py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-3 ${
                addedToBag
                  ? "bg-green-500 text-white"
                  : selectedSize && product.inStock
                  ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-amber-200"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {addedToBag ? "Added to Bag! ✓" : !product.inStock ? "Out of Stock" : !selectedSize ? "Select a Size" : "Add to Bag"}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, title: "Free Shipping", desc: "Orders over Rs. 100" },
                { icon: RotateCcw, title: "30-Day Returns", desc: "Easy & free" },
                { icon: Shield, title: "Quality Promise", desc: "2-year warranty" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="border border-stone-200 bg-white rounded-xl p-3 flex flex-col items-center text-center gap-1">
                  <Icon className="w-4 h-4 text-amber-500" />
                  <h4 className="font-bold text-xs text-slate-700">{title}</h4>
                  <p className="font-mono text-xs text-stone-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-1">You May Also Like</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <Link
                  key={p._id || p.id}
                  href={`/products/${p._id || p.id}`}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-amber-400 hover:shadow-md transition-all group"
                >
                  <div className="aspect-square bg-stone-100 relative overflow-hidden">
                    <Image
                      src={p.image || '/hero/hero1.jpg'}
                      alt={p.name || 'Related Product'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-amber-600 transition-colors leading-tight">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-slate-900">Rs. {p.price}</span>
                      <div className="text-amber-400 text-xs">{'★'.repeat(Math.round(p.rating))}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
