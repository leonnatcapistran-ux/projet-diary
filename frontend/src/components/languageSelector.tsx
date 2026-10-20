import { motion, AnimatePresence } from "framer-motion";
import { Languages, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface LanguageSelectorProps {
  scrolled: boolean;
}

const languages = [
  { code: "FR", label: "FR" },
  { code: "EN", label: "EN" },
];

export default function LanguageSelector({ scrolled }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("FR");

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-500 focus:outline-none ${
          scrolled 
            ? "border-gray-200 bg-gray-50/50 hover:bg-gray-100 shadow-sm" 
            : "border-white/20 bg-white/10 hover:bg-white/20"
        }`}
      >
        <Languages className="h-4 w-4 text-gold" />
        <span className={`text-xs font-bold transition-colors duration-500 ${scrolled ? "text-gray-700" : "text-white"}`}>
          {currentLang}
        </span>
        <ChevronDown 
          className={`h-3 w-3 transition-all duration-300 ${
            scrolled ? "text-gray-400" : "text-white/40"
          } ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay pour fermer le menu en cliquant ailleurs */}
            <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute right-0 mt-2 z-[70] min-w-[80px] overflow-hidden rounded-xl border p-1 shadow-2xl backdrop-blur-md ${
                scrolled ? "bg-white border-gray-100" : "bg-black/90 border-gold/20"
              }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                    scrolled 
                      ? "hover:bg-gray-50" 
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className={
                    currentLang === lang.code 
                      ? "font-bold text-gold" 
                      : (scrolled ? "text-gray-600" : "text-white/70")
                  }>
                    {lang.code}
                  </span>
                  {currentLang === lang.code && <Check className="h-3 w-3 text-gold" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}