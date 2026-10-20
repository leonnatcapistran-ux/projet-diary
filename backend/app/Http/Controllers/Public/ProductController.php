<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Produit;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function show(int $id): JsonResponse
    {
        $produit = Produit::query()
            ->with([
                'avis' => fn ($query) => $query
                    ->where('statut', 'publie')
                    ->latest('date_avis')
                    ->with('user'),
            ])
            ->where('id_produit', $id)
            ->firstOrFail();

        $product = $this->mapProduct($produit);

        $related = Produit::query()
            ->where('statut', 'actif')
            ->where('categorie', $produit->categorie)
            ->where('id_produit', '!=', $produit->id_produit)
            ->orderByDesc('id_produit')
            ->limit(3)
            ->get()
            ->map(fn (Produit $p) => $this->mapProduct($p));

        return response()->json([
            'product' => $product,
            'relatedProducts' => $related,
            'meta' => [
                'contact_href' => route('contact.index', ['produit' => $produit->nom]),
                'catalogue_href' => route('catalogue.index'),
            ],
        ]);
    }

    private function mapProduct(Produit $produit): array
    {
        $publishedReviews = $produit->avis ?? collect();
        $reviewCount = $publishedReviews->count();
        $reviewAverage = $reviewCount > 0
            ? round((float) $publishedReviews->avg('note'), 1)
            : null;

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
            'conditionnement' => $produit->conditionnement,
            'methode_extraction' => $produit->methode_extraction,
            'moq' => $produit->moq,
            'certifications' => $produit->certifications,
            'saisonnalite' => $produit->saisonnalite,
            'utilisation' => $produit->utilisation,
            'contact_href' => route('contact.index', ['produit' => $produit->nom]),
            'review_average' => $reviewAverage,
            'review_count' => $reviewCount,
            'reviews' => $publishedReviews
                ->map(fn (Avis $avis) => [
                    'id' => $avis->id_avis,
                    'note' => (int) $avis->note,
                    'commentaire' => $avis->commentaire,
                    'date' => optional($avis->date_avis)->toDateString(),
                    'client_name' => trim(sprintf(
                        '%s %s',
                        $avis->user?->prenom ?? '',
                        $avis->user?->nom ?? ''
                    )) ?: 'Client',
                ])
                ->values()
                ->all(),
        ];
    }
}
