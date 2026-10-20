import { Link } from '../lib/inertia-shim'; // Link href-compatible (voir lib/inertia-shim.tsx)
import { motion, type Variants } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Sparkles, ShoppingBag, ArrowRight, Leaf } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { api, getApiErrorMessage } from '../lib/api';
import ProductCard from '../components/ProductCard';
import PublicLayout from '../components/public-layout';
import type { Product } from '../types/types';

interface CatalogueProps {
  origin?: string | null;
  products?: Product[];
  categories?: string[];
  meta?: {
    title?: string;
    subtitle?: string;
  };
}

const ITEMS_PER_PAGE = 9;

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const easeSmooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const smoothFadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const HERO_CATEGORIES = [
  "Vanille Bourbon",
  "Épices de Madagascar",
  "Grains & Légumineuses",
  "Artisanat en Raphia",
  "Qualité Export",
];

const BadgeContent = [
  {value:"Expertise Marché International", label:"Une connaissance approfondie des exigences de l'exportation pour un service fiable."},
  {value:"Filière Vanille & Épices", label:"Une sélection premium de Vanille Bourbon et d'épices fines collectées directement."},
  {value:"Artisanat & Fibres Naturelles", label:"Des créations uniques en Raphia et matières naturelles valorisant l'art malagasy"},
]

function StatBadge({
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col justify-between items-center gap-1 rounded-2xl border border-gold/20 bg-black/40 px-5 py-4 backdrop-blur-sm text-center">
      <p className="text-[18px] font-extrabold text-white">{value}</p>
      <p className="text-[10px] tracking-widest text-white/50 leading-tight">{label}</p>
    </div>
  );
}

