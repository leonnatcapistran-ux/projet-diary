'use client';

import { Link } from '../lib/inertia-shim';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Globe,
    HeartHandshake,
    MapPinned,
    ShieldCheck,
    Leaf,
    Sparkles,
    Star,
    Users,
    Package,
} from 'lucide-react';
import PublicLayout from '@/components/public-layout';
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const STATS = [
    {
        value: 'Sourcing Direct Madagascar',
        label: 'Un approvisionnement sans intermédiaire au plus près des zones de production',
    },
    {
        value: "18 Produits d'Exportation",
        label: 'Un catalogue complet de 10 références agricoles et 8 créations artisanales de qualité',
    },
    {
        value: 'Circuit Court & Éthique',
        label: 'Une relation de confiance avec les paysans malagasy pour une valeur ajoutée partagée',
    },
    {
        value: 'Agriculture & Artisanat Local',
        label: 'La valorisaiton du savoir-faire des paysans et des artisans malagasy sur la scène mondiale.',
    },
];

const VALUES = [
    {
        icon: HeartHandshake,
        title: 'Commerce Équitable',
        text: '',
    },
    {
        icon: ShieldCheck,
        title: 'Origine Contrôlée',
        text: '',
    },
    {
        icon: Globe,
        title: 'Engagement Durable',
        text: '',
    },
];

const PRODUCTS = [
    {
        icon: Leaf,
        title: 'Filières Agricoles Terroir',
        text: 'Sélection rigoureuse et conditionnement de produits de rente (Vanille, Café, Épices) et légumineuses (Haricots, Pois du Cap) triés manuellement pour une pureté optimale',
    },
    {
        icon: Package,
        title: "Atelier Artisanat d'Art",
        text: "Conception et exportation d'accessoires de mode et de décoration (Sacs, chapeaux en Raphia, objets en Corne) valorisant l'artisanat malagasy fait-main.",
    },
    {
        icon: Sparkles,
        title: 'Standards de Distribution',
        text: "Fourniture d'une gamme premium pour la consommation locale et les réseaux de distribution spécialisés, garantissant le meilleur de Madagascar à chaque client.",
    },
    {
        icon: Globe,
        title: 'Expertise Logistique & Export',
        text: "Maîtrise complète des procédures d'expédition internationale pour garantir la sécurité et la fraîcheur optimale de vos marchandises jusqu'à destination.",
    },
];

const STEPS = [
    {
        id: '01',
        title: 'Sourcing de Proximité',
        text: 'Nous identifions les meilleures zones de culture et de création pour collecter des matières premières brutes et authentiques, sans intermédiaire',
    },
    {
        id: '02',
        title: 'Transformation & Conformité',
        text: 'Chaque lot subit un protocole de tri manuel et de contrôle qualité rigoureux, garantissant le respect des exigences phytosanitaires mondiales.',
    },
    {
        id: '03',
        title: 'Flux Logistique & Douane',
        text: "Nous assurons un conditionnement à l'export spécifique et une gestion administrative complète des formalités douanières pour une expédition fluide vers toutes les destinations.",
    },
];

