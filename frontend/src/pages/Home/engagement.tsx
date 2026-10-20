
import { Link } from '../../lib/inertia-shim';
import { motion } from "motion/react";

export default function Engagement() {
  return (
    <>
      {/* ENGAGEMENTS SECTION */}
      <section className="relative overflow-hidden border-t border-[#c4a84f]/10 py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/cc/09/de/cc09de1dc62991f8f8774db591cf7885.jpg"
            alt="Plantation malagasy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/75 via-[#0a0a0a]/50 to-noir/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#c4a84f]"></div>
            <span className="text-[#7a5c00] text-xs font-semibold tracking-[0.2em] uppercase">
              Nos Engagements
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-lg">
              L'Excellence Malagasy,{" "}
              <span className="text-[#c4a84f]">Sans Compromis</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-xl">
              Notre priorité est de valoriser l'excellence de l'agriculture et de l'artisanat de Madagascar
              dans le respect strict des normes de sécurité et d'éthique. Grâce à une traçabilité totale, nous assurons l'authenticité de chaque produit destiné à l'exportation ou au marché local, du champ à votre table ou de l'atelier
              à votre intérieur. 
            </p>
          </div>

          <div className="h-px bg-linear-to-r from-[#c4a84f]/40 via-white/10 to-transparent mb-10" />

          <div className="flex flex-col sm:flex-row gap-8 mb-12">
            {[
              {
                icon: "🌿",
                label: "Transparence de la Filière",
                desc: "Un suivi rigoureux garantissant la traçabilité complète de nos produits de Madagascar.",
              },
              {
                icon: "🔒",
                label: "Sécurité & Conformité Export",
                desc: "Le respect des standards phytosanitaires mondiaux pour une qualité irréprochable.",
              },
              {
                icon: "⚖️",
                label: "Standard d'Excellence Global",
                desc: "Une qualité premium uniforme, que ce soit pour le marché malagasy ou l'international.",
              },
              {
                icon: "🚤",
                label: "Solutions Export Personnalisées",  
                desc: "Un accompagnement dédié pour répondre aux besoins spécifiques de chaque importateur.",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 flex-1">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-fit"
          >
            <Link
              href="/nos-engagements"
              className="inline-flex items-center gap-2 bg-[#1a0e00] text-[#f0d980] font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#2e1a00] transition-colors border border-[#c4a84f]"
            >
              En savoir plus
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
      </section>
    </>
  );
}
