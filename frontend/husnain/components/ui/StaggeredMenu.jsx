"use client";
import React, { useRef, useState, useMemo } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
// 1. Commented out the real context for testing
// import { useCart } from '@/context/CartContext';

// 2. Created Dummy Data
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'Oversized Heavyweight Tee',
    size: 'M',
    color: 'Obsidian',
    price: 45,
    quantity: 1,
    // w-20 is 80px. We use object-cover to handle non-square images.
    image: <Image src="/hero/hero1.jpg" width={80} height={80} className="w-full h-full object-cover" alt="Oversized Heavyweight Tee" />, 
  },
  {
    id: 'p2',
    name: 'Technical Cargo Pant',
    size: '32',
    color: 'Dune',
    price: 120,
    quantity: 2,
    image: <Image src="/hero/hero2.jpg" width={80} height={80} className="w-full h-full object-cover" alt="Technical Cargo Pant" />,
  },
  {
    id: 'p3',
    name: 'Signature Cap',
    size: 'OS',
    color: 'Black',
    price: 35,
    quantity: 1,
    // Fixed height from 90 to 80 to match the container square aspect ratio
    image: <Image src="/hero/hero3.jpg" width={80} height={80} className="w-full h-full object-cover" alt="Signature Cap" />,
  }
];

export default function StaggeredMenuWithCart() {
  // 3. Replaced useCart hook with local state for the demo
  // const { cartItems, isCartOpen, cartCount, cartTotal, updateQuantity, removeFromCart, closeCart, toggleCart } = useCart();
  const {isCartOpen, closeCart} = useCart();
  // --- MOCK LOGIC START ---
  const [cartItems, setCartItems] = useState(DUMMY_PRODUCTS);

  // Derived calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateQuantity = (id, change) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  // --- MOCK LOGIC END ---

  const [animatingIcon, setAnimatingIcon] = React.useState(false);
  const panelRef = useRef(null);

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

  // Close on click outside
  React.useEffect(() => {
    if (!isCartOpen) return;

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  // Temporary Button to reopen the cart if you close it during testing

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden z-100">
      
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto z-5 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Cart Panel */}
      <aside
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl z-10 transition-transform duration-500 ease-out pointer-events-auto ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        {/* Cart Header */}
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-black">SHOPPING BAG</h2>
            <p className="font-mono text-sm text-gray-500 mt-1">{cartCount} items</p>
          </div>
          <button onClick={closeMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="font-mono text-gray-400">Your cart is empty</p>
              <button
                onClick={closeMenu}
                className="mt-6 px-6 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 border border-gray-200 hover:border-red-500/50 transition-colors group bg-white"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-50 flex items-center justify-center text-4xl flex-shrink-0 select-none">
                    {item.image}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm mb-1 truncate">{item.name}</h3>
                    <div className="font-mono text-xs text-gray-500 space-y-0.5">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 font-mono text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors ml-auto"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg">${item.price * item.quantity}</p>
                    {item.quantity > 1 && (
                      <p className="font-mono text-xs text-gray-500">${item.price} ea</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-mono text-sm text-gray-600">Subtotal</span>
              <span className="font-black text-2xl">${cartTotal}</span>
            </div>

            {/* Shipping Notice */}
            <p className="font-mono text-xs text-gray-500 text-center">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-black text-white font-mono text-sm font-bold hover:bg-red-500 transition-colors uppercase tracking-wider">
              PROCEED TO CHECKOUT
            </button>

            {/* Continue Shopping */}
            <button
              onClick={closeMenu}
              className="w-full py-3 border border-black text-black font-mono text-sm hover:bg-black hover:text-white transition-colors uppercase tracking-wider"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}