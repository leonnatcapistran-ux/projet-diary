<?php

namespace Tests\Feature\Public;

use App\Models\Produit;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

        $this->getJson("/api/produit/{$product->id_produit}")
            ->assertOk()
            ->assertJsonPath('product.description', 'Description du produit')
            ->assertJsonPath('product.origine_details', 'SAVA, Madagascar')
            ->assertJsonPath('product.calibre_variete', 'Gourmet, 14 à 18 cm')
            ->assertJsonPath('product.conditionnement', 'Sous vide')
            ->assertJsonPath('product.methode_extraction', 'Triée à la main')
            ->assertJsonPath('product.certifications', 'Taux d’humidité inférieur à 35 %')
            ->assertJsonPath('product.saisonnalite', 'À conserver au frais et au sec')
            ->assertJsonPath('product.utilisation', 'Pâtisserie et boissons')
            ->assertJsonPath('meta.catalogue_href', '/catalogue')
            ->assertJsonPath('meta.contact_href', '/nous-contacter?produit=Vanille+Bourbon');
    }
}
