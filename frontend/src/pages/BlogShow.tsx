"use client";

import { Link } from '../lib/inertia-shim';
import { motion, type Variants } from "framer-motion";
import { 
  ArrowLeft, 
  CalendarDays, 
  Share2, 
  Leaf, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useEffect, useState } from "react";

import PublicLayout from "../components/public-layout";
import type { Article } from "../types/types";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";

interface BlogShowProps {
  article: Article;
  latestArticles?: Article[];
}

const smoothFadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const CATEGORY_COLORS: Record<string, string> = {
  Vanille: "bg-amber-400 text-black",
  Export: "bg-emerald-600 text-white",
  Qualite: "bg-yellow-500 text-black",
  "Cacao & Cafe": "bg-amber-900 text-white",
  Ethique: "bg-green-700 text-white",
  Cosmetique: "bg-rose-600 text-white",
  "Epices": "bg-orange-500 text-white",
};

export function BlogShow({ article, latestArticles = [] }: BlogShowProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const categoryKey = article.category?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ?? "Actualite";
  const badgeClass = CATEGORY_COLORS[categoryKey] ?? "bg-amber-500 text-black";

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#0a0a0a] text-white/90 selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <motion.main initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          
          {/* ════════════ HERO ════════════ */}
          <header className="relative overflow-hidden bg-[linear-gradient(180deg,#1a1100_0%,#0a0a0a_100%)] pt-32 pb-16">
            <div className="relative mx-auto max-w-3xl px-6 text-center">
              <motion.div variants={smoothFadeIn}>
                <Link href="/actualites" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-amber-400 transition-colors">
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                  Retour au Blog
                </Link>
              </motion.div>

              <motion.div variants={smoothFadeIn} className="mt-10 flex items-center justify-center gap-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg ${badgeClass}`}>
                  <Leaf className="h-3 w-3" />
                  {article.category?.name ?? "Actualité"}
                </span>
                <span className="h-4 w-px bg-white/10 rotate-12" />
                <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3 text-amber-500/60" /> {article.published_at}</span>
                </div>
              </motion.div>

              <motion.h1 variants={smoothFadeIn} className="mt-8 text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-6xl text-white">
                {article.title}
              </motion.h1>
            </div>
          </header>

          {/* ════════════ MAIN IMAGE ════════════ */}
          {article.image && (
            <motion.div variants={smoothFadeIn} className="relative mx-auto -mt-10 max-w-5xl px-6">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111] shadow-2xl">
                <img src={article.image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
              </div>
            </motion.div>
          )}

          {/* ════════════ CONTENT ════════════ */}
          <div className="mx-auto max-w-3xl px-6 py-20">
            <motion.article variants={smoothFadeIn} className="prose prose-invert prose-amber max-w-none">
              <div className="text-lg leading-relaxed text-white/70 font-light whitespace-pre-line 
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12
                [&_blockquote]:border-l-amber-500 [&_blockquote]:bg-white/5 [&_blockquote]:py-4 [&_blockquote]:rounded-r-xl">
                {article.content ?? "Contenu en cours de rédaction..."}
              </div>
            </motion.article>

            {/* Author & Share */}
            <motion.footer variants={smoothFadeIn} className="mt-16 flex items-center justify-between border-t border-white/10 pt-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-xl font-black text-black">
                  {article.author?.[0] ?? "D"}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Rédigé par</p>
                  <p className="text-base font-bold text-white">{article.author ?? "Équipe Diary"}</p>
                </div>
              </div>
              <button onClick={() => navigator.share?.({ title: article.title, url: window.location.href })} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-amber-400 hover:border-amber-400 transition-all">
                <Share2 className="h-5 w-5" />
              </button>
            </motion.footer>
          </div>

          {/* ════════════ NEW FOOTER SECTIONS (A Propos & Recents) ════════════ */}
          <div className="bg-[#0e0e0e] border-t border-white/5 mt-10">
            <div className="mx-auto max-w-7xl px-6 py-20">
              
              <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
                
                {/* 1. A Propos (Left) */}
                <motion.div variants={smoothFadeIn} className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-amber-500">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">L'excellence Diary</h3>
                  </div>
                  <p className="text-sm leading-7 text-white/50 max-w-sm">
                    En tant qu'experts de l'exportation malagasy, nous partageons nos analyses sur les filières vanille, cacao et épices. Notre mission : connecter le terroir de Madagascar au marché mondial.
                  </p>
                  <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 px-6 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500 hover:text-black transition-all">
                    Explorer notre catalogue <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>

                {/* 2. Articles Récents (Right) */}
                <motion.div variants={smoothFadeIn} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/30">Poursuivre la lecture</h3>
                    <Link href="/actualites" className="text-[10px] font-bold uppercase tracking-widest text-amber-500/60 hover:text-amber-400 underline underline-offset-4">Voir tout</Link>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {latestArticles.slice(0, 2).map((item) => (
                      <Link key={item.id} href={`/actualites/${item.slug}`} className="group flex flex-col gap-4 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                        {item.image && (
                          <div className="aspect-video overflow-hidden rounded-2xl">
                            <img
                              src={item.image}
                              className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                              alt={item.title}
                            />
                          </div>
                        )}
                        <div>
                          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{item.category?.name}</span>
                          <h4 className="mt-1 text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">{item.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

        </motion.main>
      </div>
    </PublicLayout>
  );
}

// Conteneur : lit le slug dans l'URL (/actualites/:slug) et récupère
// l'article sur GET /api/actualites/{slug}.
export default function BlogShowPage() {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<BlogShowProps | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState(null);
    setNotFound(false);
    api
      .get(`/api/actualites/${slug}`)
      .then(({ data }) => {
        if (!cancelled) setState(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (notFound) {
    return (
      <PublicLayout>
        <div className="py-32 text-center text-white/60">Article introuvable.</div>
      </PublicLayout>
    );
  }

  if (!state) return null;

  return <BlogShow {...state} />;
}