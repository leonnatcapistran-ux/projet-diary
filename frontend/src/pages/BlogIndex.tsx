'use client';

import { Link } from '../lib/inertia-shim';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CalendarDays,
    Facebook,
    Instagram,
    Linkedin,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import PublicLayout from '../components/public-layout';
import type { Article } from '../types/types';
import BlogHero from './BlogHero';
import { api } from '../lib/api';

type BlogIndexProps = {
    articles: {
        data: Article[];
        current_page: number;
        last_page: number;
    };
};

export type BlogCardArticle = Article & {
    categoryLabel: string;
    formattedDate: string;
};

type ArticleFilterValue = 'all' | 'latest' | `category:${string}`;

const smoothFadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200';

const SOCIAL_CARDS = [
    {
        name: 'Facebook',
        cta: 'Suivre ici',
        href: 'https://www.facebook.com/share/18pRC4TqKB/',
        icon: Facebook,
        preview:
            'https://images.pexels.com/photos/479358/pexels-photo-479358.jpeg',
        description:
            'Retrouvez nos annonces, arrivages et temps forts de la communauté Diary Madagascar.',
    },
    {
        name: 'Instagram',
        cta: 'Voir plus',
        href: 'https://www.instagram.com/diarymadagascar?igsh=dG84ejNoaHNlOWN2',
        icon: Instagram,
        preview:
            'https://images.pexels.com/photos/5053767/pexels-photo-5053767.jpeg',
        description:
            'Explorez nos coulisses en images, entre terroirs, artisanat et inspirations malagasy.',
    },
    {
        name: 'LinkedIn',
        cta: 'Voir plus',
        href: 'https://www.linkedin.com',
        icon: Linkedin,
        preview:
            'https://i.pinimg.com/736x/6e/71/53/6e7153e204544638a23bac968eda4298.jpg',
        description:
            "Découvrez notre réseau professionnel, nos engagements et les projets portés par l'équipe.",
    },
];

