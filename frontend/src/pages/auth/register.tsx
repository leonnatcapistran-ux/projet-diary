'use client';

import { Link, useForm, usePage } from '../../lib/inertia-shim';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    ArrowLeft,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const smoothFadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
};

type RegisterPageProps = {
    flash?: {
        success?: string;
        error?: string;
        info?: string;
        status?: string;
    };
};

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { flash } = usePage<RegisterPageProps>().props;
    const navigate = useNavigate();
    const { refresh } = useAuth();
    const redirectTo = useMemo(() => {
        if (typeof window === 'undefined') return '';
        return (
            new URLSearchParams(window.location.search).get('redirect_to') ?? ''
        );
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        pays_residence: '',
        type_client: 'particulier',
        password: '',
        password_confirmation: '',
        terms: false,
        redirect_to: redirectTo,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onSuccess: async () => {
                // L'inscription a créé la session (cookie Sanctum) côté
                // serveur ; on recharge l'utilisateur courant puis on
                // redirige, comme le faisait la redirection Inertia avant.
                await refresh();
                navigate(redirectTo || '/');
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#f6faf8]">
            {/* LEFT — FORM PANEL */}
            <div className="order-2 flex w-full items-center justify-center px-6 py-6 sm:px-10 lg:order-1 lg:w-1/2">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <motion.div
                        variants={smoothFadeIn}
                        className="mb-4 flex items-center gap-2 lg:hidden"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold text-black">
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                            <span className="text-lg font-extrabold tracking-tight text-gray-900">
                                Diary
                            </span>
                        </Link>
                    </motion.div>

                    <motion.div variants={smoothFadeIn} className="mb-5 text-center">
                        <h2 className="text-2xl font-extrabold text-gold text-center uppercase sm:text-3xl">
                            Créez votre compte partenaire
                        </h2>
                        <p className="mt-1 text-lg tracking-wide">
                            Simplifiez vos approvisionnements.
                        </p>
                        <p className='text-xs text-black/60'>
                             Créez votre compte partenaire en quelques clics.
                        </p>
                    </motion.div>

                    <motion.form
                        variants={containerVariants}
                        className="space-y-3"
                        onSubmit={submit}
                    >
                        {flash?.error && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                            >
                                {flash.error}
                            </motion.div>
                        )}

                        {flash?.success && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700"
                            >
                                {flash.success}
                            </motion.div>
                        )}

                        {flash?.info && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700"
                            >
                                {flash.info}
                            </motion.div>
                        )}

                        {flash?.status && (
                            <motion.div
                                variants={smoothFadeIn}
                                className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
                            >
                                {flash.status}
                            </motion.div>
                        )}

                        {/* Name row */}
                        <motion.div
                            variants={smoothFadeIn}
                            className="grid grid-cols-2 gap-3"
                        >
                            <div>
                                <label
                                    htmlFor="firstname"
                                    className="mb-1 block text-xs font-semibold text-gray-800"
                                >
                                    Prénom
                                </label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="firstname"
                                        type="text"
                                        value={data.prenom}
                                        onChange={(e) =>
                                            setData('prenom', e.target.value)
                                        }
                                        placeholder="Jean"
                                        className={`w-full rounded-2xl border ${errors.prenom ? 'border-red-500' : 'border-gray-200'} bg-white py-2 pr-3 pl-9 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                    />
                                </div>
                                {errors.prenom && (
                                    <p className="mt-0.5 text-xs text-red-500">
                                        {errors.prenom}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="lastname"
                                    className="mb-1 block text-xs font-semibold text-gray-800"
                                >
                                    Nom
                                </label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="lastname"
                                        type="text"
                                        value={data.nom}
                                        onChange={(e) =>
                                            setData('nom', e.target.value)
                                        }
                                        placeholder="Dupont"
                                        className={`w-full rounded-2xl border ${errors.nom ? 'border-red-500' : 'border-gray-200'} bg-white py-2 pr-3 pl-9 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                    />
                                </div>
                                {errors.nom && (
                                    <p className="mt-0.5 text-xs text-red-500">
                                        {errors.nom}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={smoothFadeIn}>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="vous@exemple.com"
                                    className={`w-full rounded-2xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-white py-2 pr-3 pl-9 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </motion.div>

                        {/* Phone + Pays */}
                        <motion.div
                            variants={smoothFadeIn}
                            className="grid grid-cols-2 gap-3"
                        >
                            <div>
                                <label
                                    htmlFor="telephone"
                                    className="mb-1 block text-xs font-semibold text-gray-800"
                                >
                                    Téléphone{' '}
                                    <span className="font-normal text-gray-400">
                                        (opt.)
                                    </span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="telephone"
                                        type="tel"
                                        value={data.telephone}
                                        onChange={(e) =>
                                            setData('telephone', e.target.value)
                                        }
                                        placeholder="+33 6 00 00 00 00"
                                        className={`w-full rounded-2xl border ${errors.telephone ? 'border-red-500' : 'border-gray-200'} bg-white py-2 pr-3 pl-9 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                    />
                                </div>
                                {errors.telephone && (
                                    <p className="mt-0.5 text-xs text-red-500">
                                        {errors.telephone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="pays_residence"
                                    className="mb-1 block text-xs font-semibold text-gray-800"
                                >
                                    Pays de résidence
                                </label>
                                <input
                                    id="pays_residence"
                                    type="text"
                                    value={data.pays_residence}
                                    onChange={(e) =>
                                        setData(
                                            'pays_residence',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="France"
                                    className={`w-full rounded-2xl border ${errors.pays_residence ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                />
                                {errors.pays_residence && (
                                    <p className="mt-0.5 text-xs text-red-500">
                                        {errors.pays_residence}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Type client */}
                        <motion.div variants={smoothFadeIn}>
                            <label
                                htmlFor="type_client"
                                className="mb-1 block text-xs font-semibold text-gray-800"
                            >
                                Type de client
                            </label>
                            <select
                                id="type_client"
                                value={data.type_client}
                                onChange={(e) =>
                                    setData('type_client', e.target.value)
                                }
                                className={`w-full rounded-2xl border ${errors.type_client ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                            >
                                <option value="particulier">Particulier</option>
                                <option value="professionnel">
                                    Professionnel
                                </option>
                            </select>
                            {errors.type_client && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.type_client}
                                </p>
                            )}
                        </motion.div>

                        {/* Password + Confirm — côte à côte */}
                        <motion.div
                            variants={smoothFadeIn}
                            className="grid grid-cols-2 gap-3"
                        >
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1 block text-xs font-semibold text-gray-800"
                                >
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="Min. 8 caractères"
                                        className={`w-full rounded-2xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-white py-2 pr-9 pl-9 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-3.5 w-3.5" />
                                        ) : (
                                            <Eye className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-0.5 text-xs text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="confirm"
                                    className="mb-1 block text-xs font-semibold text-gray-800"
                                >
                                    Confirmer
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="confirm"
                                        type={showConfirm ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Retapez le mot de passe"
                                        className={`w-full rounded-2xl border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} bg-white py-2 pr-9 pl-9 text-sm transition outline-none focus:border-gold focus:ring-2 focus:ring-gold/10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                                    >
                                        {showConfirm ? (
                                            <EyeOff className="h-3.5 w-3.5" />
                                        ) : (
                                            <Eye className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-0.5 text-xs text-red-500">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Terms */}
                        <motion.div
                            variants={smoothFadeIn}
                            className="flex items-start gap-2"
                        >
                            <input
                                id="terms"
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) =>
                                    setData('terms', e.target.checked)
                                }
                                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 accent-gold"
                            />
                            <label
                                htmlFor="terms"
                                className="text-xs leading-5 text-gray-600"
                            >
                                J&apos;accepte les{' '}
                                <Link
                                    href="/FAQ"
                                    className="font-semibold text-gold hover:underline"
                                >
                                    Conditions d&apos;utilisation
                                </Link>{' '}
                                et la{' '}
                                <Link
                                    href="/a-propos"
                                    className="font-semibold text-gold hover:underline"
                                >
                                    Politique de confidentialité
                                </Link>
                            </label>
                        </motion.div>
                        {errors.terms && (
                            <p className="mt-0.5 text-xs text-red-500">
                                {errors.terms}
                            </p>
                        )}

                        {/* Submit */}
                        <motion.div variants={smoothFadeIn}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black uppercase shadow-lg shadow-gold/20 transition hover:bg-[#e0b82d] ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                {processing
                                    ? 'Inscription...'
                                    : 'Confirmer mon inscription'}
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            variants={smoothFadeIn}
                            className="relative flex items-center gap-3"
                        >
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-xs font-medium text-gray-400">
                                ou s&apos;inscrire avec
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </motion.div>

                        {/* Social buttons */}
                        <motion.div
                            variants={smoothFadeIn}
                            className="grid grid-cols-2 gap-3"
                        >
                            <motion.button
                                whileHover={{
                                    y: -2,
                                    boxShadow:
                                        '0 8px 20px -4px rgb(0 0 0 / 0.08)',
                                }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </motion.button>
                            <motion.button
                                whileHover={{
                                    y: -2,
                                    boxShadow:
                                        '0 8px 20px -4px rgb(0 0 0 / 0.08)',
                                }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </motion.button>
                        </motion.div>

                        <motion.p
                            variants={smoothFadeIn}
                            className="text-xs text-gray-500 text-center"
                        >
                            Vous avez déjà un compte ?{' '}
                            <Link
                                href={
                                    redirectTo
                                        ? `/login?redirect_to=${encodeURIComponent(redirectTo)}`
                                        : '/login'
                                }
                                className="font-semibold text-gold hover:underline"
                            >
                                Connexion
                            </Link>
                        </motion.p>
                    </motion.form>
                </motion.div>
            </div>

            {/* RIGHT — IMAGE PANEL */}
            <div className="relative order-1 hidden overflow-hidden lg:order-2 lg:flex lg:w-1/2">
                <img
                    src="https://i.pinimg.com/736x/a1/70/05/a170059ffe7ebb8979a1db9a33fd71ea.jpg"
                    alt="Destination de voyage tropicale"
                    className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 bg-[linear-gradient(220deg,black,transparent,transparent)]" />
                {/* <div className="absolute top-[-3rem] right-[-3rem] h-72 w-72 rounded-full bg-gold/20 blur-3xl" /> */}
                {/* <div className="absolute bottom-[-4rem] left-[-4rem] h-64 w-64 rounded-full bg-white/10 blur-3xl" /> */}

                <div className="relative z-10 flex w-full flex-col justify-between p-10 text-white">
                    <div className="flex justify-end">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm">
                                <ArrowLeft className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight">
                                Diary Madagascar
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
