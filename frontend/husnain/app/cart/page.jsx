"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <ShoppingBag className="w-20 h-20 text-stone-200 mb-6" />
          <h1 className="text-3xl font-black text-slate-900 mb-2">Your bag is empty</h1>
          <p className="text-stone-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-600 font-mono text-sm transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">Shopping Bag</h1>
        <p className="text-stone-400 font-mono text-sm">{cartCount} {cartCount === 1 ? "item" : "items"}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="bg-white rounded-2xl border border-stone-200 p-5 flex gap-5 hover:border-amber-300 transition-colors"
            >
              <div className="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                {item.image && (
                  <Image src={item.image} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                    <div className="font-mono text-xs text-stone-400 space-y-0.5">
                      <p>Size: <span className="text-slate-600">{item.size}</span></p>
                      <p>Colour: <span className="text-slate-600">{item.color}</span></p>
                    </div>
                  </div>
                  <p className="font-black text-lg text-slate-900 shrink-0">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-2 hover:bg-stone-100 text-stone-600 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 font-mono font-bold text-slate-900 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-2 hover:bg-stone-100 text-stone-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1.5 font-mono text-xs text-stone-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="font-mono text-xs text-stone-400 hover:text-red-400 transition-colors mt-2"
          >
            Clear entire bag
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sticky top-24 space-y-5">
            <h2 className="font-black text-xl text-slate-900">Order Summary</h2>

            {/* Promo code */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full pl-9 pr-3 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 placeholder-stone-400"
                />
              </div>
              <button className="px-4 py-2.5 bg-slate-900 text-white font-mono text-sm rounded-xl hover:bg-amber-600 transition-colors">
                Apply
              </button>
            </div>

            <div className="border-t border-stone-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal</span>
                <span className="font-mono">Rs. {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Shipping</span>
                <span className="font-mono">
                  {shipping === 0
                    ? <span className="text-green-600 font-semibold">FREE</span>
                    : `Rs. ${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-amber-600 font-mono bg-amber-50 rounded-lg px-3 py-2">
                  Add Rs. {(100 - cartTotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between text-sm text-stone-500">
                <span>Tax (est.)</span>
                <span className="font-mono">Rs. {tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4">
              <div className="flex justify-between items-center mb-5">
                <span className="font-bold text-slate-900 text-lg">Total</span>
                <span className="font-black text-2xl text-slate-900">Rs. {orderTotal.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber-200 text-sm uppercase tracking-wide block text-center"
              >
                Proceed to Checkout
              </Link>
              <p className="text-center font-mono text-xs text-stone-400 mt-3">
                🔒 Secure checkout · SSL encrypted
              </p>
            </div>

            {/* Accepted payments */}
            <div className="border-t border-stone-100 pt-4">
              <p className="text-xs text-stone-400 font-mono text-center mb-2">We accept</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((p) => (
                  <span key={p} className="text-xs font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded-md">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
