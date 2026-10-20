'use client';
import { Link, useForm, usePage } from '../lib/inertia-shim';
import type { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Clock3,
    Mail,
    MapPin,
    MessageSquareText,
    Phone,
    ShieldCheck,
    Sparkles,
    ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import PublicLayout from '@/components/public-layout';

const CONTACT_CARDS = [
    {
        icon: Phone,
        title: 'Contactez-nous',
        value: '+261 34 03 664 90',
        text: 'Disponible pour vos questions urgentes et échanges directs via WhatsApp.',
        // solona atao numero an'ny entreprise
        lien: 'https://wa.me/261340366490',
    },
    {
        icon: Mail,
        title: 'Écrivez-nous',
        value: 'contact@diary-madagascar.com',
        text: 'Envoyez vos demandes de cotation et vos cahiers des charges pour une étude personnalisée.',
        // solona mail an'entreprise
        lien: 'mailto:contact@diary-madagascar.com',
    },
    {
        icon: MapPin,
        title: 'Nos Bureaux',
        value: 'Soavimbahoaka, Antananarivo, Madagascar',
        text: "Retrouvez-nous au cœur d'Antananarivo pour discuter de vos projets de partenariat.",
    },
];

const BENEFITS = [
    'Expertise Sourcing Madagascar.',
    'Gestion Logistique Intégrale.',
    'Support Client Personnalisé.',
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FAQS = [
    {
        question:
            'Quels types de produits proposez-vous dans votre catalogue ?',
        answer: "Nous proposons une sélection rigoureuse de 18 produits d'exception, répartis en deux pôles : 10 références agricoles (Vanille, épices, légumineuses) et 8 créations artisanales. Cette gamme premium est disponible aussi bien pour l'exportation que pour la distribution locale à Madagascar.",
    },
    {
        question: "Comment s'organise la livraison de vos produits ?",
        answer: "Nous maîtrisons l'ensemble de la chaîne logistique. Pour l'exportation, nous gérons l'expédition internationale et les formalités douanières. Pour le marché local, nous assurons une livraison sécurisée partout à Madagascar, garantissant la même fraîcheur et qualité de service",
    },
    {
        question:
            "Quel est le délai de réponse pour une demande d'informations ou de cotation ?",
        answer: "Notre équipe s'engage à traiter chaque demande (projet d'importation ou besoin de distribution locale) sous 24h ouvrées. Nous privilégions une communication fluide et personnalisée pour chaque partenaire.",
    },
    {
        question:
            "Est-il possible de voir les produits ou d'obtenir des échantillons ?",
        answer: "Absolument. Nous comprenons l'importance de valider la qualité avant un partenariat durable. Nous fournissons gracieusement des échantillons de nos produits (frais d'expédition à la charge du client). Pour nos partenaires locaux à Madagascar, nous organisons une livraison directe afin de vous présenter la qualité de nos filières agricoles et artisanales.",
    },
    {
        question: 'Comment garantissez-vous la traçabilité et la qualité ?',
        answer: "Grâce à un sourcing direct sans intermédiaire, nous assurons une traçabilité totale de chaque lot. Que le produit soit destiné au marché local ou à l'international, il suit les mêmes contrôles de qualité rigoureux à chaque étape de sa préparation.",
    },
];

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
        transition: { staggerChildren: 0.15 },
    },
};