const Catalogue: React.FC<CatalogueProps> = ({ products = [], categories = [], meta }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('Tous');
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortedProducts = React.useMemo(() => [...products].reverse(), [products]);
  const sortedCategories = React.useMemo(
    () => (categories.length > 0 ? [...categories].reverse() : [...new Set(products.map((p) => p.category))].reverse()),
    [categories, products]
  );

  const filteredProducts = sortedProducts.filter((p) =>
    (activeCategory === 'Tous' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  const availableCategories = ['Tous', ...sortedCategories];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1200_55%,#2a1e00_100%)] pt-28">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[-6rem] top-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute bottom-[-5rem] left-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={smoothFadeIn}
              className="max-w-2xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                <Sparkles className="h-4 w-4" />
                SÉLECTION DIARY
              </div>
              <h1 className="text-xl font-extrabold leading-tight">
                {meta?.title ?? 'Nos produits'}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Spécialiste de la Vanille, Épices (Girofle, Poivre, Cannelle) et de l'Artisanat en Raphia authentique
              </p>

              {/* Boutons d'action */}
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/catalogue#Gammes"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-[#e0b82d] px-6 py-3 text-sm font-bold text-black shadow-lg shadow-gold/20 transition hover:shadow-gold/40"
                  >
                    Découvrir nos Gammes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }} className="rounded-full">
                  <Link
                    href="/nous-contacter"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Demander un Devis
                  </Link>
                </motion.div>
              </div>

              {/* Pastilles de catégories emblématiques */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-wrap gap-2"
              >
                {HERO_CATEGORIES.map((category) => (
                  <motion.span
                    variants={smoothFadeIn}
                    whileHover={{ scale: 1.08 }}
                    key={category}
                    className="rounded-full border border-gold/20 bg-black/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80 backdrop-blur-sm cursor-default transition-colors hover:border-gold/50"
                  >
                    {category}
                  </motion.span>
                ))}
              </motion.div>

              {/* Rangée de statistiques */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                {BadgeContent.map((el,i) => (
                    <StatBadge key={i} icon={<Leaf className="h-5 w-5" />} value={el.value} label={el.label} />
                ))}
              </div>
            </motion.div>

            {/* Images hero — Sélection de produits emblématiques */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative min-h-[520px] hidden lg:block"
            >
              <div className="absolute left-0 top-0 h-[68%] w-[72%] overflow-hidden rounded-[2rem] border border-gold/20 shadow-2xl shadow-gold/10">
                <img
                  src="https://i.pinimg.com/736x/37/66/06/376606682fcf95caae5b5b9f0951d89d.jpg"
                  alt="Vanille Gourmet de Madagascar"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 h-[50%] w-[55%] overflow-hidden rounded-[2rem] border border-gold/20 shadow-2xl shadow-gold/10">
                <img
                  src="https://i.pinimg.com/736x/e0/4e/a5/e04ea5ea64e7e18f34ee96def986bbfa.jpg"
                  alt="Artisanat malagasy en raphia"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-24 left-8 max-w-xs rounded-[1.5rem] border border-gold/25 bg-black/80 p-6 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-gold">
                  <ShoppingBag className="h-4 w-4" />
                  Sélection Premium
                </div>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Explorez notre diversité : des épices rares aux créations artisanales uniques.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
     

        {/* ══════════════════════════════════════
            FILTRES & PRODUITS
        ══════════════════════════════════════ */}
        <section id="Gammes" className="bg-[#0a0a0a] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
              {/* SIDEBAR FILTRES */}
              <aside className="lg:block">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={smoothFadeIn}
                  className="sticky top-32 space-y-10 rounded-[2rem] border border-gold/15 bg-[#0f0f0f] p-7 shadow-2xl"
                >
                  {/* Recherche */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-4 block">
                      Recherche dynamique
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ex: Vanille, Argan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-gold/20 text-white rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-all placeholder:text-white/20"
                      />
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                    </div>
                  </div>

                  {/* Catégories */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-5 flex items-center gap-2">
                      <Filter size={14} /> Filtrer par catégories
                    </h3>
                    <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
                      {availableCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`text-left text-xs font-bold px-5 py-3.5 rounded-xl transition-all duration-300 border ${
                            activeCategory === cat
                              ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20'
                              : 'bg-white/5 text-white/60 border-white/5 hover:border-gold/30 hover:bg-gold/5'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </aside>

              {/* LISTE PRODUITS */}
              <div className="flex-grow">
                {/* HEADER SECTION MODERNE */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-14 pb-8 border-b border-gold/20 bg-gradient-to-r from-gold/10 via-transparent to-transparent rounded-2xl p-8 space-y-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* COMPTEUR & INFO PRODUITS */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-gold to-[#e0b82d] rounded-full blur-lg opacity-40"></div>
                          <div className="relative bg-gradient-to-r from-gold to-[#e0b82d] rounded-full px-5 py-3 font-extrabold text-black text-xl shadow-lg shadow-gold/30">
                            {filteredProducts.length}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Produit{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
                          </p>
                          {totalPages > 1 && (
                            <p className="text-xs text-white/50">
                              Page <span className="font-bold text-gold">{currentPage}</span> sur <span className="font-bold text-gold">{totalPages}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* TRI MODERNE */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                        <SlidersHorizontal size={16} className="text-gold" />
                        Trier par
                      </div>
                      <div className="relative group">
                        <select
                          title="Trier les produits"
                          className="appearance-none bg-gradient-to-r from-gold/20 to-[#e0b82d]/10 text-white focus:outline-none cursor-pointer border border-gold/40 hover:border-gold/60 py-3 px-4 rounded-xl transition-all duration-300 text-sm font-semibold pr-10 focus:ring-2 focus:ring-gold/20 focus:border-gold"
                        >
                          <option className="bg-[#0f0f0f] text-white">Sélection Diary</option>
                          <option className="bg-[#0f0f0f] text-white">Nouveautés</option>
                          <option className="bg-[#0f0f0f] text-white">Prix croissant</option>
                          <option className="bg-[#0f0f0f] text-white">Prix décroissant</option>
                          <option className="bg-[#0f0f0f] text-white">Avis clients</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gold">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TAGS DE CATÉGORIE ACTIVE */}
                  {activeCategory !== 'Tous' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xs font-semibold text-white/60">Filtre actif :</span>
                      <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 rounded-full px-4 py-2">
                        <span className="text-xs font-bold text-gold">{activeCategory}</span>
                        <button 
                          onClick={() => setActiveCategory('Tous')}
                          className="text-white/60 hover:text-white transition-colors ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {filteredProducts.length > 0 ? (
                  <>
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                    >
                      {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </motion.div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 mt-16 pt-10 border-t border-white/5">
                        <button
                          onClick={() => {
                            setCurrentPage((p) => Math.max(1, p - 1));
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          disabled={currentPage === 1}
                          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border border-white/10 disabled:opacity-20 hover:border-gold hover:text-gold"
                        >
                          Précédent
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPage((p) => Math.min(totalPages, p + 1));
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          disabled={currentPage === totalPages}
                          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border border-white/10 disabled:opacity-20 hover:border-gold hover:text-gold"
                        >
                          Suivant
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/5">
                    <Search size={48} className="mx-auto mb-6 text-white/10" />
                    <h3 className="text-2xl font-bold text-white mb-2">Aucun produit trouvé</h3>
                    <p className="text-white/40 max-w-xs mx-auto text-sm">Ajustez vos filtres ou votre recherche pour découvrir nos trésors.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
    </div>
    </PublicLayout>
  );
};

// Conteneur : récupère les données que le contrôleur Laravel renvoyait
// autrefois via Inertia::render('Catalogue', [...]) — maintenant un simple
// GET JSON sur /api/catalogue.
function CataloguePage() {
  const [state, setState] = useState<CatalogueProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    api.get('/api/catalogue')
      .then(({ data }) => {
        if (!Array.isArray(data.products)) {
          throw new Error('Les données du catalogue sont indisponibles.');
        }
        if (!cancelled) setState(data);
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(getApiErrorMessage(requestError, '/api/catalogue', 'les produits'));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [retry]);

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
          Chargement des produits…
        </div>
      </PublicLayout>
    );
  }

  return <Catalogue {...state} />;
}

export default CataloguePage;
