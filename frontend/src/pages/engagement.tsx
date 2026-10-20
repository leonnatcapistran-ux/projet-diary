'use client';

import { Link } from '../lib/inertia-shim';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    ShieldCheck,
    Users,
    Leaf,
    Sparkles,
    MapPinned,
} from 'lucide-react';
import PublicLayout from '@/components/public-layout';

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS (réutilisées de About)
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
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: easeSmooth },
    },
};

const STATS = [
    {
        value: 'Qualité Export Supérieure',
        label: "Un suivi rigoureux pour garantir l'excellence de nos produits sur tous les marchés.",
    },
    {
        value: 'Engagement Commerce Équitable',
        label: 'Un partenariat direct et juste avec nos producteurs pour un développement durable.',
    },
    {
        value: 'Responsabilité Sociale & Éthique',
        label: 'Un engagement concret pour valoriser le travail de nos artisans et agriculteurs locaux.',
    },
    {
        value: 'Maîtrise de la Logistique',
        label: 'Une gestion optimisée des flux pour garantir une expédition sécurisée de vos marchandises.',
    },
];

/* ─────────────────────────────────────────────
   DATA - ENGAGEMENTS
───────────────────────────────────────────── */
const ENGAGEMENTS = [
    {
        id: 1,
        icon: ShieldCheck,
        title: 'Maîtrise de la Source',
        text: "Suivi intégral du terroir de récolte ou de l'atelier de conception jusqu'à l'acheminement final.",
    },
    {
        id: 2,
        icon: Award,
        title: 'Rigueur Opérationnelle',
        text: ' Contrôles stricts pour garantir une pureté et une finition irréprochables de chaque lot.',
    },
    {
        id: 3,
        icon: MapPinned,
        title: "Standard d'Excellence Global",
        text: "Application de critères de qualité uniformes pour la distribution à Madagascar et l'exportation internationale.",
    },
    {
        id: 4,
        icon: Users,
        title: 'Fluidité des Échanges',
        text: 'Partenariats durables basés sur la transparence et une gestion sécurisée de la chaîne logistique.',
    },
];

