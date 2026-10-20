<?php

namespace Tests\Feature\Admin;

use App\Models\Commande;
use App\Models\Facture;
use App\Models\LigneCommande;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class OrdersTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_orders_page_includes_order_lines_and_products(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $client = User::factory()->create();

        $produit = Produit::query()->create([
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

        $commande = Commande::query()->create([
            'user_id' => $client->id_user,
            'date_commande' => now(),
            'pays_origine' => 'MDG',
            'statut' => 'en_attente',
            'montant_total' => 220,
            'type_achat' => 'standard',
            'adresse_livraison' => 'Antananarivo',
            'pays_livraison' => 'Madagascar',
            'mode_transport' => 'maritime',
            'cout_transport' => 20,
            'poids_total_kg' => 6,
            'num_telephone' => null,
            'email_valide' => null,
            'numero_suivi' => null,
        ]);

        LigneCommande::query()->create([
            'id_commande' => $commande->id_commande,
            'id_produit' => $produit->id_produit,
            'quantite_kg' => 6,
            'prix_unitaire' => 33.33,
            'sous_total' => 200,
        ]);

        Facture::query()->create([
            'id_commande' => $commande->id_commande,
            'numero_facture' => 'ASI-2026-000001',
            'date_emission' => now(),
            'montant_ht' => 200,
            'taux_tva' => 0,
            'montant_tva' => 0,
            'montant_ttc' => 220,
            'cout_transport' => 20,
            'mode_transport' => 'maritime',
            'mention_dernier_km' => true,
            'statut_paiement' => 'en_attente',
            'mode_paiement' => 'manuel',
            'payment_reference' => null,
        ]);

        $this->actingAs($admin)
            ->get(route('admin.commandes.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/Orders')
                ->has('commandes.data', 1)
                ->where('commandes.data.0.id_commande', $commande->id_commande)
                ->where('commandes.data.0.lignes.0.id_produit', $produit->id_produit)
                ->where('commandes.data.0.lignes.0.produit.nom', 'Vanille Bourbon')
                ->where('commandes.data.0.lignes.0.quantite_kg', '6.00')
                ->where('commandes.data.0.facture.montant_ht', '200.00')
                ->where('commandes.data.0.facture.cout_transport', '20.00')
            );
    }
}
