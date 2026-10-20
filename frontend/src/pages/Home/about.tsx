import { Link } from '../../lib/inertia-shim';
import { CircleArrowRight, MapPin } from 'lucide-react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';

const smoothFadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function AboutSection() {
    return (
        <section className="overflow-hidden border-t border-[#c4a84f]/10 bg-[#0a0a0a] py-10 md:py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-10 lg:px-20"
            >
                {/* ================= LEFT SIDE ================= */}
                <motion.div variants={smoothFadeIn} className="space-y-6">
                    {/* Title */}
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-[#7a5c00] uppercase">
                            <div className="h-[2px] w-8 bg-[#c4a84f]"></div>
                            Qui sommes-nous
                        </div>

                        <h1 className="font-serif text-3xl leading-tight text-white md:text-4xl">
                            Bienvenue chez{' '}
                            <span className="text-[#c4a84f]">
                                DIARY MADAGASCAR
                            </span>
                        </h1>

                        <p className="mt-3 text-sm text-white/70 md:text-base">
                            Nous connectons le meilleur du terroir et de
                            l'artisanat de la Grande Île au marché mondial.
                            Qualité premium, traçabilité totale et engagement
                            éthique : découvrez une nouvelle vision de
                            l'exportation et de la distribution locale.
                        </p>
                    </div>

                    {/* Image + Card */}
                    <div className="relative">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative h-[220px] w-full overflow-hidden rounded-xl shadow-lg md:h-[350px]"
                        >
                            <img
                                src="https://i.pinimg.com/736x/e2/e1/0d/e2e10d99a461ec7f71f5d267afd11814.jpg"
                                alt="Plantation de vanille Madagascar"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.article
                            initial={{ x: '-50%', y: 40, opacity: 0 }}
                            whileInView={{ x: '-50%', y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute bottom-[-20px] left-1/2 w-[90%] rounded-xl bg-[#1a0e00] p-4 text-[#f0d980] shadow-2xl md:w-[350px]"
                        >
                            <p className="text-sm font-semibold text-[#f0d980]">
                                Expertise Terroir & Artisanat:
                            </p>

                            <p className="mt-2 text-xs text-[#c4a84f]">
                                Une maîtrise totale de la collecte des produits agricoles et de la création artisanale malagasy.
                            </p>
                        </motion.article>
                    </div>
                </motion.div>

                {/* ================= RIGHT SIDE ================= */}
                <motion.div variants={smoothFadeIn} className="space-y-4">
                    {/* Images */}
                    <div className="grid grid-cols-2 gap-3 p-1.5">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative h-[150px] overflow-hidden rounded-xl shadow-md md:h-[220px]"
                        >
                            <img
                                src="https://i.pinimg.com/736x/af/26/d9/af26d92804a3b7d97fcb7b0781e0c120.jpg"
                                alt="Vanilla"
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative h-[150px] overflow-hidden rounded-xl shadow-md md:h-[220px]"
                        >
                            <img
                                src="https://i.pinimg.com/736x/46/1c/46/461c460ae7c372b2c218f84db3f1b16b.jpg"
                                alt="vanille"
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Vision */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#1a0e00] px-3 py-1 text-xs text-[#f0d980]">
                                <MapPin className="h-3 w-3" />
                                Notre Vision
                            </div>
                            <p className="text-xs text-white/60">
                                Valoriser l'excellence de l'agriculture et de l'artisanat de Madagascar en proposant des produits durables et authentiques au monde entier.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#1a0e00] px-3 py-1 text-xs text-[#f0d980]">
                                <MapPin className="h-3 w-3" />
                                Notre Mission
                            </div>
                            <p className="text-xs text-white/60">
                                Faciliter l'exportation de ressources locales en créant un lien direct et transparent entre nos producteurs malagasy et les acheteurs internationaux.
                            </p>
                        </div>

                        {/* Stats 1 */}
                        <div className="text-white rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                            Standard Qualité Export
                        </div>

                        {/* Stats 2 */}
                        <div className="text-white rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                            Efficacité Opérationnelle
                        </div>
                    </div>

                    {/* Text */}
                    <p className="text-sm text-white/60">
                            Nous forgeons des partenariats durables avec les producteurs et artisans malagasy pour garantir l'exportation de produits du terroir authentiques, traçables et conformes aux exigences internationales.
                    </p>

                    {/* Button */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/a-propos"
                            className="inline-flex items-center gap-2 rounded-full bg-[#1a0e00] px-5 py-2 text-[#f0d980] shadow-md transition hover:bg-[#2e1a00]"
                        >
                            En savoir plus
                            <span className="rounded-full bg-[#f0d980] text-[#1a0e00]">
                                <CircleArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
