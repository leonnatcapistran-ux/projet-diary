import { Link, router } from '../lib/inertia-shim';
import {motion} from "framer-motion";
import { ArrowRight, ShoppingCart, Info, Zap } from 'lucide-react';
import React from 'react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const hasPrice = product.price !== null && product.price > 0;
  const [isHovered, setIsHovered] = React.useState(false);
  const [addedToCart, setAddedToCart] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="relative group rounded-3xl overflow-hidden h-full"
    >
      {/* ANIMATED BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-[#1a1500]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* GLOW EFFECT */}
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-radial-gradient opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(201, 162, 39, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1500]/50 to-[#0a0a0a]/30 border border-gold/10 group-hover:border-gold/40 transition-colors duration-300 rounded-3xl">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        
        {/* ORIGIN BADGE */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="absolute top-4 left-4 bg-gradient-to-r from-gold to-[#e0b82d] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-gold/40 z-20 flex items-center gap-2"
        >
          <Zap size={14} />
          {product.origin}
        </motion.div>

        {/* QUICK ADD BUTTON - ON HOVER */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold to-[#e0b82d] text-black text-xs font-bold px-6 py-3.5 rounded-full hover:shadow-xl shadow-gold/40 transition-all flex items-center gap-2 z-20"
        >
          <ShoppingCart size={16} />
          {addedToCart ? '✓ Ajouté !' : 'Ajouter'}
        </motion.button>

        {/* CORNER ACCENT */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      {/* CARD CONTENT */}
      <motion.div 
        className="relative pt-6 pb-6 px-5 bg-gradient-to-b from-[#1a1500]/80 via-[#0f0f0f]/90 to-[#0a0a0a] border border-t-0 border-gold/10 group-hover:border-gold/30 transition-colors duration-300 rounded-b-3xl h-fit"
        layout
      >
        {/* PRODUCT NAME */}
        <h3 className="font-bold text-white text-base leading-tight mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* PRODUCT DESCRIPTION */}
        <p className="text-xs text-white/60 mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* SEPARATOR WITH GRADIENT */}
        <div className="h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 my-4" />

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col gap-3">
          {hasPrice && product.price ? (
            <>
              {/* PRICE SECTION */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-gold to-[#e0b82d] bg-clip-text text-transparent">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-white/50 font-semibold">€</span>
                </div>
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 5 : -5 }}
                  className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full"
                >
                  Livraison
                </motion.div>
              </motion.div>

              {/* DETAILS BUTTON - PROMINENT */}
              <motion.div
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/produit/${product.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold/20 to-[#e0b82d]/10 hover:from-gold hover:to-[#e0b82d] text-gold hover:text-black text-xs font-bold px-4 py-3.5 rounded-xl transition-all duration-300 border border-gold/50 hover:border-gold hover:shadow-lg hover:shadow-gold/40 group/btn"
                >
                  <Info size={15} className="group-hover/btn:hidden transition-all" />
                  <ArrowRight size={15} className="hidden group-hover/btn:inline transition-all" />
                  <span>Voir les détails</span>
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              {/* NO PRICE */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="text-xs font-bold text-gold bg-gradient-to-r from-gold/10 to-[#e0b82d]/5 rounded-lg px-3 py-2.5 text-center border border-gold/20"
              >
                Prix à consulter
              </motion.div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1, false);
                    setIsCartOpen(false);
                    router.visit('/checkout');
                  }}
                  className="flex-1 bg-gradient-to-r from-white/10 to-white/5 hover:from-gold/20 hover:to-[#e0b82d]/10 text-white/80 hover:text-gold text-xs px-3 py-2.5 rounded-lg transition-all duration-300 border border-white/10 hover:border-gold/30 font-bold hover:shadow-lg hover:shadow-gold/20"
                >
                  Devis
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link
                    href={`/produit/${product.id}`}
                    className="w-full inline-flex items-center justify-center gap-1 bg-gradient-to-r from-gold/20 to-[#e0b82d]/10 hover:from-gold hover:to-[#e0b82d] text-gold hover:text-black text-xs px-3 py-2.5 rounded-lg transition-all duration-300 border border-gold/50 hover:border-gold font-bold hover:shadow-lg hover:shadow-gold/30 group/btn"
                  >
                    <Info size={14} className="group-hover/btn:hidden" />
                    <ArrowRight size={14} className="hidden group-hover/btn:inline" />
                  </Link>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;


