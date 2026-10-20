import React from 'react';
import type { Product, CartItem } from '../types/types';

export const useCart = () => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  };
};
