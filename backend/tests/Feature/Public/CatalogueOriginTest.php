<?php

namespace Tests\Feature\Public;

use App\Models\Produit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogueOriginTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalogue_products_display_madagascar_as_origin(): void
    {
        Produit::query()->create([
            'nom' => 'Vanille Bourbon',
            'description' => 'Produit test',
            'pays_origine' => 'MDG',
            'categorie' => 'Epices',
            'stock_disponible' => 10,
            'poids_unitaire_kg' => 1,
            'prix_unitaire_kg' => 20,
            'image_url' => null,
            'statut' => 'actif',
        ]);

        $this->getJson('/api/catalogue')
            ->assertOk()
            ->assertJsonPath('products.0.origin', 'MADAGASCAR');
    }
}
