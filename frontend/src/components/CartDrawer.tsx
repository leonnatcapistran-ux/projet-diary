import { Link } from '../lib/inertia-shim';
import { X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import React from 'react';
import type { CartItem } from '@/types/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
}) => {
  const hasPricedItems = cart.some((item) => item.price !== null && item.price > 0);
  const total = cart.reduce((sum, item) => sum + ((item.price ?? 0) * item.quantity), 0);
  const actionHref = '/checkout';
  const actionLabel = hasPricedItems ? 'Passer a la commande' : 'Demander un devis';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className="fixed top-0 right-0 z-[100] flex h-full w-full max-w-md flex-col bg-offwhite shadow-2xl"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="flex items-center justify-between border-b border-forest/10 px-8 py-6">
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} className="text-forest" />
            <h2 className="text-xl font-bold text-forest">Votre panier</h2>
          </div>
          <button
            onClick={onClose}
            className="text-forest/40 transition-colors hover:text-forest"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-beige/40">
                <ShoppingCart size={32} className="text-forest/30" />
              </div>
              <p className="font-bold text-forest/80">Votre panier est vide</p>
              <p className="text-sm text-forest/50">Decouvrez nos produits d&apos;exception.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-forest/5 bg-white p-4 shadow-sm"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold leading-tight text-forest">{item.name}</p>
                        <p className="mt-0.5 text-xs text-forest/50">{item.origin || 'Produit'}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="flex-shrink-0 text-forest/30 transition-colors hover:text-brick"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-forest/40 transition-colors hover:text-forest"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm font-bold text-forest">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, +1)}
                          className="text-forest/40 transition-colors hover:text-forest"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-forest">
                        {item.price !== null && item.price > 0
                          ? `${((item.price ?? 0) * item.quantity).toFixed(2)} €`
                          : 'Prix à consulter'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-4 border-t border-forest/10 px-8 py-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-forest">Total</span>
              <span className="text-lg font-bold text-forest">
                {hasPricedItems ? `${total.toFixed(2)} EUR` : 'Prix à consulter'}
              </span>
            </div>
            <Link
              href={actionHref}
              as="button"
              type="button"
              onClick={onClose}
              title={actionLabel}
              className="w-full rounded-full bg-gold py-4 text-base font-bold text-black shadow-lg hover:cursor-pointer"
            >
              {actionLabel}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