export const formatArticle = (article: Article): BlogCardArticle => {
    const date = article.published_at
        ? new Intl.DateTimeFormat('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          }).format(new Date(article.published_at))
        : 'Bientôt';

    return {
        ...article,
        categoryLabel: article.category?.name ?? 'Actualité',
        formattedDate: date,
    };
};

function sortArticlesByPublicationDate(
    articles: BlogCardArticle[],
): BlogCardArticle[] {
    return [...articles].sort((firstArticle, secondArticle) => {
        const firstTimestamp = firstArticle.published_at
            ? new Date(firstArticle.published_at).getTime()
            : 0;
        const secondTimestamp = secondArticle.published_at
            ? new Date(secondArticle.published_at).getTime()
            : 0;

        return secondTimestamp - firstTimestamp;
    });
}

function getArticleFilterHeading(filter: ArticleFilterValue): string {
    if (filter === 'all') {
        return 'Nos publications';
    }

    if (filter === 'latest') {
        return 'Nos dernières publications';
    }

    return filter.replace('category:', '');
}

function filterArticles(
    articles: BlogCardArticle[],
    filter: ArticleFilterValue,
): BlogCardArticle[] {
    if (filter === 'all') {
        return articles;
    }

    if (filter === 'latest') {
        return sortArticlesByPublicationDate(articles);
    }

    const selectedCategory = filter.replace('category:', '');

    return articles.filter(
        (article) => article.categoryLabel === selectedCategory,
    );
}

const BlogCard = ({ article }: { article: BlogCardArticle; index: number }) => {
    return (
        <article className="flex h-full w-full max-w-full flex-col overflow-hidden rounded-lg bg-[#0f1215] font-serif text-white shadow-[0_2px_20px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            <div className="relative h-[200px] w-full overflow-hidden">
                <motion.img
                    src={article.image || FALLBACK_IMAGE}
                    alt={article.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
            </div>

            <div className="flex grow flex-col gap-2.5 px-5 pt-5 pb-6 sm:px-6">
                <span className="flex items-center gap-1 text-amber-300">
                    <CalendarDays className="h-3 w-3" /> {article.formattedDate}
                </span>

                <h2 className="m-0 font-serif text-[17px] leading-[1.35] font-bold text-amber-200">
                    {article.title}
                </h2>

                <div className="h-[2px] w-10 rounded bg-amber-400" />

                <p className="m-0 grow font-sans text-[13.5px] leading-[1.6] text-[#d8d2b7]">
                    {article.excerpt ||
                        "Découvrez notre expertise sur l'exportation des produits d'exception de Madagascar."}
                </p>

                <Link href={`/actualites/${article.slug}`}>
                    <button className="mt-2 flex items-center gap-3 self-start border-b border-gold bg-transparent px-4 py-2.5 font-sans text-[11px] font-bold tracking-[0.18em] text-amber-100 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:text-amber-200 sm:px-5 sm:text-[12px]">
                        En Savoir Plus <ArrowRight className="h-3 w-3" />
                    </button>
                </Link>
            </div>
        </article>
    );
};

export function BlogPage({ articles }: BlogIndexProps) {
    const formattedArticles = articles.data.map(formatArticle);
    const featuredArticle = formattedArticles[0] ?? null;
    const otherArticles = formattedArticles.slice(1);
    const availableCategories = Array.from(
        new Set(otherArticles.map((article) => article.categoryLabel)),
    );
    const [activeFilter, setActiveFilter] =
        useState<ArticleFilterValue>('latest');
    const filteredArticles = filterArticles(otherArticles, activeFilter);
    const sectionTitle = getArticleFilterHeading(activeFilter);
    const sortedArchives = sortArticlesByPublicationDate(formattedArticles);
    const visibleArchives = sortedArchives.slice(0, 4);

    const filterButtons: Array<{ value: ArticleFilterValue; label: string }> = [
        { value: 'latest', label: 'Date de publication' },
        { value: 'all', label: 'Toutes les publications' },
        ...availableCategories.map((category) => ({
            value: `category:${category}` as ArticleFilterValue,
            label: category,
        })),
    ];

    return (
        <PublicLayout>
            <div className="min-h-screen bg-[#0a0a0a]">
                <motion.main
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0a0a0a_0%,#1c1000_50%,#2d1a00_100%)] pt-24 text-white sm:pt-28">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute top-8 left-[-6rem] h-72 w-72 rounded-full bg-amber-500/10 blur-[80px]" />
                            <div className="absolute top-16 right-[-5rem] h-96 w-96 rounded-full bg-yellow-600/10 blur-[100px]" />
                        </div>

                        <div className="relative mx-auto max-w-7xl px-4 pb-0 sm:px-6">
                            <motion.div
                                variants={smoothFadeIn}
                                className="pb-16"
                            >
                                <h1 className="max-w-4xl text-3xl leading-[1.08] font-extrabold sm:text-4xl lg:text-5xl">
                                    <span className="text-white">
                                        L'Actualité de{' '}
                                    </span>
                                    <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                                        DIARY MADAGASCAR:
                                    </span>
                                    <span className="text-white">
                                        {' '}
                                        Au Cœur du Terroir et de l'Artisanat
                                    </span>
                                </h1>
                                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                                    Plongez dans les coulisses de l'exportation
                                    des trésors naturels de Madagascar vers les
                                    marchés mondiaux.
                                </p>
                                <div>
                                    <BlogHero
                                        feature={featuredArticle}
                                        formattedArticles={formattedArticles}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="bg-black/20 py-8">
                            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={smoothFadeIn}
                                    className="text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">
                                        <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                                            Vous souhaitez en savoir plus sur un
                                            lot spécifique ou une technique
                                            artisanale?
                                        </p>
                                        <motion.div
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Link
                                                href="/nous-contacter"
                                                className="inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                            >
                                                Nous contacter
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    <section className="px-4 py-16 sm:px-6 sm:py-20">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-12 flex flex-col gap-5 border-b border-white/5 pb-8 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
                                        Analyses & Expertise
                                    </p>
                                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                                        {sectionTitle}
                                    </h2>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pb-2 sm:flex-row sm:justify-end sm:gap-3 sm:pb-0">
                                    {filterButtons.map((filterButton) => (
                                        <button
                                            key={filterButton.value}
                                            type="button"
                                            onClick={() =>
                                                setActiveFilter(
                                                    filterButton.value,
                                                )
                                            }
                                            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] transition sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em] sm:uppercase ${
                                                activeFilter ===
                                                filterButton.value
                                                    ? 'border-gold bg-gold text-black'
                                                    : 'border-white/10 bg-white/5 text-white hover:border-gold/50 hover:text-gold'
                                            }`}
                                        >
                                            {filterButton.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredArticles.length > 0 ? (
                                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredArticles.map((article, index) => (
                                        <BlogCard
                                            key={article.id}
                                            article={article}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 text-center text-white/40 italic sm:p-20">
                                    Aucune publication ne correspond à ce filtre
                                    pour le moment.
                                </div>
                            )}

                            {articles.last_page > 1 && (
                                <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:mt-20 sm:flex-row sm:gap-6">
                                    <Link
                                        href={`/actualites?page=${Math.max(1, articles.current_page - 1)}`}
                                        className={`w-full rounded-full border border-white/10 px-6 py-3 text-center text-[10px] font-black tracking-widest text-white uppercase transition hover:border-amber-500 sm:w-auto sm:px-8 ${articles.current_page <= 1 ? 'pointer-events-none opacity-20' : ''}`}
                                    >
                                        Précédent
                                    </Link>
                                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                        Page {articles.current_page} /{' '}
                                        {articles.last_page}
                                    </span>
                                    <Link
                                        href={`/actualites?page=${Math.min(articles.last_page, articles.current_page + 1)}`}
                                        className={`w-full rounded-full border border-white/10 px-6 py-3 text-center text-[10px] font-black tracking-widest text-white uppercase transition hover:border-amber-500 sm:w-auto sm:px-8 ${articles.current_page >= articles.last_page ? 'pointer-events-none opacity-20' : ''}`}
                                    >
                                        Suivant
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="px-4 pb-16 sm:px-6">
                        <div className="mx-auto max-w-7xl overflow-hidden">
                            <div className="border-b border-amber-500/10 px-4 py-5 sm:px-8 lg:px-14">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={smoothFadeIn}
                                    className="text-center"
                                >
                                    <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
                                        Analyses & Archives Thématiques
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-white/65">
                                        Retrouvez les sujets de fond, les
                                        archives et les thématiques dédiés à la
                                        découverte de notre terroir et de notre
                                        artisanat local.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={containerVariants}
                                    className="mt-10 grid gap-3"
                                >
                                    {visibleArchives.length > 0 ? (
                                        <>
                                            {visibleArchives.map((entry) => (
                                                <motion.div
                                                    key={entry.id}
                                                    variants={smoothFadeIn}
                                                    className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4 transition hover:border-amber-400/30 hover:bg-amber-400/[0.06] md:flex-row md:items-center md:gap-4 md:px-5"
                                                >
                                                    <Link
                                                        href={`/actualites/${entry.slug}`}
                                                        className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4"
                                                    >
                                                        <span className="shrink-0 text-sm font-extrabold text-amber-300 md:min-w-[150px]">
                                                            {
                                                                entry.formattedDate
                                                            }
                                                        </span>
                                                        <span className="hidden text-white/25 md:block">
                                                            |
                                                        </span>
                                                        <p className="text-sm leading-6 font-medium text-white/82">
                                                            {entry.title}
                                                        </p>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-white/40">
                                            Aucune publication pour le moment.
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            <div className="px-4 py-14 sm:px-8 lg:px-14">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={smoothFadeIn}
                                    className="text-center"
                                >
                                    <h2 className="mt-5 text-3xl font-extrabold text-white uppercase sm:text-4xl">
                                        Suivez-nous sur nos réseaux sociaux
                                    </h2>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={containerVariants}
                                    className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                                >
                                    {SOCIAL_CARDS.map((social) => {
                                        const Icon = social.icon;

                                        return (
                                            <motion.article
                                                key={social.name}
                                                variants={smoothFadeIn}
                                                whileHover={{
                                                    y: -2,
                                                    transition: {
                                                        duration: 0.25,
                                                        ease: 'easeOut',
                                                    },
                                                }}
                                                className="group relative flex h-full flex-col overflow-hidden rounded-xl"
                                                style={{
                                                    background:
                                                        'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                                                    border: '1px solid rgba(255,255,255,0.10)',
                                                    boxShadow:
                                                        '0 0 0 1px rgba(0,0,0,0.2), 0 24px 60px rgba(0,0,0,0.35)',
                                                }}
                                            >
                                                <div
                                                    aria-hidden
                                                    className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                                    style={{
                                                        background:
                                                            'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
                                                        filter: 'blur(1px)',
                                                    }}
                                                />

                                                <div className="relative h-[220px] overflow-hidden">
                                                    <img
                                                        src={social.preview}
                                                        alt={social.name}
                                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background:
                                                                'linear-gradient(to bottom, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.72) 100%)',
                                                        }}
                                                    />
                                                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                                        <span
                                                            className="flex h-8 w-8 items-center justify-center rounded-xl text-amber-300"
                                                            style={{
                                                                background:
                                                                    'rgba(0,0,0,0.55)',
                                                                border: '1px solid rgba(251,191,36,0.25)',
                                                                backdropFilter:
                                                                    'blur(6px)',
                                                            }}
                                                        >
                                                            <Icon className="h-4 w-4" />
                                                        </span>
                                                        <span
                                                            className="text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase"
                                                            style={{
                                                                textShadow:
                                                                    '0 1px 4px rgba(0,0,0,0.6)',
                                                            }}
                                                        >
                                                            {social.name}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 flex-col px-5 py-5">
                                                    <div className="mb-3 flex items-start justify-between gap-3">
                                                        <h3 className="text-lg leading-snug font-extrabold text-white">
                                                            {social.name}
                                                        </h3>
                                                    </div>

                                                    <p className="text-sm leading-6 text-white/65">
                                                        {social.description}
                                                    </p>

                                                    <div className="my-4 h-px w-full bg-white/8" />

                                                    <a
                                                        href={social.href}
                                                        className="mt-auto inline-flex items-center gap-3 self-start border-b border-gold bg-transparent px-4 py-2.5 font-sans text-[11px] font-bold tracking-[0.18em] text-amber-100 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:text-amber-200 sm:px-5 sm:text-[12px]"
                                                    >
                                                        {social.cta}{' '}
                                                        <ArrowRight className="h-3 w-3" />
                                                    </a>
                                                </div>
                                            </motion.article>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </motion.main>
            </div>
        </PublicLayout>
    );
}

// Conteneur : récupère la liste paginée d'articles sur GET /api/actualites
// (autrefois injectée par Inertia::render('BlogIndex', ['articles' => ...])).
export default function BlogIndexPage() {
    const [articles, setArticles] = useState<BlogIndexProps['articles'] | null>(null);

    useEffect(() => {
        let cancelled = false;
        api.get('/api/actualites').then(({ data }) => {
            if (!cancelled) setArticles(data.articles ?? data);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    if (!articles) return null; // ou un skeleton

    return <BlogPage articles={articles} />;
}
