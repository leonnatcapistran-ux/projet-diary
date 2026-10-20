import { Link } from '../../lib/inertia-shim';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh overflow-hidden">
            <div
                className="relative hidden flex-col justify-between overflow-hidden p-14 lg:flex lg:w-1/2"
                style={{ background: '#17352d' }}
            >
                <div
                    className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full opacity-10"
                    style={{ background: '#b88a12' }}
                />
                <div
                    className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full opacity-[0.07]"
                    style={{ background: '#eadbc9' }}
                />
                <div
                    className="absolute left-0 top-1/2 h-px w-full opacity-10"
                    style={{ background: '#eadbc9' }}
                />

                <Link href={home()} className="group relative z-10 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-all duration-500">
                        <span className="serif text-2xl font-bold text-[#f9f7f2]">D</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold leading-none tracking-tight text-[#f9f7f2] uppercase transition-colors duration-500">
                            Diary
                        </h1>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#eadbc9] transition-colors duration-500">
                            Madagascar
                        </p>
                    </div>
                </Link>

                <div className="relative z-10 space-y-8">
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#b88a12' }}>
                            Produits authentiques
                        </p>
                        <h2
                            className="mb-6 text-5xl font-bold leading-[1.1]"
                            style={{
                                color: '#f9f7f2',
                                fontFamily: "'Georgia', 'Times New Roman', serif",
                            }}
                        >
                            Le meilleur de
                            <br />
                            <span style={{ color: '#eadbc9' }}>Madagascar</span>
                        </h2>
                        <p className="max-w-sm text-base leading-relaxed" style={{ color: 'rgba(249,247,242,0.6)' }}>
                            Rejoignez Diary et accedez a une selection de produits soigneusement choisis,
                            avec une approche responsable et une logistique adaptee a l'export.
                        </p>
                    </div>

                    <div
                        className="rounded-2xl border p-6"
                        style={{
                            background: 'rgba(249,247,242,0.05)',
                            borderColor: 'rgba(249,247,242,0.1)',
                        }}
                    >
                        <div className="mb-3 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="h-3.5 w-3.5" style={{ fill: '#b88a12' }} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="mb-4 text-sm italic leading-relaxed" style={{ color: 'rgba(249,247,242,0.75)' }}>
                            "Une selection serieuse, une communication claire et une vraie attention a la qualite."
                        </p>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                                style={{ background: '#b88a12', color: '#17352d' }}
                            >
                                D
                            </div>
                            <div>
                                <p className="text-xs font-semibold" style={{ color: '#f9f7f2' }}>
                                    Equipe Diary
                                </p>
                                <p className="text-xs" style={{ color: 'rgba(249,247,242,0.45)' }}>
                                    Madagascar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p
                    className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-[10px] font-bold uppercase tracking-[0.3em] md:flex-row"
                    style={{ color: 'rgba(249,247,242,0.3)', letterSpacing: '0.08em' }}
                >
                    (c) Diary. Madagascar et export international
                </p>
            </div>

            <div
                className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16"
                style={{ background: '#f9f7f2' }}
            >
                <div className="mb-10 flex flex-col items-center gap-3 lg:hidden">
                    <Link href={home()} className="flex items-center gap-3">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-full"
                            style={{ background: '#17352d' }}
                        >
                            <span className="serif text-2xl font-bold text-[#f9f7f2]">D</span>
                        </div>
                        <span
                            className="text-base font-bold uppercase tracking-widest"
                            style={{ color: '#17352d' }}
                        >
                            Diary
                        </span>
                    </Link>
                </div>

                <div className="w-full max-w-[420px]">
                    <div className="mb-8">
                        <div
                            className="mb-3 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.3em]"
                            style={{ background: 'rgba(23,53,45,0.08)', color: '#17352d' }}
                        >
                            Authentification
                        </div>
                        <h1
                            className="mb-2 text-3xl font-bold"
                            style={{
                                color: '#17352d',
                                fontFamily: "'Georgia', 'Times New Roman', serif",
                            }}
                        >
                            {title}
                        </h1>
                        <p className="text-sm" style={{ color: 'rgba(23,53,45,0.55)' }}>
                            {description}
                        </p>
                    </div>

                    <div
                        className="rounded-2xl border p-8 shadow-sm"
                        style={{
                            background: '#ffffff',
                            borderColor: 'rgba(23,53,45,0.08)',
                        }}
                    >
                        {children}
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-px flex-1" style={{ background: 'rgba(23,53,45,0.1)' }} />
                        <span className="text-xs" style={{ color: 'rgba(23,53,45,0.35)', letterSpacing: '0.08em' }}>
                            Qualite - Export - Madagascar
                        </span>
                        <div className="h-px flex-1" style={{ background: 'rgba(23,53,45,0.1)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
