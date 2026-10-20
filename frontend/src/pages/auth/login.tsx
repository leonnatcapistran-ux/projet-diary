'use client';

import { Link, useForm, usePage } from '../../lib/inertia-shim';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ShieldCheck,
    Package,
    Headset,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const smoothFadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

type LoginPageProps = {
    status?: string;
    flash?: {
        success?: string;
        error?: string;
        info?: string;
        status?: string;
    };
};

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { status, flash } = usePage<LoginPageProps>().props;
    const navigate = useNavigate();
    const { refresh } = useAuth();
    const redirectTo = useMemo(() => {
        if (typeof window === 'undefined') return '';
        return (
            new URLSearchParams(window.location.search).get('redirect_to') ?? ''
        );
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        redirect_to: redirectTo,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onSuccess: async () => {
                await refresh();
                navigate(redirectTo || '/');
            },
            onFinish: () => reset('password'),
        });
    };

    const registerHref = redirectTo
        ? `/register?redirect_to=${encodeURIComponent(redirectTo)}`
        : '/register';

    return (
        <div className="flex min-h-screen bg-[#f6faf8]">
            <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
                <img
                    src="https://i.pinimg.com/736x/b0/a5/04/b0a504e31a5b485709c839b5a20a728f.jpg"
                    alt="Destination de voyage"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#1a1200cc_0%,#2a1e0099_50%,#1a120066_100%)]" />
                <div className="absolute top-[-4rem] left-[-4rem] h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
                <div className="absolute right-[-3rem] bottom-[-3rem] h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm">
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">
                            Diary Madagascar
                        </span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <h2 className="max-w-sm text-4xl leading-tight font-extrabold">
                            Interface Partenaire Diary Madagascar
                        </h2>
                        <p className="mt-4 max-w-sm text-lg leading-7 text-white/75">
                            Accédez à votre espace sécurisé pour piloter vos
                            approvisionnements, consulter nos disponibilités de
                            récoltes et suivre l'état de vos expéditions
                            internationales.
                        </p>
                        <div className="mt-8 flex gap-4">
                            {[
                                {
                                    icon: ShieldCheck,
                                    label: 'Données Sécurisées',
                                    text: '(Protocole de confidentialité strict)',
                                },
                                {
                                    icon: Package,
                                    label: 'Suivi Export',
                                    text: '(Traçabilité de vos commandes en temps réel)',
                                },
                                {
                                    icon: Headset,
                                    label: 'Support B2B',
                                    text: '(Assistance personnalisée sous 24h)',
                                },
                            ].map(({ icon: Icon, label, text }) => (
                                <div key={label} className="flex flex-col items-center text-center">
                                    <Icon className="h-10 w-10 text-gold" />
                                    <div className="text-lg font-extrabold">
                                        {label}
                                    </div>
                                    <div className="text-sm text-white/65">
                                        {text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="flex w-full items-center justify-center px-6 py-12 sm:px-12 lg:w-1/2">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-md"
                >
                    <motion.div
                        variants={smoothFadeIn}
                        className="mb-8 flex items-center gap-2 lg:hidden"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-black">
                                <ArrowLeft className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-gray-900">
                                Diary
                            </span>
                        </Link>
                    </motion.div>

                    <motion.div variants={smoothFadeIn}>
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Bon retour !
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Pas encore de compte ?{' '}
                            <Link
                                href={registerHref}
                                className="font-semibold text-gold hover:underline"
                            >
                                Creer un compte
                            </Link>
                        </p>
                    </motion.div>

                    <motion.form
                        variants={containerVariants}
                        className="mt-8 space-y-5"
                        onSubmit={submit}
                    >
                        {(status || flash?.status) && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
                            >
                                {status || flash?.status}
                            </motion.div>
                        )}

                        {flash?.error && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {flash.error}
                            </motion.div>
                        )}

                        {flash?.success && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                            >
                                {flash.success}
                            </motion.div>
                        )}

                        {flash?.info && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700"
                            >
                                {flash.info}
                            </motion.div>
                        )}

                        <motion.div variants={smoothFadeIn}>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-gray-800"
                            >
                                Adresse Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="vous@exemple.com"
                                    className={`w-full rounded-2xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-white py-3 pr-4 pl-11 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </motion.div>

                        <motion.div variants={smoothFadeIn}>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-gray-800"
                                >
                                    Mot de Passe
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-gold hover:underline"
                                >
                                    Mot de passe oublie ?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="********"
                                    className={`w-full rounded-2xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-white py-3 pr-12 pl-11 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </motion.div>

                        <motion.div
                            variants={smoothFadeIn}
                            className="flex items-center gap-3"
                        >
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 accent-gold"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-600"
                            >
                                Se souvenir de moi
                            </label>
                        </motion.div>

                        <motion.div variants={smoothFadeIn}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition hover:bg-[#e0b82d] ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                {processing ? 'Connexion...' : 'Se Connecter'}
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </motion.div>
                    </motion.form>

                    <motion.p
                        variants={smoothFadeIn}
                        initial="hidden"
                        animate="visible"
                        className="mt-8 text-center text-xs text-gray-400"
                    >
                        En vous connectant, vous acceptez nos{' '}
                        <Link
                            href="/FAQ"
                            className="underline hover:text-gray-600"
                        >
                            Conditions d&apos;utilisation
                        </Link>{' '}
                        et notre{' '}
                        <Link
                            href="/a-propos"
                            className="underline hover:text-gray-600"
                        >
                            Politique de confidentialite
                        </Link>
                        .
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
