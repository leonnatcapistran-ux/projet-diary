"use client";
import { Link } from '../../lib/inertia-shim';
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";


const places = [
  {
    name: "Épices et Saveurs ",
    other: "Authentiques de Madagascar",
    text: "Une sélection rigoureuse de vanille Bourbon, poivres et girofle, garantissant une qualité constante pour les professionnels de l'alimentation.",
    image: "https://i.pinimg.com/736x/32/f7/b4/32f7b493019a03637ee9a41ab8714783.jpg",
  },
  {
    name: "Grains et Légumineuses ",
    other: "du Terroir",
    text: "Café vert de haute qualité et légumineuses nutritives (Haricots, Pois du Cap, ...), cultivés au coeur des terres fertiles malagasy.",
    image: "https://i.pinimg.com/736x/fb/6e/5c/fb6e5c6105c4a4fbdebbb03fa6580f8e.jpg",
  },
  {
    name: "L'art du Raphia ",
    other: "au Feminin",
    text: "Une collection de maroquinerie artisanale alliant le savoir-faire des tresseuses malagasy aux exigences de la mode mondiale.",
    image: "https://i.pinimg.com/736x/0a/34/76/0a347603bb0ef8fd6584654039b7c2f9.jpg",
  },
  {
    name: "Art de Vivre & Accessoires ",
    other: "de Mode",
    text: "Objets de décoration en corne et bijoux en raphia, reflets de l'élégance naturelle et de la richesse culturelle de la Grande île.",
    image: "https://i.pinimg.com/736x/e9/ba/4b/e9ba4b7aeb2ce32cd391e41610139ffd.jpg",
  },
];

const FEATURES = [
  {
    title: "Standards Qualité Madagascar",
    description: "Des produits rigoureusement sélectionnés pour répondre aux exigences du marché international",
    image: "https://i.pinimg.com/736x/4a/79/50/4a795033aca7b684b9cfc67518b3e9b2.jpg",
  },
  {
    title: "Traçabilité Terroir Garantie",
    description: "Un contrôle total de la provenance de chaque lot, de la zone de collecte à l'exportation",
    image: "https://i.pinimg.com/736x/bb/bb/dc/bbbbdcc3673e13a12be1ed13583e92b3.jpg",
  },
  {
    title: "Produits Naturels de Madagascar",
    description: "Une sélection authentique issue des meilleures terres agricoles de la Grande Île.",
    image: "https://i.pinimg.com/736x/1f/c8/b3/1fc8b3a0873312b26cace923825b1a57.jpg",
  },
  {
    title: "Engagement Commerce Équitable",
    description: "Un partenariat direct et juste avec nos producteurs pour un développement durable",
    image: "https://i.pinimg.com/control1/736x/89/08/89/89088922343987f57a2322baab48e0de.jpg",
  },
];