export default function ContactPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };
    const { flash } = usePage<{ flash?: { success?: string } }>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        email: '',
        phone: '',
        company: '',
        sujet: '',
        message: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const productParam = params.get('product') ?? '';

        if (!productParam) {
            return;
        }

        setData((prev) => ({
            ...prev,
            sujet: prev.sujet || 'demande_produit',
            message:
                prev.message ||
                `Je souhaite obtenir un devis pour le produit : ${productParam}.`,
        }));
    }, [setData]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <PublicLayout>
            <div className="min-h-screen bg-[#0a0a0a] text-white">
                <motion.main
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* CARTES CONTACT */}
                    <section className="bg-[#0f0f0f] py-25 md:pt-35">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={containerVariants}
                                className="grid gap-5 lg:grid-cols-3"
                            >
                                {/* Liens atao am card */}
                                {CONTACT_CARDS.map(
                                    ({
                                        icon: Icon,
                                        title,
                                        value,
                                        text,
                                        lien,
                                    }) => (
                                        <motion.article
                                            variants={smoothFadeIn}
                                            whileHover={{
                                                y: -12,
                                                boxShadow:
                                                    '0 25px 50px -12px rgb(0 0 0 / 0.08)',
                                            }}
                                            key={title}
                                            className="cursor-pointer rounded-[1.75rem] border border-gold/20 bg-[#0a0a0a] p-7 shadow-sm transition-shadow"
                                        >
                                            <a href={lien} target="_blank">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-black">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <h2 className="mt-5 text-xl font-bold text-white">
                                                    {title}
                                                </h2>
                                                <p className="mt-2 text-sm font-semibold text-gold">
                                                    {value}
                                                </p>
                                                <p className="mt-3 text-sm leading-6 text-white/70">
                                                    {text}
                                                </p>
                                            </a>
                                        </motion.article>
                                    ),
                                )}
                            </motion.div>
                        </div>
                    </section>

                    {/* FORMULAIRE */}
                    <section id="contact-form" className="bg-[#0a0a0a] py-20">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"
                        >
                            <motion.div variants={smoothFadeIn}>
                                <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-gold uppercase">
                                    <MessageSquareText className="h-4 w-4" />
                                    Collaborons Ensemble
                                </div>

                                <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
                                    Demande d'informations et Partenariat Export
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                                    Pour toute demande de renseignements, de
                                    cotation ou de partenariat, notre équipe
                                    vous répond sous 24h ouvrées
                                </p>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="mt-8 space-y-4"
                                >
                                    {BENEFITS.map((benefit) => (
                                        <motion.div
                                            variants={smoothFadeIn}
                                            key={benefit}
                                            className="flex items-start gap-3 rounded-2xl border border-gold/20 bg-[#0f0f0f] px-5 py-4 shadow-sm"
                                        >
                                            <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
                                                <ShieldCheck className="h-4 w-4" />
                                            </span>
                                            <p className="text-sm leading-6 text-white/70">
                                                {benefit}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    className="mt-8 rounded-[1.75rem] border border-gold/20 bg-[#0f0f0f] p-6 text-white shadow-lg"
                                >
                                    <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-gold uppercase">
                                        <Clock3 className="h-4 w-4" />
                                        Disponibilité et Support
                                    </div>
                                    <div className="mt-4 space-y-2 text-sm text-white/80">
                                        <p>
                                            Lundi - Vendredi : 08:00 - 17:00
                                            (GMT+3){' '}
                                        </p>

                                        <p>
                                            Samedi : 09:00 - 12:00 (GMT+3)
                                            (Uniquement sur rendez-vous)
                                        </p>

                                        <p>Dimanche et Jours fériés : Fermé</p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-[2rem] border border-gold/20 bg-[#0f0f0f] p-6 shadow-xl sm:p-8"
                            >
                                {flash?.success ? (
                                    <div className="mb-6 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm font-semibold text-gold shadow-sm">
                                        {flash.success}
                                    </div>
                                ) : null}
                                <form
                                    onSubmit={submit}
                                    className="grid gap-4 sm:grid-cols-2"
                                >
                                    <div>
                                        <label
                                            htmlFor="full-name"
                                            className="mb-2 block text-sm font-semibold text-white"
                                        >
                                            Nom Complet
                                        </label>
                                        <input
                                            id="full-name"
                                            type="text"
                                            value={data.nom}
                                            onChange={(e) =>
                                                setData('nom', e.target.value)
                                            }
                                            placeholder="Votre nom"
                                            className={`w-full rounded-2xl border ${errors.nom ? 'border-red-500' : 'border-gold/30'} bg-[#0a0a0a] px-4 py-3 text-sm text-white transition outline-none focus:border-gold`}
                                        />
                                        {errors.nom && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.nom}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-semibold text-white"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            placeholder="you@example.com"
                                            className={`w-full rounded-2xl border ${errors.email ? 'border-red-500' : 'border-gold/30'} bg-[#0a0a0a] px-4 py-3 text-sm text-white transition outline-none focus:border-gold`}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm font-semibold text-white"
                                        >
                                            Numéro de Téléphone
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            placeholder="+33 6 00 00 00 00"
                                            className={`w-full rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-gold/30'} bg-[#0a0a0a] px-4 py-3 text-sm text-white transition outline-none focus:border-gold`}
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="mb-2 block text-sm font-semibold text-white"
                                        >
                                            Société / Entreprise
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            value={data.company}
                                            onChange={(e) =>
                                                setData(
                                                    'company',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nom de votre entreprise (facultatif)"
                                            className={`w-full rounded-2xl border ${errors.company ? 'border-red-500' : 'border-gold/30'} bg-[#0a0a0a] px-4 py-3 text-sm text-white transition outline-none focus:border-gold`}
                                        />
                                        {errors.company && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.company}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-semibold text-white"
                                        >
                                            Sujet de votre message
                                        </label>
                                        <select
                                            id="subject"
                                            value={data.sujet}
                                            onChange={(e) =>
                                                setData('sujet', e.target.value)
                                            }
                                            className={`w-full rounded-2xl border ${errors.sujet ? 'border-red-500' : 'border-gold/30'} bg-[#0a0a0a] px-4 py-3 text-sm text-white transition outline-none focus:border-gold`}
                                        >
                                            <option value="" disabled>
                                                Sélectionnez un sujet
                                            </option>
                                            <option value="partenariat">
                                                Partenariat
                                            </option>
                                            <option value="demande_produit">
                                                Demande de produit
                                            </option>
                                            <option value="livraison">
                                                Livraison
                                            </option>
                                            <option value="autre">Autre</option>
                                        </select>
                                        {errors.sujet && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.sujet}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-semibold text-white"
                                        >
                                            Votre Projet / Demande
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Décrivez votre besoin ou votre projet (type de produits, quantités souhaitées, destination ou questions diverses)..."
                                            className={`w-full rounded-[1.5rem] border ${errors.message ? 'border-red-500' : 'border-gold/30'} bg-[#0a0a0a] px-4 py-3 text-sm text-white transition outline-none focus:border-gold`}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={processing}
                                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#e0b82d] ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                                        >
                                            {processing
                                                ? 'Envoi en cours...'
                                                : 'Envoyer ma Demande'}
                                            <ArrowRight className="h-4 w-4" />
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    </section>
                    <section className="bg-[#0f0f0f] py-20">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
                        >
                            <motion.div
                                variants={smoothFadeIn}
                                className="relative max-h-[700px] min-h-[420px] overflow-hidden rounded-[2rem] shadow-xl"
                            >
                                <img
                                    src="https://i.pinimg.com/736x/cc/b8/97/ccb8974b44b24bcdeb2ea7980070ebd3.jpg"
                                    alt="Équipe professionnelle discutant de projets d'exportation et de partenariats"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                                <div className="absolute right-0 bottom-0 left-0 p-7 text-white">
                                    <h2 className="mt-4 text-3xl leading-tight font-extrabold">
                                        Chaque partenariat réussi commence par
                                        une bonne conversation.
                                    </h2>
                                </div>
                            </motion.div>

                            <motion.div variants={smoothFadeIn}>
                                <div className="inline-flex items-center gap-1 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-[#C9A227] uppercase">
                                    <Sparkles className="h-4 w-4" />
                                    Questions Fréquentes
                                </div>

                                <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
                                    Tout savoir sur nos services et nos
                                    produits.
                                </h2>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="mt-8 space-y-4 cursor-pointer"
                                >
                                    {FAQS.map((faq, index) => {
                                        const isOpen = openIndex === index;

                                        return (
                                            <motion.article
                                                variants={smoothFadeIn}
                                                key={faq.question}
                                                className={`cursor-pointer rounded-xl border bg-[#0a0a0a] shadow-sm transition-colors ${
                                                    isOpen
                                                        ? 'border-gold/50'
                                                        : 'border-[#C9A227]/20'
                                                }`}
                                            >
                                                {/* Question (bouton) */}
                                                <button
                                                    onClick={() =>
                                                        toggle(index)
                                                    }
                                                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                                                    aria-expanded={isOpen}
                                                >
                                                    <h3 className="text-lg font-bold text-gold">
                                                        {faq.question}
                                                    </h3>
                                                    <motion.span
                                                        animate={{
                                                            rotate: isOpen
                                                                ? 180
                                                                : 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.35,
                                                            ease: [
                                                                0.4, 0, 0.2, 1,
                                                            ],
                                                        }}
                                                        className="ml-4 shrink-0 text-gold"
                                                    >
                                                        <ChevronDown
                                                            size={20}
                                                        />
                                                    </motion.span>
                                                </button>

                                                {/* Réponse animée */}
                                                <AnimatePresence
                                                    initial={false}
                                                >
                                                    {isOpen && (
                                                        <motion.div
                                                            key="answer"
                                                            initial={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                height: 'auto',
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.35,
                                                                ease: [
                                                                    0.4, 0, 0.2,
                                                                    1,
                                                                ],
                                                            }}
                                                            style={{
                                                                overflow:
                                                                    'hidden',
                                                            }}
                                                        >
                                                            <p className="px-4 pb-4 text-sm leading-6 text-white/70">
                                                                {faq.answer}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.article>
                                        );
                                    })}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* CTA FINAL */}
                    <section className="bg-[#0f0f0f] py-20">
                        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={smoothFadeIn}
                                className="rounded-[2.25rem] border border-gold/20 bg-[linear-gradient(135deg,#1a1200_0%,#2a1e00_100%)] px-8 py-12 text-center text-white shadow-2xl sm:px-12"
                            >
                                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-gold uppercase">
                                    <MessageSquareText className="h-4 w-4" />
                                    Démarrez votre partenariat avec DIARY
                                    MADAGASCAR
                                </div>
                                <h2 className="mt-5 text-3xl leading-tight font-extrabold sm:text-4xl">
                                    Accédez au meilleur du terroir malagasy dès
                                    aujourd'hui
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                                    Que ce soit pour l'exportation
                                    internationale ou la distribution locale,
                                    notre équipe vous accompagne avec une
                                    expertise sur-mesure
                                </p>
                                <div className="mt-8 flex flex-wrap justify-center gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <a
                                            href="#contact-form"
                                            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                        >
                                            Nous contacter
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{
                                            backgroundColor:
                                                'rgba(201,162,39,0.12)',
                                        }}
                                        className="rounded-full"
                                    >
                                        <Link
                                            href="/catalogue"
                                            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60"
                                        >
                                            Voir notre catalogue
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </motion.main>
            </div>
        </PublicLayout>
    );
}
