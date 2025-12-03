"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

// Cart item type
export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
  category?: string;
}

// Cart context type
interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add item to cart
  const addToCart = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      // Check if item already exists (same id, size, and color)
      const existingItemIndex = prev.findIndex(
        item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        // Update quantity if exists
        const updated = [...prev];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        // Add new item
        return [...prev, { ...newItem, quantity: 1 }];
      }
    });
    
    // Optionally open cart when item is added
    setIsCartOpen(true);
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter(item => item.quantity > 0)
    );
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Open cart
  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  // Close cart
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Toggle cart
  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const value: CartContextType = {
    cartItems,
    isCartOpen,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;