const THUMB_H = 224;
const GAP = 16;
const UNIT = THUMB_H + GAP;

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Autoplay toutes les 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % places.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const active = places[index];

  const queuePlaces = Array.from({ length: places.length - 1 }, (_, offset) => {
    const placeIndex = (index + 1 + offset) % places.length;
    return { place: places[placeIndex], i: placeIndex };
  });

  return (
    <div className="w-full overflow-hidden flex flex-col bg-black/90">

      {/* ===================== MOBILE + TABLETTE ===================== */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <div className="relative h-[62vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.image}
              src={active.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/85" />

          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-10 pb-6 md:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-3 w-fit px-2.5 py-1 rounded-lg border border-[#f0d980]/40 backdrop-blur-sm"
            >
              <Leaf height={14} className="md:hidden" stroke="#f0d980" />
              <Leaf height={18} className="hidden md:block" stroke="#f0d980" />
              <span className="text-[#f0d980] text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                Diary Madagascar
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-2 md:mb-4"
              >
                {active.name}
                <br />
                <span className="text-[#f0d980]">{active.other}</span>
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-lg mb-4 md:mb-6"
              >
                {active.text}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2.5 md:gap-4 mb-5 md:mb-7"
            >
              <Link href="/catalogue" className="bg-[#f0d980] text-[#1a0e00] font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-full flex items-center gap-2 hover:bg-[#e8cc6a] transition-colors text-xs md:text-sm shadow-lg">
                Découvrir nos produits
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/261340366490"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#f0d980]/50 text-[#f0d980] font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-full flex items-center gap-2 transition-colors text-xs md:text-sm"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Nous Contacter
              </a>
            </motion.div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {places.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === index ? 24 : 6,
                    height: 6,
                    background: i === index ? "#f0d980" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Cards */}
        <div className="mx-5 md:mx-10 mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-[#0f1113]/95 border border-[#f0d980]/20 shadow-[0_26px_60px_rgba(0,0,0,0.35)] cursor-pointer flex flex-col"
            >
              <div className="relative h-32 md:h-40 overflow-hidden border-b border-white/10">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-0.5 w-10 rounded-full bg-[#f0d980]" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#f0d980]">Diary</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Thumbnails — tablette uniquement */}
        <div className="hidden md:flex gap-3 mx-5 mb-8">
          {places.map((place, i) => {
            const isActive = i === index;
            return (
              <motion.div
                key={i}
                animate={{ opacity: 1 }}
                className="relative flex-1 rounded-xl overflow-hidden"
                style={{ height: 160 }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-500"
                  style={{ filter: `brightness(${isActive ? 0.65 : 0.35})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 px-3 text-center">
                  <span
                    className="text-white font-extrabold tracking-tight leading-tight transition-all duration-300"
                    style={{ fontSize: isActive ? 15 : 13, opacity: isActive ? 1 : 0.65 }}
                  >
                    {place.name}
                  </span>
                  {isActive && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="block mt-1.5 h-[2px] w-8 bg-[#f0d980] rounded-full origin-left"
                    />
                  )}
                </div>
                {isActive && (
                  <div className="absolute inset-0 rounded-xl ring-2 ring-[#f0d980]/60 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden lg:flex relative flex-1 overflow-hidden">
        <motion.img
          key={active.image}
          src={active.image}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 w-full h-12/12 object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />

        <div className="px-10 md:px-23 pt-27 w-full">
          <div className="relative grid grid-cols-100 grid-rows-3 pb-6">

            {/* LEFT */}
            <div className="grid grid-cols-7 grid-rows-10 gap-8 col-span-70 row-span-3">
              <div className="col-span-7 row-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex items-center gap-2 mb-4 backdrop-blur-xs w-fit px-2.5 py-1 rounded-lg border border-[#f0d980]/40"
                >
                  <Leaf height={17} stroke="#f0d980" />
                  <span className="text-[#f0d980] text-xs font-semibold tracking-widest uppercase">
                    Diary Madagascar
                  </span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`h1-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5"
                  >
                    {active.name}
                    <br />
                    <span className="text-[#f0d980]">{active.other}</span>
                  </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`p-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="text-gray-300 text-sm md:text-base mb-8 max-w-md leading-relaxed"
                  >
                    {active.text}
                  </motion.p>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/catalogue" className="bg-[#f0d980] text-[#1a0e00] font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#e8cc6a] transition-colors">
                    Découvrir nos produits
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a href="https://wa.me/261340366490" target="_blank" rel="noopener noreferrer" className="border border-[#f0d980]/50 text-[#f0d980] font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Nous contacter : +261 34 03 664 90
                  </a>
                </motion.div>
              </div>

              {/* Features Cards */}
              <div className="col-span-7 row-span-4 mt-8">
                <div className="grid grid-cols-4 gap-4">
                  {FEATURES.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="group relative overflow-hidden rounded-xl bg-[#0f1113]/95 border border-[#f0d980]/20 shadow-[0_26px_60px_rgba(0,0,0,0.35)] cursor-pointer flex flex-col"
                    >
                      <div className="relative h-24 overflow-hidden border-b border-white/10">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-xs text-gray-300 opacity-90 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — file d’attente des vignettes */}
            <div
              className="hidden lg:block row-span-3"
              style={{ position: "relative", height: 3 * THUMB_H + 2 * GAP }}
            >
              <AnimatePresence mode="popLayout">
                {queuePlaces.map(({ place, i }, slot) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: UNIT * 3 }}
                    animate={{ opacity: 1, y: slot * UNIT, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
                    exit={{ opacity: 0, y: -UNIT * 0.7, transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } }}
                    style={{ position: "absolute", left: 20, width: 360, height: THUMB_H }}
                    className="overflow-hidden rounded-lg"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: "brightness(0.4)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                      <span className="text-white font-extrabold tracking-tight text-xl opacity-75">
                        {place.name}
                      </span>
                      <span className="text-white/50 text-xs mt-1.5 leading-relaxed max-w-[220px] line-clamp-2">
                        {place.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
