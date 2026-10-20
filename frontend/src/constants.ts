import type { Language, Translation } from './types/types';

export const TRANSLATIONS: Record<Language, Translation> = {
  FR: {
    nav: {
      home: 'Accueil',
      madagascar: 'Madagascar',
      maroc: 'Maroc',
      history: 'Notre Histoire',
      quality: 'Qualite',
      pro: 'Espace Professionnel',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      title: "Deux Terres d'Excellence. Une Vision Internationale.",
      subtitle: "Diary exporte le meilleur du terroir de Madagascar vers le monde entier.",
      orderBtn: 'Commander',
      discoverBtn: 'Decouvrir nos origines',
    },
    sections: {
      credibility: ['Certifie Bio', 'Export International', 'Tracabilite Garantie', 'Paiement Securise'],
      featured: 'Produits Phares',
      proTitle: 'Espace Professionnel',
      proText: "Vous etes restaurateur, revendeur ou industriel ? Beneficiez de nos tarifs de gros et d'un accompagnement logistique sur mesure.",
      proBtn: 'Contactez-nous',
      sampleBtn: 'Voir nos produits',
    },
  },
  EN: {
    nav: {
      home: 'Home',
      madagascar: 'Madagascar',
      maroc: 'Morocco',
      history: 'Our History',
      quality: 'Quality',
      pro: 'Professional Area',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      title: 'A Madagascar story. A global ambition.',
      subtitle: 'Diary exports carefully sourced products from Madagascar to international markets.',
      orderBtn: 'Order Now',
      discoverBtn: 'Our Origins',
    },
    sections: {
      credibility: ['Certified Quality', 'International Export', 'Guaranteed Traceability', 'Secure Payment'],
      featured: 'Featured Products',
      proTitle: 'Professional Solutions',
      proText: 'Are you a chef, retailer, or manufacturer? Access our wholesale rates and dedicated logistics support.',
      proBtn: 'Contact Us',
      sampleBtn: 'Request Sample',
    },
  },
};
