export type Origin = 'Madagascar' | 'Maroc';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | null;
  poids_unitaire_kg?: number;
  origin: Origin;
  category: string;
  image: string;
  origine_details?: string | null;
  calibre_variete?: string | null;
  conditionnement?: string | null;
  methode_extraction?: string | null;
  moq?: string | null;
  certifications?: string | null;
  saisonnalite?: string | null;
  utilisation?: string | null;
  featured?: boolean;
  contact_href?: string;
  review_average?: number | null;
  review_count?: number;
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: number;
  note: number;
  commentaire?: string | null;
  date?: string | null;
  client_name: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  image?: string | null;
  status: 'brouillon' | 'publie' | 'archive';
  published_at?: string | null;
  author?: string;
  category?: {
    id: number;
    name: string;
    description?: string | null;
  } | null;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Language = 'FR' | 'EN';

export interface Translation {
  nav: {
    home: string;
    madagascar: string;
    maroc: string;
    history: string;
    quality: string;
    pro: string;
    faq: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    orderBtn: string;
    discoverBtn: string;
  };
  sections: {
    credibility: string[];
    featured: string;
    proTitle: string;
    proText: string;
    proBtn: string;
    sampleBtn: string;
  };
}
