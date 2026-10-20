import { Link, router } from '../lib/inertia-shim';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Heart,
  Leaf,
  Minus,
  Package,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Truck,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PublicLayout from '../components/public-layout';
import { useCart } from '../context/CartContext';
import { api, getApiErrorMessage } from '../lib/api';
import type { Product, ProductReview } from '../types/types';


interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
  meta?: {
    contact_href?: string;
    catalogue_href?: string;
  };
  onAddToCart?: (p: Product, qty: number) => void;
  onEditImage?: (p: Product) => void;
}

const TABS = [
  { key: 'description', label: 'Description' },
  { key: 'bienfaits', label: 'Bienfaits' },
  { key: 'utilisation', label: 'Utilisation' },
];

const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts = [], meta, onAddToCart, onEditImage }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const handleAddToCart = onAddToCart ?? addToCart;
  const [qty, setQty] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState('description');
  const related = relatedProducts.slice(0, 3);
  const [liked, setLiked] = React.useState(false);
  const [addedToCart, setAddedToCart] = React.useState(false);
  const hasPrice = product.price !== null && product.price > 0;
  const reviewCount = product.review_count ?? 0;
  const reviewAverage = product.review_average ?? null;
  const reviews = product.reviews ?? [];
  void onEditImage;

  const handleAdd = () => {
    handleAddToCart(product, qty);
    setIsCartOpen(true);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuoteRequest = () => {
    addToCart(product, qty, false);
    setIsCartOpen(false);
    router.visit('/checkout');
  };

  return (
    <PublicLayout>
      <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
        {/* BREADCRUMB AMÉLIORÉ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href={meta?.catalogue_href ?? '/catalogue'}
              className="inline-flex items-center gap-2 group transition-all duration-300 hover:gap-3"
            >
              <motion.div 
                whileHover={{ x: -3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-gold to-[#e0b82d] text-black shadow-lg shadow-gold/30 group-hover:shadow-gold/50"
              >
                <ChevronLeft size={16} className="font-bold" />
              </motion.div>
              <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                Retour au catalogue
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start mt-12">
            {/* IMAGE & FEATURES */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {/* IMAGE PRINCIPALE */}
              <div
                className="relative aspect-square rounded-3xl overflow-hidden group border border-gold/20"
                style={{ boxShadow: '0 32px 64px rgba(201, 162, 39, 0.15)' }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* HEART & SHARE BUTTONS */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-6 right-6 flex flex-col gap-3 z-20"
                >
                  <motion.button
                    onClick={() => setLiked(!liked)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/10"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: liked ? '#C9A227' : 'white',
                    }}
                  >
                    <Heart size={18} fill={liked ? '#C9A227' : 'none'} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/10"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'white',
                    }}
                  >
                    <Share2 size={18} />
                  </motion.button>
                </motion.div>
              </div>

              {/* BADGES FEATURES - 3 COLONNES */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-3 gap-3 rounded-2xl p-6 bg-gradient-to-r from-gold/10 to-[#e0b82d]/5 border border-gold/30 backdrop-blur-sm"
              >
                {[
                  { icon: <ShieldCheck size={20} />, label: '100% Fiable' },
                  { icon: <Truck size={20} />, label: 'Export global' },
                  { icon: <Leaf size={20} />, label: 'Agriculture durable' },
                ].map(({ icon, label }) => (
                  <motion.div 
                    key={label}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-2 text-center py-2"
                  >
                    <div className="text-gold">{icon}</div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 leading-tight">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* INFOS PRODUIT */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8 p-8 rounded-3xl bg-gradient-to-br from-gold/10 to-[#1a1500]/40 border border-gold/20 backdrop-blur-sm"
            >
              {/* BREADCRUMB PRODUIT */}
              <div>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {product.origin}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 bg-white/5 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                {/* TITRE */}
                <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-2 text-white/95">
                  {product.name}
                </h1>
                
                {/* PRIX */}
                {hasPrice ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-baseline gap-3 mt-6"
                  >
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-gold to-[#e0b82d] bg-clip-text text-transparent">
                      {product.price!.toFixed(2)}
                    </span>
                    <span className="text-xl text-white/70">€</span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold">
                      TVA incluse
                    </span>
                  </motion.div>
                ) : (
                  <div className="mt-6">
                    <span className="inline-block text-base font-bold text-gold bg-gold/10 px-4 py-2 rounded-xl">
                      Prix à consulter
                    </span>
                  </div>
                )}
              </div>

              {/* DESCRIPTION COURTE */}
              <p className="text-base leading-relaxed text-white/80 italic">
                "{product.description}"
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {product.origine_details && (
                  <div className="rounded-3xl p-5 bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A227] mb-3">
                      Région de production
                    </h2>
                    <div className="space-y-3 text-sm text-white/80">
                      {product.origine_details ? (
                        <div>
                          <p>{product.origine_details}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {(product.category || product.calibre_variete || product.methode_extraction) && (
                  <div className="rounded-3xl p-5 bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A227] mb-3">
                      {product.category.toLowerCase().includes("artisanat") ? <p>Type de produits</p> : <p> TYPE & QUALITÉ </p> }
                    </h2>
                    <div className="space-y-3 text-sm text-white/80">
                      {product.category ? (
                        <div>
                          <p className="text-white font-semibold">Catégorie</p>
                          <p>{product.category}</p>
                        </div>
                      ) : null}                      
                      {product.calibre_variete ? (
                        <div>
                          <p className="text-white font-semibold">Qualité</p>
                          <p>{product.calibre_variete}</p>
                        </div>
                      ) : null}
                      {product.methode_extraction ? (
                        <div>
                          <p className="text-white font-semibold">Finition</p>
                          <p>{product.methode_extraction}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>


              {/* ****************************************************** */}
              <div className="grid gap-4 md:grid-cols-2">
                {(product.certifications || product.poids_unitaire_kg || product.price !== null) && (
                  <div className="rounded-3xl p-5 bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A227] mb-3">
                       {product.category.toLowerCase().includes("artisanat") ? <p>QUALITÉ & FINITION</p> : <p> Caractéristiques techniques </p> }
                    </h2>
                    <div className="space-y-3 text-sm text-white/80">
                      {(product.certifications || product.poids_unitaire_kg || product.price !== null) ? (
                        <div>
                          {product.certifications ? (
                            <>
                              <p className="text-white font-semibold">Qualité et finition</p>
                              <p>{product.certifications}</p>
                            </>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {product.conditionnement && (
                  <div className="rounded-3xl p-5 bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A227] mb-3">
                      Conditionnement
                    </h2>
                    <div className="space-y-3 text-sm text-white/80">
                      {product.conditionnement ? (
                        <div>
                          <p className="text-white font-semibold">Conditionnement</p>
                          <ul>
                            {product.conditionnement.split(';').map((conditionnement: string, index: number) => (
                              <li key={index}>- {conditionnement.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              {/* ****************************************************** */}
              <div className="grid gap-4 md:grid-cols-2">
                {product.saisonnalite && (
                  <div className="rounded-3xl p-5 bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A227] mb-3">
                      Conservation
                    </h2>
                    <div className="space-y-3 text-sm text-white/80">
                      {product.saisonnalite ? (
                        <div>
                          <p className="text-white font-semibold">Conservation</p>
                          <p>{product.saisonnalite}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {product.utilisation && (
                  <div className="min-w-0 rounded-3xl p-5 bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A227] mb-3">
                      Utilisation & application
                    </h2>
                    <div className="space-y-3 text-sm text-white/80 wrap-break-word whitespace-normal">
                      {product.utilisation ? (
                        <div className="min-w-0">
                          <p className="text-white font-semibold">Utilisation</p>
                          <p className="overflow-wrap-anywhere wrap-break-word whitespace-normal">
                            {product.utilisation}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>


              {/* SEPARATOR */}
              <div className="h-px bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0" />

              {/* QUANTITÉ & CTA */}
              <div className="space-y-4">
                {hasPrice && (
                  <>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                      Quantité
                    </p>
                    
                    {/* QUANTITY SELECTOR MODERNE */}
                    <div className="flex gap-4">
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="inline-flex items-center rounded-2xl border border-gold/30 bg-gold/10 overflow-hidden shadow-lg shadow-gold/10"
                      >
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          disabled={qty <= 1}
                          className="w-14 h-14 flex items-center justify-center transition-all duration-200 hover:bg-gold/20 disabled:opacity-30 text-gold"
                        >
                          <Minus size={18} />
                        </motion.button>
                        <div className="w-px h-8 bg-gold/30" />
                        <span className="w-14 h-14 flex items-center justify-center font-bold text-lg text-gold">
                          {qty}
                        </span>
                        <div className="w-px h-8 bg-gold/30" />
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setQty(qty + 1)}
                          className="w-14 h-14 flex items-center justify-center transition-all duration-200 hover:bg-gold/20 text-gold"
                        >
                          <Plus size={18} />
                        </motion.button>
                      </motion.div>
                      
                      {/* TOTAL PRICE */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gold/10 border border-gold/30"
                      >
                        <span className="text-xs font-semibold text-white/60">Total</span>
                        <span className="text-lg font-bold text-gold">
                          {(product.price! * qty).toFixed(2)} €
                        </span>
                      </motion.div>
                    </div>
                  </>
                )}

                {/* BOUTON AJOUTER AU PANIER */}
                {hasPrice ? (
                  <motion.button
                    type="button"
                    onClick={handleAdd}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-16 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
                    style={{
                      background: addedToCart 
                        ? 'linear-gradient(135deg, #4ade80, #22c55e)' 
                        : 'linear-gradient(135deg, #C9A227, #e0b82d)',
                      color: '#000000',
                      boxShadow: addedToCart 
                        ? '0 12px 32px rgba(74, 222, 128, 0.3)' 
                        : '0 12px 32px rgba(201, 162, 39, 0.3)',
                    }}
                  >
                    {addedToCart ? (
                      <>
                        <CheckCircle size={20} />
                        Ajouté au panier !
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={20} />
                        Ajouter au panier
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleQuoteRequest}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-16 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 border-2 border-gold bg-gold/10 hover:bg-gold hover:text-black text-gold"
                  >
                      <Package size={20} />
                      Demander un devis
                  </motion.button>
                )}
              </div>

              {/* TRUST BADGE */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 rounded-2xl p-4 bg-white/5 border border-white/10"
              >
                <CheckCircle size={20} className="shrink-0 mt-0.5 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Produits de confiance
                  </p>
                  <p className="text-xs text-white/60">
                    Façonnées par la nature et le talent de chez nous
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          

            {/* AVIS CLIENT */}
          <div className="mt-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white/80">
                  Avis clients
                </h2>
                <p className="mt-2 text-sm bg-gold/10 text-white/80 p-3 rounded-xs border border-gold/30">
                  {reviewCount > 0 && reviewAverage !== null
                    ? `${reviewAverage.toFixed(1)} sur 5, base sur ${reviewCount} avis publiés`
                    : 'Ce produit n a pas encore d avis publié.'}
                </p>
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {reviews.map((review: ProductReview) => (
                  <div
                    key={review.id}
                    className="rounded-3xl p-6 bg-gold/5 border border-gold/30">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white/80">
                          {review.client_name}
                        </p>
                        <p className="text-xs text-white">
                          {review.date ? new Date(review.date).toLocaleDateString('fr-FR') : '-'}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            fill={index < review.note ? 'gold' : 'none'}
                            style={{color:'gold'}}
                          />
                        ))}   
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gold/80">
                      {review.commentaire || 'Aucun commentaire ajoute.'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="rounded-3xl p-8 text-sm bg-gold/5 border border-gold/30 text-white/80">
                Les avis apparaitront ici une fois publiés par l'équipe.
              </div>
            )}
          </div>

        {/* PRODUITS CONNEXES */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold text-white mb-3">
              Vous pourriez aussi aimer
            </h2>
            <p className="text-sm text-white/60">
              Découvrez d'autres produits sélectionnés pour vous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/produit/${p.id}`}
                  className="relative group rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300 h-80 flex flex-col bg-gradient-to-b from-[#1a1500]/50 to-[#0a0a0a] shadow-lg hover:shadow-gold/20"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden bg-[#1a1500]/30">
                    <img 
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* ORIGIN BADGE */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-gradient-to-r from-gold to-[#e0b82d] shadow-lg shadow-gold/30"
                    >
                      {p.origin}
                    </motion.div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                        {p.category}
                      </p>
                      <h3 className="font-bold text-lg text-white group-hover:text-gold transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                    </div>

                    {/* PRICE & CTA */}
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between pt-4 border-t border-white/10 mt-4"
                    >
                      {p.price && p.price > 0 ? (
                        <>
                          <span className="text-lg font-bold text-gold">
                            {p.price.toFixed(2)} €
                          </span>
                          <ArrowRight size={18} className="text-gold group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-semibold text-gold">
                            Prix à consulter
                          </span>
                          <ArrowRight size={18} className="text-gold group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        </div>
      </div>
    </PublicLayout>
  );
};

export default ProductDetail;

// Conteneur : lit l'id produit dans l'URL (/produit/:id) et va chercher
// les données sur GET /api/produit/{id} (autrefois injectées par Inertia).
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<ProductDetailProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState(null);
    setError(null);
    api
      .get(`/api/produit/${id}`)
      .then(({ data }) => {
        if (!data?.product) {
          throw new Error('La réponse de l’API ne contient pas le produit demandé.');
        }
        if (!cancelled) setState(data);
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(getApiErrorMessage(requestError, `/api/produit/${id}`, 'ce produit'));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id, retry]);

  if (error) {
    return (
      <PublicLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-4 text-center text-white">
          <p role="alert" className="text-white/80">{error}</p>
          <button
            type="button"
            onClick={() => setRetry((attempt) => attempt + 1)}
            className="rounded-full bg-gold px-5 py-2 font-semibold text-black"
          >
            Réessayer
          </button>
        </div>
      </PublicLayout>
    );
  }

  if (!state) {
    return (
      <PublicLayout>
        <div role="status" className="flex min-h-[60vh] items-center justify-center bg-[#0a0a0a] text-sm text-white/70">
          Chargement du produit…
        </div>
      </PublicLayout>
    );
  }

  return <ProductDetail {...state} />;
}
