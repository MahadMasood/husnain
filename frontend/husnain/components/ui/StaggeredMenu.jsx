"use client";
import React, { useRef } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function StaggeredMenuWithCart() {
  const { cartItems, isCartOpen, cartCount, cartTotal, updateQuantity, removeFromCart, closeCart, toggleCart } = useCart();
  const panelRef = useRef(null);

  const [animatingIcon, setAnimatingIcon] = React.useState(false);

  const toggleMenu = () => {
    toggleCart();
    setAnimatingIcon(true);
    setTimeout(() => setAnimatingIcon(false), 500);
  };

  const closeMenu = () => {
    closeCart();
    setAnimatingIcon(true);
    setTimeout(() => setAnimatingIcon(false), 500);
  };

  React.useEffect(() => {
    if (!isCartOpen) return;
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) closeMenu();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden z-[100]">

      {/* Cart Toggle Button */}
      {!isCartOpen && <button
        onClick={toggleMenu}
        className="fixed top-4 right-6 z-[101] pointer-events-auto flex items-center gap-2 bg-slate-900 hover:bg-amber-600 text-white px-4 py-2.5 rounded-full transition-all shadow-lg"
        aria-label="Open shopping bag"
      >
        <ShoppingBag className={`w-5 h-5 transition-transform ${animatingIcon ? 'scale-125' : 'scale-100'}`} />
        {cartCount > 0 && (
          <span className="bg-amber-400 text-slate-900 text-xs font-black rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {cartCount}
          </span>
        )}
      </button>}

      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Cart Panel */}
      <aside
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl transition-transform duration-500 ease-out pointer-events-auto ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="border-b border-stone-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Shopping Bag</h2>
            <p className="font-mono text-sm text-stone-400 mt-1">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={closeMenu} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-stone-200 mb-4" />
              <p className="font-bold text-slate-700 mb-1">Your bag is empty</p>
              <p className="text-stone-400 text-sm mb-8">Add some items to get started</p>
              <button
                onClick={closeMenu}
                className="px-6 py-3 bg-amber-500 text-white font-mono text-sm rounded-xl hover:bg-amber-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 border border-stone-200 hover:border-amber-300 transition-colors rounded-xl bg-white"
                >
                  <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 mb-1 truncate">{item.name}</h3>
                    <div className="font-mono text-xs text-stone-400 space-y-0.5">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2.5 py-1.5 hover:bg-stone-100 transition-colors">
                          <Minus className="w-3 h-3 text-stone-600" />
                        </button>
                        <span className="px-3 font-mono text-sm font-bold text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2.5 py-1.5 hover:bg-stone-100 transition-colors">
                          <Plus className="w-3 h-3 text-stone-600" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto p-1.5 text-stone-300 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-slate-900">Rs. {item.price * item.quantity}</p>
                    {item.quantity > 1 && <p className="font-mono text-xs text-stone-400">Rs. {item.price} ea</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4 bg-stone-50">
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-black text-2xl text-slate-900">Rs. {cartTotal}</span>
            </div>
            <p className="font-mono text-xs text-stone-400 text-center">Shipping & taxes calculated at checkout</p>
            <Link href="/cart" onClick={closeMenu} className="block w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors uppercase tracking-wider text-center text-sm">
              View Full Bag & Checkout
            </Link>
            <button
              onClick={closeMenu}
              className="w-full py-3 border border-slate-900 text-slate-900 font-mono text-sm rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
