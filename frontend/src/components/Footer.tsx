import { Link } from '../lib/inertia-shim';
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import React from 'react';
import DiaryLogo from './Logo';

interface FooterLink {
    label: string;
    href: string;
    icon?: LucideIcon;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/share/18pRC4TqKB/',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#1877F2]">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.024 4.388 11.019 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.022 1.792-4.693 4.533-4.693 1.312 0 2.686.235 2.686.235v2.968H15.83c-1.49 0-1.956.93-1.956 1.885v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.092 24 18.097 24 12.073Z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/diarymadagascar?igsh=dG84ejNoaHNlOWN2',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4">
                <defs>
                    <linearGradient
                        id="instagram-gradient"
                        x1="0%"
                        x2="100%"
                        y1="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#F58529" />
                        <stop offset="50%" stopColor="#DD2A7B" />
                        <stop offset="100%" stopColor="#515BD4" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#instagram-gradient)"
                    d="M7.75 2h8.5A5.756 5.756 0 0 1 22 7.75v8.5A5.756 5.756 0 0 1 16.25 22h-8.5A5.756 5.756 0 0 1 2 16.25v-8.5A5.756 5.756 0 0 1 7.75 2Zm0 1.8A3.956 3.956 0 0 0 3.8 7.75v8.5a3.956 3.956 0 0 0 3.95 3.95h8.5a3.956 3.956 0 0 0 3.95-3.95v-8.5a3.956 3.956 0 0 0-3.95-3.95h-8.5Zm8.925 1.35a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25ZM12 6.865A5.135 5.135 0 1 1 6.865 12 5.141 5.141 0 0 1 12 6.865Zm0 1.8A3.335 3.335 0 1 0 15.335 12 3.339 3.339 0 0 0 12 8.665Z"
                />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#0A66C2]">
                <path d="M20.447 20.452H16.89V14.87c0-1.331-.027-3.044-1.856-3.044-1.857 0-2.142 1.45-2.142 2.949v5.677H9.336V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.269 2.372 4.269 5.456v6.285ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.552V9h3.567v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/261340366490',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12 .25 11.6 11.6 0 0 0 1.84 11.47c0 2 .54 3.95 1.57 5.64L.01 24l6.08-1.59A11.57 11.57 0 0 0 12 22.94a11.93 11.93 0 0 0 8.52-3.52 11.81 11.81 0 0 0 3.5-8.54 11.73 11.73 0 0 0-3.5-8.5Zm-8.9 16.03h-.01a9.4 9.4 0 0 1-4.82-1.32l-.35-.21-3.6.94.96-3.51-.22-.36A9.39 9.39 0 0 1 4.9 5.17a8.9 8.9 0 0 1 15.72 6.43 8.88 8.88 0 0 1-2.6 6.36 8.94 8.94 0 0 1-6.5 2.55Zm5.35-7.08c-.29-.14-1.71-.85-1.98-.95-.27-.1-.47-.14-.66.14-.19.29-.73.95-.9 1.14-.16.19-.33.21-.62.07-.29-.14-1.23-.46-2.34-1.45-.86-.76-1.44-1.71-1.61-2-.16-.29-.02-.45.12-.59.12-.12.29-.33.43-.5.14-.16.19-.27.29-.45.1-.19.05-.36-.02-.5-.07-.14-.66-1.6-.9-2.2-.24-.58-.49-.5-.66-.51-.17 0-.37-.01-.57-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.02 2.83 1.16 3.03c.14.19 2.01 3.07 4.87 4.3.68.29 1.21.46 1.62.59.68.21 1.3.18 1.79.11.55-.08 1.71-.7 1.95-1.37.24-.66.24-1.23.17-1.36-.07-.14-.27-.22-.56-.36Z" />
            </svg>
        ),
    },
] as const;

export default function Footer() {
    const footerColumns: FooterColumn[] = [
        {
            title: 'Liens utiles',
            links: [
                { label: 'Accueil', href: '/' },
                { label: 'À propos', href: '/a-propos' },
                { label: 'Nos produits', href: '/catalogue' },
                { label: 'Nos engagements', href: '/nos-engagements' },
                { label: 'Actualités', href: '/actualites' },
            ],
        },
        {
            title: 'Nos produits',
            links: [
                {
                    label: 'Épices & Saveurs (Vanille, Poivres, Girofle).',
                    href: '/catalogue',
                },
                {
                    label: 'Grains & Légumineuses (Café Vert, Haricots, Pois).',
                    href: '/catalogue',
                },
                { label: 'Matières Premières (Raphia).', href: '/catalogue' },
                {
                    label: 'Accessoires en Raphia (Sacs, Chapeaux, Pochettes).',
                    href: '/catalogue',
                },
                {
                    label: 'Décorations & Bijoux (Corne de zébu, Tapis, Bijoux). ',
                    href: '/catalogue',
                },
            ],
        },
        {
            title: 'Nous contacter',
            links: [
                {
                    label: '+261 34 03 664 90',
                    href: 'https://wa.me/261340366490',
                    icon: Phone,
                },
                {
                    label: 'contact@diary-madagascar.com',
                    href: 'mailto:contact@diary-madagascar.com',
                    icon: Mail,
                },
                {
                    label: 'Soavimbahoaka, Antananarivo, Madagascar',
                    href: '/nous-contacter',
                    icon: MapPin,
                },
            ],
        },
    ];

    return (
        <footer className="bg-[#0a0a0a] py-16 text-gray-400">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 text-center sm:grid-cols-2 sm:px-6 sm:text-left lg:grid-cols-4">
                <div className="flex flex-col items-center sm:items-start">
                    <DiaryLogo className="mb-4" />
                    <p className="mb-4 text-sm leading-relaxed">
                        Votre partenaire expert en exportation de produits
                        agricoles et artisanat de Madagascar. Qualité premium,
                        traçablité totale et engagement éthique pour les marchés
                        locaux et internationaux.
                    </p>
                    <div className="flex justify-center gap-3 sm:justify-start">
                        {socialLinks.map(({ label, href, icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-white/10"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
                {footerColumns.map((col) => (
                    <div key={col.title} className="min-w-0 text-center">
                        <h4 className="mb-4 text-sm font-bold text-white">
                            {col.title}
                        </h4>
                        <ul className="space-y-2">
                            {col.links.map((link) => {
                                const LinkIcon = link.icon;
                                return (
                                  <li key={link.label}>
    <a
        href={link.href}
        target="blank"
        className="text-xs leading-relaxed transition-colors hover:text-gold">
        <span className='flex items-start gap-2 justify-center'>
            {LinkIcon && (
                <LinkIcon className="h-4 w-4 text-gold shrink-0 mt-0.5" />
            )}
            <span className={`${LinkIcon === MapPin ? 'text-left break-all text-center' : 'text-center'}` }>{link.label}</span>
        </span>
    </a>
</li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mx-auto mt-12 max-w-7xl border-t border-gray-800 px-4 pt-6 text-center text-xs text-gray-600 sm:px-6">
                © 2026 Diary Madagascar. Tous droits réservés. L'origine, tout
                simplement.
            </div>
        </footer>
    );
}
