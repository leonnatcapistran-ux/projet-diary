import { Link, usePage } from '../lib/inertia-shim';
import { ShoppingCart, User } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import LanguageSelector from './languageSelector';
import DiaryLogo from './Logo';
import { useAuth } from '../context/AuthContext';


const NAV_LINKS = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Nos produits', href: '/catalogue' },
    { label: 'Nos engagements', href: '/nos-engagements' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Contact', href: '/nous-contacter' },
];

export default function Navbar() {
    type AuthPageProps = { auth?: { user?: Record<string, unknown> } };

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const page = usePage<AuthPageProps>();
    const { auth } = page.props;
    const { cartCount, setIsCartOpen } = useCart();
    const { logout } = useAuth();
    const currentPath = page.url.split('?')[0];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('La déconnexion a échoué.', error);
        }
    };

    const isLinkActive = (href: string): boolean => {
        if (href === '/') {
            return currentPath === '/';
        }

        return currentPath === href || currentPath.startsWith(`${href}/`);
    };

    useMotionValueEvent(scrollY, 'change', (latest: number) => {
        setScrolled(latest > 40);
    });

    return (
        <>
            <motion.nav
                className="fixed top-0 z-50 w-full"
                translate="no"
                animate={{
                    backgroundColor: scrolled
                        ? 'rgba(255,255,255,0.92)'
                        : 'rgba(0,0,0,0)',
                    borderBottomColor: scrolled
                        ? 'rgba(0,0,0,0.06)'
                        : 'rgba(0,0,0,0)',
                    boxShadow: scrolled
                        ? '0 4px 24px rgba(0,0,0,0.07)'
                        : '0 0px 0px rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
                    borderBottom: '1px solid transparent',
                }}
            >
                <motion.div
                    className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
                    animate={{ height: scrolled ? '52px' : '64px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href="/">
                    <DiaryLogo />
                    </Link>

                    <motion.div
                        className="items-center gap-6 hidden lg:flex"
                        animate={{
                            border: scrolled
                                ? '1px solid rgba(0,0,0,0)'
                                : '1px solid rgba(255,255,255,0.2)',
                            backgroundColor: 'rgba(0,0,0,0)',
                            paddingLeft: scrolled ? '0px' : '16px',
                            paddingRight: scrolled ? '0px' : '16px',
                            height: scrolled ? '36px' : '40px',
                            borderRadius: '999px',
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {NAV_LINKS.map((link) => {
                            const isActive = isLinkActive(link.href);

                            return (
                                <motion.span
                                    key={link.label}
                                    className="text-sm font-medium"
                                    animate={{
                                        color: isActive
                                            ? '#C9A227'
                                            : scrolled
                                              ? '#333333'
                                              : 'rgba(255,255,255,0.9)',
                                    }}
                                    whileHover={{ opacity: 0.65 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </motion.span>
                            );
                        })}
                    </motion.div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsCartOpen(true)}
                            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#C9A227]/50 hover:text-[#C9A227] lg:inline-flex"
                            aria-label="Ouvrir le panier"
                        >
                            <motion.span
                                className="text-sm font-medium"
                                animate={{
                                    color: scrolled
                                        ? '#333333'
                                        : 'rgba(255,255,255,0.9)',
                                }}
                                whileHover={{ opacity: 0.65 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </motion.span>
                            {cartCount > 0 ? (
                                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#C9A227] px-1 text-[10px] font-bold text-black">
                                    {cartCount}
                                </span>
                            ) : null}
                        </button>

                        <div className="hidden lg:block">
                            <LanguageSelector scrolled={scrolled} />
                        </div>

                        <Link href="/login">
                            <User
                                className="rounded-full bg-gold p-1 text-white md:hidden"
                                size={24}
                            />
                        </Link>
                        <motion.div
                            className="mr-2 hidden md:block"
                            animate={{
                                color: scrolled ? '#333333' : '#ffffff',
                            }}
                        >
                            <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                                {auth?.user ? (
                                    <>
                                        <Link
                                            href="/compte/commandes"
                                            className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                        >
                                            Mon compte
                                        </Link>
                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                Administration
                                            </Link>
                                        )}
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="rounded-full bg-[#C9A227] px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                        >
                                            Deconnexion
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-full bg-[#C9A227] px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                        >
                                            Inscription
                                        </Link>
                                    </>
                                )}
                            </div>

                        </motion.div>

                        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                            <motion.svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                animate={{
                                    color: scrolled ? '#374151' : '#ffffff',
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </motion.svg>
                        </button>
                    </div>
                </motion.div>

                {menuOpen && (
                    <motion.div
                        className="space-y-2 border-t border-gray-100 bg-white px-4 py-3 lg:hidden"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {NAV_LINKS.map((link) => {
                            const isActive = isLinkActive(link.href);

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`block py-1 text-sm font-medium transition ${
                                        isActive
                                            ? 'text-[#C9A227]'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                setIsCartOpen(true);
                            }}
                            className="flex items-center justify-between py-2 text-sm font-medium text-gray-700"
                        >
                            <span>Panier</span>
                            <span className="rounded-full bg-[#C9A227] px-2 py-0.5 text-xs font-bold text-black">
                                {cartCount}
                            </span>
                        </button>

                        {auth?.user && (
                            <div className="space-y-2 border-t border-gray-100 pt-3">
                                {auth.user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="block py-2 text-sm font-medium text-gray-700"
                                    >
                                        Administration
                                    </Link>
                                )}
                                <Link
                                    href="/compte/commandes"
                                    className="block py-2 text-sm font-medium text-gray-700"
                                >
                                    Mon compte
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded-full bg-[#C9A227] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e0b82d]"
                                >
                                    Deconnexion
                                </button>
                            </div>
                        )}

                        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
                            <span className="text-sm font-medium text-gray-500">
                                Langue
                            </span>
                            <LanguageSelector scrolled />
                        </div>
                    </motion.div>
                )}
            </motion.nav>
        </>
    );
}