export default function EngagementsPage() {
    return (
        <PublicLayout>
            <div className="min-h-screen bg-[#0a0a0a] text-white">
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1 } }}
                >
                    {/* HERO */}
                    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1200_55%,#2a1e00_100%)] pt-28">
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-10 left-[-6rem] h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
                            <div className="absolute top-24 right-[-4rem] h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
                            <div className="absolute bottom-[-5rem] left-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
                        </div>

                        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={smoothFadeIn}
                                className="max-w-2xl"
                            >
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-gold uppercase">
                                    <Sparkles className="h-4 w-4" />
                                    Rigueur et Conformité Export
                                </div>

                                <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
                                    Un Engagement Total pour{' '}
                                    <span className="text-gold">
                                        l’Authenticité de Madagascar
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                                    <span className="font-semibold text-gold">
                                        DIARY MADAGASCAR{' '}
                                    </span>
                                    place l'intégrité au cœur de ses échanges.
                                    Nous garantissons la pleine conformité de
                                    nos filières agricoles et artisanales aux
                                    exigences de nos partenaires, du sourcing
                                    local jusqu'au marché mondial
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href="/nous-contacter"
                                            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                        >
                                            Demander un Devis
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{
                                            backgroundColor:
                                                'rgba(201,162,39,0.12)',
                                        }}
                                        className="rounded-full"
                                    >
                                        <Link
                                            href="/a-propos"
                                            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60"
                                        >
                                            Découvrir Diary
                                        </Link>
                                    </motion.div>
                                </div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
                                >
                                    {STATS.map((stat) => (
                                        <motion.div
                                            variants={smoothFadeIn}
                                            whileHover={{
                                                y: -5,
                                                backgroundColor:
                                                    'rgba(201,162,39,0.12)',
                                            }}
                                            key={stat.label}
                                            className="flex flex-col items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 px-2 py-5 text-center backdrop-blur-sm transition-colors"
                                        >
                                            <div className="flex flex-1 items-end justify-center">
                                                <div className="text-lg font-extrabold text-gold">
                                                    {stat.value}
                                                </div>
                                            </div>
                                            <div className="my-2 w-10 border-t-2 border-gold/50" />
                                            <div className="flex flex-1 items-start justify-center">
                                                <div className="mt-1 text-xs leading-tight tracking-wider text-white/65">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Images hero — paysans cultivant la vanille */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative hidden min-h-[520px] lg:block"
                            >
                                <div className="absolute top-0 left-0 h-[68%] w-[72%] overflow-hidden rounded-[2rem] border border-gold/20 shadow-2xl shadow-gold/10">
                                    <img
                                        src="https://i.pinimg.com/736x/a5/85/65/a58565fa7bbd5ec278b1dcb452b12316.jpg"
                                        alt="Agriculteur malagasy récoltant la vanille"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                                <div className="absolute right-0 bottom-0 h-[50%] w-[55%] overflow-hidden rounded-[2rem] border border-gold/20 shadow-2xl shadow-gold/10">
                                    <img
                                        src="https://i.pinimg.com/736x/42/59/9b/42599b7d7d37bed65c7b4e58109a6b35.jpg"    
                                        alt="Plantation de vanille à Madagascar région SAVA"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* INTRODUCTION */}
                    <section className="bg-[#0f0f0f] py-16">
                        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={smoothFadeIn}
                                className="text-center"
                            >
                                <p className="text-lg leading-relaxed text-white/80">
                                    Notre rigueur opérationnelle guide chacune
                                    de nos actions, de la source jusqu'à vous.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* LISTE DES ENGAGEMENTS */}
                    <section className="bg-[#0a0a0a] py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid gap-6 lg:gap-8"
                            >
                                {ENGAGEMENTS.map((engagement, index) => (
                                    <motion.article
                                        key={engagement.id}
                                        variants={cardVariants}
                                        whileHover={{
                                            y: -8,
                                            transition: { duration: 0.4 },
                                        }}
                                        className="group rounded-3xl border border-gold/15 bg-[#0f0f0f] p-8 shadow-xl transition-all hover:border-gold/40 md:p-10"
                                    >
                                        <div className="flex flex-col gap-8 md:flex-row">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gold text-black transition-transform group-hover:scale-110">
                                                    <engagement.icon className="h-10 w-10" />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <div className="inline-flex items-center gap-3">
                                                    <span className="text-2xl font-bold text-gold">
                                                        {String(
                                                            index + 1,
                                                        ).padStart(2, '0')}
                                                    </span>
                                                    <h3 className="text-2xl font-extrabold text-white">
                                                        {engagement.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-6 text-[15.5px] leading-relaxed text-white/75">
                                                    {engagement.text}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    {/* SECTION ENGAGEMENT FINAL - SÉPARÉE */}
                    <section className="bg-[#0f0f0f] py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={smoothFadeIn}
                                >
                                    <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-semibold tracking-wider text-gold uppercase">
                                        <Leaf className="h-4 w-4" />
                                        Éthique • Qualité • Responsabilité
                                    </div>

                                    <h2 className="mt-8 text-3xl leading-tight font-extrabold text-white sm:text-4xl md:text-5xl">
                                        Valoriser le{' '}
                                        <span className="text-gold">
                                            Terroir Malagasy,
                                        </span>{' '}
                                        de la Récolte à la Création
                                    </h2>
                                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                                        Une démarche{' '}
                                        <span className="font-semibold text-gold">
                                            authentique
                                        </span>{' '}
                                        unissant la richesse de nos terres et le
                                        talent de nos artisans pour une{' '}
                                        <span className="font-semibold text-gold">
                                            {' '}
                                            qualité d'exception
                                        </span>
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative h-[450px] overflow-hidden rounded-[3rem] border border-gold/20 shadow-2xl"
                                >
                                    <img
                                        src="https://i.pinimg.com/736x/9c/f9/ba/9cf9bae91b35c74cefa17589b4e9a1da.jpg"
                                        alt="Vanille de Madagascar - Qualité et traçabilité"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* CTA FINAL */}
                    <section className="bg-[#0f0f0f] py-20">
                        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-extrabold sm:text-4xl">
                                    Initiez votre partenariat avec{' '}
                                    <span className="text-gold">
                                        DIARY MADAGASCAR
                                    </span>{' '}
                                    dès aujourd'hui
                                </h2>
                                <p className="mt-4 text-white/70">
                                    Exportation ou distribution locale : notre
                                    expertise répond à vos plus hautes exigences
                                </p>

                                <div className="mt-12">
                                    <Link
                                        href="/nous-contacter"
                                        className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-base font-semibold text-black shadow-lg shadow-gold/10 transition hover:bg-[#e0b82d]"
                                    >
                                        Demander un devis personnalisé
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </motion.main>
            </div>
        </PublicLayout>
    );
}
