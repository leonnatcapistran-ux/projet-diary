<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Avis;
use App\Models\Produit;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    public function index(): JsonResponse
    {
        $featuredProducts = Produit::query()
            ->where('statut', 'actif')
            ->inRandomOrder()
            ->limit(3)
            ->get()
            ->map(fn (Produit $produit) => $this->mapProduct($produit, true));

        $avisPublies = Avis::query()
            ->where('statut', 'publie')
            ->with(['user', 'produit'])
            ->orderByDesc('date_avis')
            ->limit(3)
            ->get();

        $testimonials = $avisPublies->map(fn (Avis $avis) => [
            'name' => trim(($avis->user->prenom ?? '').' '.($avis->user->nom ?? '')),
            'role' => $avis->produit->nom ?? 'Produit',
            'text' => $avis->commentaire ?? '',
        ])->toArray();

        $recentArticles = Article::query()
            ->where('statut', 'publie')
            ->orderByDesc('date_publication')
            ->orderByDesc('id_article')
            ->limit(3)
            ->get()
            ->map(fn (Article $article) => [
                'id' => $article->id_article,
                'title' => $article->titre,
                'slug' => $article->slug,
                'excerpt' => $article->extrait,
                'image' => $article->image_url,
                'published_at' => optional($article->date_publication)->toDateString(),
            ]);

        return response()->json([
            'featuredProducts' => $featuredProducts,
            'testimonials' => $testimonials,
            'recentArticles' => $recentArticles,
        ]);
    }

    private function mapProduct(Produit $produit, bool $featured = false): array
    {
        return [
            'id' => $produit->id_produit,
            'name' => $produit->nom,
            'description' => $produit->description,
            'origine_details' => $produit->origine_details,
            'calibre_variete' => $produit->calibre_variete,
            'price' => $produit->prix_unitaire_kg !== null ? (float) $produit->prix_unitaire_kg : null,
            'poids_unitaire_kg' => $produit->poids_unitaire_kg !== null ? (float) $produit->poids_unitaire_kg : 1.0,
            'origin' => 'MADAGASCAR',
            'category' => $produit->categorie,
            'image' => $produit->image_url ?: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
            'featured' => $featured,
        ];
    }
}