// Gammes

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

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.93, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { delay: i * 0.13 + 0.15, duration: 0.7, ease: easeSmooth },
    }),
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.11, duration: 0.65, ease: easeSmooth },
    }),
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function AboutPage() {
    return (
        <PublicLayout>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
            >
                {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
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
                                DIARY MADAGASCAR:
                            </div>
                            <h1 className="text-4xl leading-tight font-bold text-white/60 sm:text-5xl lg:text-6xl">
                                Valorisation du Terroir
                                <span className="text-gold">
                                    {' '}
                                    Agricole et de l'Artisanat.
                                </span>
                            </h1>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                                DIARY MADAGASCAR est une société malagasy dédiée
                                à la collecte et à la distribution de ressources
                                naturelles de haute qualité. Forte d'un sourcing
                                direct au cœur des filières agricoles et
                                artisanales, notre structure déploie son
                                activité sur deux axes majeurs : l'exportation
                                vers les marchés mondiaux et la fourniture d'une
                                gamme de choix pour la consommation locale.
                                Notre démarche repose sur une maîtrise totale de
                                la chaîne d'approvisionnement, assurant à nos
                                partenaires une traçabilité optimale et le
                                respect rigoureux des standards internationaux.
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
                                    <a
                                        href="#mission"
                                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60"
                                    >
                                        Notre Mission
                                    </a>
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
                                        className="flex flex-col items-center justify-between rounded-2xl border border-gold/20 bg-gold/5 px-2 py-5 text-center backdrop-blur-sm transition-colors"
                                    >
                                        <div className="flex flex-1 justify-center">
                                            <div className="text-lg font-extrabold text-gold">
                                                {stat.value}
                                            </div>
                                        </div>

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
                                    src="https://i.pinimg.com/736x/65/70/13/6570138c4201385bf0475e58d1217591.jpg"
                                    alt="Agriculteur malagasy récoltant la vanille"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                            <div className="absolute right-0 bottom-0 h-[50%] w-[55%] overflow-hidden rounded-[2rem] border border-gold/20 shadow-2xl shadow-gold/10">
                                <img
                                    src="https://i.pinimg.com/736x/a6/66/7e/a6667ed7a0bed8fb95aacb69f740cdce.jpg"
                                    alt="Plantation de vanille à Madagascar région SAVA"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="absolute bottom-24 left-8 max-w-xs rounded-[1.5rem] border border-gold/25 bg-black/80 p-6 shadow-xl backdrop-blur-md"
                            >
                                <div className="flex items-center gap-2 text-sm font-semibold text-gold">
                                    <Award className="h-4 w-4" />
                                    Label Qualité Madagascar
                                </div>
                                <p className="mt-3 text-sm leading-6 text-white/70">
                                    Une rigueur opérationnelle garantissant
                                    l'excellence de nos produits, de la collecte
                                    à l'expédition
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
            NOTRE MISSION
        ══════════════════════════════════════ */}
                <section id="mission" className="bg-[#0f0f0f] py-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={smoothFadeIn}
                        className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-gold uppercase">
                                <MapPinned className="h-4 w-4" />
                                Notre Mission
                            </div>
                            <h2 className="max-w-lg text-3xl leading-tight font-extrabold text-white sm:text-4xl">
                                Valoriser la diversité naturelle et{' '}
                                <span className="text-gold">
                                    le génie artisanal de la Grande Île.
                                </span>
                            </h2>
                            <p className="text-sm leading-7 text-white/60 sm:text-base">
                                Promouvoir la biodiversité malagasy et le
                                savoir-faire manuel de la Grande Île. Notre
                                mission s'articule autour d'une sélection
                                pointue de trésors agricoles (poivres, cannelle,
                                haricots secs) et d'objets de décoration en
                                fibres naturelles ou en corne, garantissant une
                                authenticité sans faille{' '}
                            </p>
                            <p className="text-sm leading-7 text-white/60 sm:text-base">
                                Nous agissons en partenaire de confiance pour
                                les groupements de producteurs et les ateliers
                                d'art. En adoptant une approche de développement
                                durable et de responsabilité sociale, nous
                                stimulons l'entrepreneuriat local. Cette
                                exigence nous permet de satisfaire tant les
                                centrales d'achat internationales que les
                                clients locaux en quête de produits à l'origine
                                certifiée
                            </p>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid gap-4 sm:grid-cols-3"
                        >
                            {VALUES.map(({ icon: Icon, title }) => (
                                <motion.article
                                    variants={smoothFadeIn}
                                    className="md:pt-50"
                                    whileHover={{
                                        y: -10,
                                    }}
                                    key={title}
                                >
                                    <div>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-black">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-5 text-lg font-bold text-white">
                                            {title}
                                        </h3>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════
            GAMMES — navigation + layout éditorial
        ══════════════════════════════════════ */}
                <section className="bg-[#0f0f0f] py-6">
                    {/* Layout éditorial — paysans & terrain */}
                    <div className="flex flex-col gap-3 px-4 pb-8 md:gap-4 md:px-8">
                        {/* TOP ROW */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[4fr_3fr_3fr] md:gap-4">
                            {/* Carte texte */}
                            <motion.div
                                custom={0}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="flex h-auto cursor-pointer flex-col justify-center overflow-hidden rounded-2xl border border-gold/15 bg-[linear-gradient(135deg,#1a1200,#2a1e00)] px-6 py-7 sm:h-[clamp(220px,30vw,400px)]"
                            >
                                <div className="space-y-4">
                                    <motion.div
                                        custom={2}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <p className="text-sm font-bold tracking-[0.02em] text-gold sm:text-[0.95rem]">
                                            Campagne Vanille & Épices Premium
                                        </p>
                                        <p className="mt-2 max-w-none text-xs leading-6 text-white/68">
                                            Commandez dès maintenant notre
                                            vanille Planifolia Gourmet (Grade A)
                                            et nos épices d'exception : poivre
                                            noir et baies roses en grains, clous
                                            de girofle et cannelle en bâton.
                                            chaque lot est collecté en direct
                                            des producteurs pour vous garantir
                                            des produits 100% naturels, d'une
                                            fraîcheur absolue et riches en
                                            arômes authentiques
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        custom={3}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <p className="text-sm font-bold tracking-[0.02em] text-gold sm:text-[0.95rem]">
                                            Ligne Artisanat : Fibres Naturelles
                                            & Corne
                                        </p>
                                        <p className="mt-2 max-w-none text-xs leading-6 text-white/68">
                                            Découvrez nos accessoires en raphia
                                            et nos objets de décoration en corne
                                            de zébu. Chaque pièce est
                                            éco-responsable, entièrement faite
                                            main, et mêle l'esthétique malagasy
                                            aux lignes du design contemporain.
                                        </p>
                                    </motion.div>
                                </div>

                                <motion.div
                                    custom={4}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="mt-5"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Link
                                            href="/nous-contacter"
                                            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition hover:bg-[#e0b82d]"
                                        >
                                            Commander
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Image — paysan récoltant vanille */}
                            <motion.div
                                custom={1}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/10"
                                style={{ height: 'clamp(220px, 30vw, 400px)' }}
                            >
                                <img
                                    src="https://i.pinimg.com/736x/94/9c/ae/949cae43a9e21f365d9989d37853889b.jpg"
                                    alt="Paysan récoltant la vanille à Madagascar"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-widest text-black uppercase">
                                        Récolte Main
                                    </span>
                                    <p className="mt-1 text-sm font-bold text-white">
                                        Région SAVA
                                    </p>
                                </div>
                            </motion.div>

                            {/* Image — plantation vanille */}
                            <motion.div
                                custom={2}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/10"
                                style={{ height: 'clamp(220px, 30vw, 400px)' }}
                            >
                                <img
                                    src="https://i.pinimg.com/736x/b0/6c/99/b06c9902eaab4501c589beca59120a8e.jpg"
                                    alt="Epice malagasy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="rounded-full border border-gold/40 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-gold uppercase backdrop-blur">
                                        Épices premium
                                    </span>
                                    <p className="mt-1 text-sm font-bold text-white">
                                        L'Art des Épices à l'état pur
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* BOTTOM ROW */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                            {/* Carte promo artisanat */}
                            <motion.div
                                custom={3}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.015 }}
                                className="relative flex cursor-pointer items-end overflow-hidden rounded-2xl border border-gold/15"
                                style={{
                                    height: 'clamp(200px, 26vw, 270px)',
                                    background: '#1a1200',
                                }}
                            >
                                <img
                                    src="https://i.pinimg.com/736x/09/b7/86/09b78605abb15091792202d27cbc0036.jpg"
                                    alt="Gousses de vanille premium"
                                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                                />
                                <div className="relative z-10 max-w-[65%] p-5 md:p-6">
                                    <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-widest text-black uppercase">
                                        Pôle Artisanat
                                    </span>
                                    <h3 className="mt-2 mb-2 text-xl leading-snug font-extrabold text-white md:text-[1.3rem]">
                                        Raphia &amp; Corne
                                        <br />
                                        <span className="text-gold">
                                            Fait-Main !
                                        </span>
                                    </h3>
                                    <p className="text-[11px] leading-relaxed text-white/50">
                                        Sacs, chapeaux, bijoux et objets en
                                        corne de zébu — l&apos;artisanat
                                        malagasy à l&apos;international.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Image — paysans travaillant au champ */}
                            <motion.div
                                custom={4}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/10"
                                style={{ height: 'clamp(200px, 26vw, 270px)' }}
                            >
                                <img
                                    src="https://i.pinimg.com/736x/71/22/81/7122814b1a5cf70724b0cc257eaf8cc0.jpg"
                                    alt="Agriculteurs malagasy travaillant la terre"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="rounded-full border border-gold/40 bg-gold/20 px-3 py-1 text-[10px] font-bold tracking-widest text-gold uppercase backdrop-blur">
                                        Partenaires
                                    </span>
                                    <p className="mt-1 text-sm font-bold text-white">
                                        Réseaux de Producteurs Locaux
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
            ACTIVITÉS CLÉS & POURQUOI NOUS
        ══════════════════════════════════════ */}
                <section className="bg-[#0a0a0a] py-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={smoothFadeIn}
                        className="mx-auto max-w-7xl gap-10 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Image principale — paysan avec gousses */}
                            <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-gold/15">
                                <img
                                    src="https://i.pinimg.com/736x/4a/60/25/4a6025494fa94342d8b661cdb8dda034.jpg"
                                    alt="Sélection de gousses de vanille prêtes à l'export"
                                    className="absolute inset-0 h-full w-full object-cover object-right"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="space-y-4">
                                <div className="rounded-[2rem] bg-gold p-7 text-black shadow-lg">
                                    <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-black/70 uppercase">
                                        <Star className="h-4 w-4 fill-current" />
                                        Pourquoi Diary Madagascar
                                    </div>
                                    <p className="mt-4 text-sm leading-7 text-black/80">
                                        Conformité & Maîtrise Qualité:
                                        <p>
                                            Nous assurons un conditionnement
                                            optimal respectant les exigences
                                            sanitaires mondiales. Notre rigueur
                                            garantit des produits de Madagascar
                                            d'une pureté totale, adaptés aux
                                            besoins spécifiques de la
                                            distribution B2B et du marché local
                                            premium
                                        </p>
                                    </p>
                                </div>
                                <div className="rounded-[2rem] border border-gold/20 bg-[#1a1500]/40 p-7 shadow-sm">
                                    <div className="text-xl font-extrabold text-gold">
                                        Réactivité & Fluide Logistique:
                                    </div>
                                    <p className="mt-2 text-sm leading-6 text-white/55">
                                        De la préparation de commande sur-mesure
                                        à l'acheminement final, nous offrons un
                                        suivi en temps réel. Notre expertise
                                        assure une gestion des flux maîtriséee
                                        pour une livraison ponctuelle de vos
                                        marchandises, à Madagascar comme à
                                        l'étranger
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-gold uppercase shadow-sm">
                                <Users className="h-4 w-4" />
                                Nos Activités Clés
                            </div>
                            <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
                                Maîtrise Professionnelle des{' '}
                                <span className="text-gold">
                                    Filières Malagasy
                                </span>
                            </h2>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="mt-8 space-y-4"
                            >
                                {PRODUCTS.map(({ icon: Icon, title, text }) => (
                                    <motion.article
                                        variants={smoothFadeIn}
                                        whileHover={{ x: 10 }}
                                        key={title}
                                        className="rounded-[1.5rem] border border-gold/15 bg-[#1a1500]/30 p-6 shadow-sm"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">
                                                    {title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-white/55">
                                                    {text}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════
            PROCESSUS
        ══════════════════════════════════════ */}
                <section className="bg-[#0f0f0f] py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={smoothFadeIn}
                            className="flex flex-col gap-4 text-center"
                        >
                            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-gold uppercase">
                                <Sparkles className="h-4 w-4" />
                                Notre Processus
                            </div>
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                De la Collecte à la Livraison :{' '}
                                <span className="text-gold">
                                    Notre Maîtrise Opérationnelle
                                </span>
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mt-12 grid gap-5 lg:grid-cols-3"
                        >
                            {STEPS.map((step) => (
                                <motion.article
                                    variants={smoothFadeIn}
                                    whileHover={{ y: -5 }}
                                    key={step.id}
                                    className="rounded-[1.75rem] border border-gold/15 bg-[#1a1500]/30 p-7 shadow-sm"
                                >
                                    <div className="text-sm font-extrabold tracking-[0.25em] text-gold">
                                        {step.id}
                                    </div>
                                    <h3 className="mt-4 text-xl font-bold text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-white/55">
                                        {step.text}
                                    </p>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════ */}
                <section className="bg-[#0f0f0f] py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={smoothFadeIn}
                            className="rounded-[2.25rem] border border-gold/20 bg-[linear-gradient(135deg,#1a1200_0%,#2a1e00_100%)] px-8 py-12 text-center text-white shadow-2xl shadow-gold/5 sm:px-12"
                        >
                            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-gold uppercase">
                                <Leaf className="h-4 w-4" />
                                Collaborons Ensemble
                            </div>
                            <h2 className="mt-5 text-3xl leading-tight font-extrabold sm:text-4xl">
                                Devenez Partenaire de la{' '}
                                <span className="text-gold">
                                    Filière Malagasy
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                                À la recherche d'un fournisseur fiable en épices
                                de Madagascar ou en artisanat éco-responsable ?
                                Contactez notre équipe pour concrétiser vos
                                projets d'approvisionnement, d'importation et de
                                distribution sur-mesure.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Link
                                        href="/nous-contacter"
                                        className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                    >
                                        Nous contacter
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{
                                        backgroundColor: 'rgba(201,162,39,0.1)',
                                    }}
                                    className="rounded-full"
                                >
                                    <Link
                                        href="/catalogue"
                                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60"
                                    >
                                        Voir nos Produits
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </motion.main>
        </PublicLayout>
    );
}
