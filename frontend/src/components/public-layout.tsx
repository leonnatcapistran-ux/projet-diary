import React from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import Layout from './Layout';

type PublicLayoutProps = {
  children: React.ReactNode;
};

// Composant interne — a accès au contexte
const PublicLayoutInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setIsCartOpen, isCartOpen, cart, removeFromCart, updateQuantity } = useCart();

  return (
    <Layout>
      {children}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </Layout>
  );
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return <PublicLayoutInner>{children}</PublicLayoutInner>;
};

export default PublicLayout;
