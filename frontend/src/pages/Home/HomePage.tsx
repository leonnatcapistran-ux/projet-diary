import { Link } from '../../lib/inertia-shim';
import { motion } from "motion/react";
import ProductCard from "../../components/ProductCard";
import type { Product } from "../../types/types";
import AboutSection from "./about"
import Engagement from "./engagement";
import Hero from "./HeroSection";

interface HomePageProduct {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price?: number | null;
  origin?: string;
  category?: string;
  poids_unitaire_kg?: number;
}

interface HomePageArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  published_at?: string;
  slug?: string;
}

interface HomeTestimonial {
  name: string;
  role: string;
  text: string;
}

interface HomePageProps {
  featuredProducts?: HomePageProduct[];
  recentArticles?: HomePageArticle[];
  testimonials?: HomeTestimonial[];
}

export default function HomePage({
  featuredProducts: _featuredProducts = [],
  recentArticles: _recentArticles = [],
  testimonials: _testimonials = [],
}: HomePageProps) {
  type BlogCard = {
    tag: string;
    date: string;
    title: string;
    desc: string;
    img: string;
    slug?: string;
  };

  const featuredProducts: Product[] = _featuredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description || 'Produit de qualité',
    price: product.price ?? null,
    poids_unitaire_kg: product.poids_unitaire_kg,
    origin: (product.origin ?? 'Madagascar') as 'Madagascar' | 'Maroc',
    category: product.category || 'Produit',
    image: product.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
  }));
  const testimonials = _testimonials;

  const blogArticles: BlogCard[] = _recentArticles.length
    ? _recentArticles.map((article) => ({
        tag: 'Actu',
        date: article.published_at ?? 'À découvrir',
        title: article.title,
        desc: article.excerpt ?? '',
        img: article.image || 'https://i.pinimg.com/736x/90/45/4a/90454ae3e8732f0579efee6c1e4d47b8.jpg',
        slug: article.slug,
      }))
    : [
        {
          tag: 'Récolte',
          date: 'Mars 2025',
          title: 'La saison de la vanille Bourbon bat son plein',
          desc: "Retour sur la récolte 2025 dans la région SAVA : des conditions climatiques favorables et des gousses d'une qualité exceptionnelle.",
          img: 'https://i.pinimg.com/736x/90/45/4a/90454ae3e8732f0579efee6c1e4d47b8.jpg',
        },
        {
          tag: 'Artisanat',
          date: 'Fév. 2025',
          title: 'Nouvelle collection : paniers et textiles du Nord',
          desc: "Nos artisans partenaires lancent une nouvelle gamme de créations à base de raphia et de soie sauvage malagasy.",
          img: 'https://i.pinimg.com/1200x/0c/79/7e/0c797e8b31e50e26e9f5ceb558aa6078.jpg',
        },
        {
          tag: 'Engagement',
          date: 'Jan. 2025',
          title: 'Certification bio : un nouveau cap pour Diary Madagascar',
          desc: 'Nous renforçons nos standards qualité et nos process durables pour un commerce équitable et responsable.',
          img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
        },
      ];

  return (
    <div className="font-sans bg-black min-h-screen scroll-smooth">
      <Hero />
      <AboutSection />

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-black border-t border-[#c4a84f]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* HEADER */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              {/* Gauche */}
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[2px] bg-[#c4a84f]"></div>
                  <span className="text-[#7a5c00] text-xs font-semibold tracking-[0.2em] uppercase">
                    Nos produits
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
                  Sélection Export: Le Meilleur des Produits de Madagascar
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Découvrez la sélection exclusive de DIARY MADAGASCAR: une gamme de produits
                  du terroir sourcés directement en circuit court. De nos épices premium (Vanille Bourbon, Girofle, Poivres) et légumineuses (Haricots, Pois de Cap)
                  à notre artisanat d'art en Raphia et corne de zébu, nous garantissons une traçabilité totale pour l'exportation et le marché local.
                </p>
              </div>

              {/* Droite */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Badges catégories */}
                <div className="flex flex-wrap gap-2">
                    <span
                      className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#f0d980] bg-white/5 font-medium"
                    >
                      Nos derniers produits
                    </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0"
                >
                  <Link
                    href="/catalogue"
                    className="bg-[#1a0e00] text-[#f0d980] font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#2e1a00] transition-colors whitespace-nowrap flex items-center gap-2 border border-[#c4a84f]"
                  >
                    Voir tous les produits
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Séparateur */}
            <div className="mt-8 h-px bg-gradient-to-r from-[#c4a84f]/40 via-white/10 to-transparent" />
          </div>

          {/* GRID */}
          {featuredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-white/70">
              Aucun produit disponible pour le moment. Toutes les fiches affichées doivent provenir directement du catalogue backend.
            </div>
          )}
        </div>
      </section>
      {testimonials.length > 0 && (
        <section className="py-20 bg-[#0a0a0a] border-t border-[#c4a84f]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-12 text-center">
              <span className="text-gold/80 text-xl uppercase tracking-[0.2em]">
                Avis publiés
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
                Ce que nos clients publient après modération
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
                Tous les témoignages présentés ici ont été validés par notre équipe back-office.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/90"
                >
                  <p className="text-sm leading-relaxed text-white/75">“{testimonial.text}”</p>
                  <div className="mt-6">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#c4a84f]/80">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Engagement />
      {/* BLOG SECTION */}
      <section className="py-20 bg-black border-t border-[#c4a84f]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#c4a84f]"></div>
                <span className="text-[#7a5c00] text-xs font-semibold tracking-[0.2em] uppercase">
                  Actualités & Blog
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Actualités et Vie du Terroir: L'Aventure{" "}
                <span className="text-[#c4a84f]"> Diary Madagascar.</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Des périodes de récoltes à la création de nos nouvelles
                collections artisanales en raphia, suivez les coulisses de notre savoir-faire.
                Découvrez nos actualités sur l'exportation et nos engagements pour valoriser
                les trésors de Madagascar, disponibles pour le marché local et international.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0"
            >
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 bg-[#1a0e00] text-[#f0d980] font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#2e1a00] transition-colors border border-[#c4a84f]"
              >
                Voir tous les articles
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          <div className="h-px bg-gradient-to-r from-[#c4a84f]/40 via-white/10 to-transparent mb-12" />

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.map((post) => (
              <motion.div
                key={post.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-sm group cursor-pointer"
              >
                {post.slug ? (
                  <Link href={`/actualites/${post.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-[#1a0e00] text-[#f0d980] text-xs font-semibold px-3 py-1 rounded-full border border-[#c4a84f]/40">
                        {post.tag}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[#c4a84f] text-xs font-medium mb-2">
                        {post.date}
                      </p>
                      <h3 className="text-white font-bold text-base leading-snug mb-2">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-xs leading-relaxed mb-4">
                        {post.desc}
                      </p>
                      <div className="flex items-center gap-1 text-[#7a5c00] text-xs font-semibold">
                        Lire l'article
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-[#1a0e00] text-[#f0d980] text-xs font-semibold px-3 py-1 rounded-full border border-[#c4a84f]/40">
                        {post.tag}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[#c4a84f] text-xs font-medium mb-2">
                        {post.date}
                      </p>
                      <h3 className="text-white font-bold text-base leading-snug mb-2">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-xs leading-relaxed mb-4">
                        {post.desc}
                      </p>
                      <div className="flex items-center gap-1 text-[#7a5c00] text-xs font-semibold">
                        Lire l'article
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(transparent,black), url('https://i.pinimg.com/1200x/48/6e/11/486e11d60b53edb7d87e193bd61285fc.jpg')",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f0d980] mb-3">
            Restons en Contact.
          </h2>
          <p className="text-white/80 text-sm mb-8">
            Vous avez une question sur nos produits, une demande de devis
            spécifique ou un projet d'exportation ? Notre équipe est à votre
            écoute pour vous accompagner. Que vous soyez un acheteur
            international ou un client local, nous nous engageons à vous
            répondre dans les plus brefs délais.
          </p>
          <div className=" max-w-md mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#f0d980] text-[#1a0e00] font-semibold px-6 py-3 rounded-full hover:bg-[#e8cc6a] transition-colors whitespace-nowrap"
            >
              <a href='/nous-contacter'>

              Nous contacter
              </a>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
