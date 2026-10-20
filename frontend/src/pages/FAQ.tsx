import { Link } from '../lib/inertia-shim';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from "react";
import PublicLayout from '../components/public-layout';

type Category = 'all' | 'products' | 'shipping' | 'payment' | 'quality';

interface FAQ {
    cat: Category;
    q: string;
    a: string;
}

export default function FAQ() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [openItems, setOpenItems] = useState<number[]>([]);

    const faqs: FAQ[] = [
        { cat: "products", q: "Quels produits exportez-vous depuis Madagascar ?", a: "Nous exportons de la vanille bourbon premium, du cacao fin, de la poudre de baobab, des poivres sauvages (noir, vert, rose) et d'autres épices endémiques de Madagascar." },
        { cat: "products", q: "Quels produits proposez-vous du Maroc ?", a: "Notre gamme marocaine comprend l'huile d'argan cosmétique et alimentaire, le savon noir beldi, le ghassoul, et une sélection d'épices (cumin, ras el hanout, safran)." },
        { cat: "shipping", q: "Dans quels pays livrez-vous ?", a: "Nous livrons dans plus de 40 pays à travers l'Europe, l'Amérique du Nord, l'Asie et le Moyen-Orient. Contactez-nous pour vérifier la disponibilité dans votre pays." },
        { cat: "shipping", q: "Quels sont les délais de livraison ?", a: "Les délais varient selon la destination : 5-10 jours pour l'Europe, 10-15 jours pour l'Amérique et l'Asie. Les expéditions maritimes prennent 4-6 semaines." },
        { cat: "payment", q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons les virements bancaires internationaux (SWIFT), les lettres de crédit (L/C), et PayPal pour les commandes inférieures à 5 000€." },
        { cat: "payment", q: "Proposez-vous des facilités de paiement B2B ?", a: "Oui, après validation de votre dossier, nous proposons un paiement à 30 ou 60 jours pour les clients réguliers." },
        { cat: "quality", q: "Vos produits sont-ils certifiés biologiques ?", a: "La majorité de nos produits sont certifiés Bio EU et USDA Organic. Nous fournissons tous les certificats nécessaires à l'import." },
        { cat: "quality", q: "Comment garantissez-vous la qualité ?", a: "Chaque lot est contrôlé en laboratoire indépendant. Nous fournissons les analyses (taux de vanilline, acidité, pureté) avec chaque expédition." },
    ];

    const categories = [
        { id: 'all', label: 'Toutes' },
        { id: 'products', label: 'Produits' },
        { id: 'shipping', label: 'Livraison' },
        { id: 'payment', label: 'Paiement' },
        { id: 'quality', label: 'Qualité' }
    ];

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.cat === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <PublicLayout>
            {/* Section Hero avec background forest */}
            <section className="bg-forest text-white">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mt-18 mb-8">
                        <h1 className="text-5xl font-bold text-white mb-2">
                            Foire aux Questions
                        </h1>
                        <p className="text-xl text-white/80">
                            Trouvez rapidement les réponses à vos questions
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm text-gray-900"
                            placeholder="Rechercher une question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Section des filtres et FAQ */}
            <div className="bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id as Category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-3">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => {
                                const originalIndex = faqs.indexOf(faq);
                                const isOpen = openItems.includes(originalIndex);
                                
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <button
                                            onClick={() => toggleItem(originalIndex)}
                                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-medium text-gray-900 pr-4">
                                                {faq.q}
                                            </span>
                                            {isOpen ? (
                                                <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                            )}
                                        </button>
                                        
                                        {isOpen && (
                                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                                <p className="text-gray-700">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                <p className="text-gray-500 text-lg">
                                    Aucune question ne correspond à votre recherche
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                    }}
                                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Help Section */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600">
                            Vous ne trouvez pas la réponse à votre question ?{'\u00A0'}
                            <Link href="/nous-contacter" className="text-green-600 hover:text-green-700 font-medium">
                                Contactez-nous
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

