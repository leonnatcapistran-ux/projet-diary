<?php

namespace Tests\Feature\Public;

use App\Models\Produit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProductDetailFieldsTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_detail_exposes_each_dedicated_product_detail_field(): void
    {
        $product = Produit::query()->create([
            'nom' => 'Vanille Bourbon',
            'description' => 'Description du produit',
            'origine_details' => 'SAVA, Madagascar',
            'calibre_variete' => 'Gourmet, 14 à 18 cm',
            'pays_origine' => 'MDG',
            'categorie' => 'Épices',
            'stock_disponible' => 10,
            'poids_unitaire_kg' => 1,
            'prix_unitaire_kg' => 20,
            'conditionnement' => 'Sous vide',
            'methode_extraction' => 'Triée à la main',
            'certifications' => 'Taux d’humidité inférieur à 35 %',
            'saisonnalite' => 'À conserver au frais et au sec',
            'utilisation' => 'Pâtisserie et boissons',
            'statut' => 'actif',
        ]);

        $this->get(route('product.show', $product->id_produit))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ProductDetail')
                ->where('product.description', 'Description du produit')
                ->where('product.origine_details', 'SAVA, Madagascar')
                ->where('product.calibre_variete', 'Gourmet, 14 à 18 cm')
                ->where('product.conditionnement', 'Sous vide')
                ->where('product.methode_extraction', 'Triée à la main')
                ->where('product.certifications', 'Taux d’humidité inférieur à 35 %')
                ->where('product.saisonnalite', 'À conserver au frais et au sec')
                ->where('product.utilisation', 'Pâtisserie et boissons')
            );
    }
}
