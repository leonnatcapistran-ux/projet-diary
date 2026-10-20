import React from 'react';
import PublicLayout from '../components/public-layout';
import HomePage from './Home/HomePage';

interface HomeProductProps {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price?: number | null;
  origin?: string;
  category?: string;
}

interface HomeArticleProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  published_at?: string;
  slug?: string;
}

interface HomeProps {
  featuredProducts?: HomeProductProps[];
  recentArticles?: HomeArticleProps[];
  testimonials?: Array<{ name: string; role: string; text: string }>;
}

const Home: React.FC<HomeProps> = ({ featuredProducts = [], recentArticles = [], testimonials = [] }) => {
  return (
    <PublicLayout>
      <HomePage featuredProducts={featuredProducts} recentArticles={recentArticles} testimonials={testimonials} />
    </PublicLayout>
  );
};

export default Home;
