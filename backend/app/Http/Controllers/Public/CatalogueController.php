<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\JsonResponse;

class CatalogueController extends Controller
{
    public function index(): JsonResponse
    {
        $produits = Produit::query()
            ->where('statut', 'actif')
            ->orderByDesc('id_produit')
            ->get()
            ->map(fn (Produit $produit) => $this->mapProduct($produit));

        $categories = $produits
            ->pluck('category')
            ->filter()
            ->unique()
            ->values()
            ->all();

        return response()->json([
            'origin' => null,
            'products' => $produits,
            'categories' => $categories,
            'meta' => [
                'title' => 'Exportation de Produits Agricoles et Artisanat de Madagascar',
                'subtitle' => "Spécialiste de la Vanille, Épices (Girofle, Poivre, Cannelle) et de l'Artisanat en Raphia authentique",
            ],
        ]);
    }

    private function mapProduct(Produit $produit): array
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
            'conditionnement' => $produit->conditionnement,
            'methode_extraction' => $produit->methode_extraction,
            'moq' => $produit->moq,
            'certifications' => $produit->certifications,
            'saisonnalite' => $produit->saisonnalite,
            'utilisation' => $produit->utilisation,
        ];
    }
}
