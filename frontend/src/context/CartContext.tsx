import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product, CartItem } from '@/types/types';

// =====================
// Types du contexte
// =====================
interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);
const CART_STORAGE_KEY = 'asi_cart_v2';

// =====================
// Provider
// =====================
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);

      if (!raw) {
        window.localStorage.removeItem('asi_cart');
        return [];
      }

      return (JSON.parse(raw) as CartItem[]).map((item) => ({
        ...item,
        id: Number(item.id),
        price: item.price !== null && item.price !== undefined ? Number(item.price) : null,
        quantity: Number(item.quantity) || 1,
      }));
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, openDrawer: boolean = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    if (openDrawer) {
      setIsCartOpen(true); // Ouvre automatiquement
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart: () => setCart([]),
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

// =====================
// Hook — remplace UseCart.ts
// =====================
export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans un CartProvider');
  return ctx;
};
