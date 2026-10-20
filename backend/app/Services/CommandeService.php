<?php

namespace App\Services;

use App\DTOs\CreateCommandeDTO;
use App\DTOs\UpdateCommandeDTO;
use App\Interfaces\CommandeRepositoryInterface;
use App\Interfaces\ProduitRepositoryInterface;
use App\Models\Commande;
use App\Models\Facture;
use App\Models\LigneCommande;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CommandeService
{
    public function __construct(
        private readonly CommandeRepositoryInterface $repository,
        private readonly ProduitRepositoryInterface $produitRepository,
        private readonly NotificationService $notificationService,
    )
    {
    }

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function find(int $id): ?Commande
    {
        return $this->repository->find($id);
    }

    public function update(Commande $commande, UpdateCommandeDTO $dto): Commande
    {
        $data = $dto->toArray();

        if (isset($data['statut'])) {
            $data['statut'] = $this->normalizeStatus($data['statut']);
        }

        $ht = $data['montant_ht'] ?? null;
        $transport = $data['cout_transport'] ?? null;
        if ($ht !== null || $transport !== null) {
            $resolvedHt = $ht !== null ? (float) $ht : (float) $commande->montant_total - (float) ($commande->cout_transport ?? 0);
            $resolvedTransport = $transport !== null ? (float) $transport : (float) ($commande->cout_transport ?? 0);
            $data['montant_total'] = max(0, $resolvedHt + $resolvedTransport);
        }

        $updated = $this->repository->update($commande, $data);

        if (isset($data['montant_total']) || isset($data['cout_transport']) || isset($data['mode_transport']) || isset($data['montant_ht'])) {
            $this->upsertFacture($updated);
        }

        if (isset($data['statut']) && $commande->user_id) {
            $label = $this->statusLabel($data['statut']);
            $this->notificationService->createForCommande(
                $updated,
                'commande',
                "Votre commande {$updated->id_commande} est maintenant: {$label}."
            );
        }

        return $updated;
    }

    public function delete(Commande $commande): void
    {
        $this->repository->delete($commande);
    }

    public function createManual(CreateCommandeDTO $dto, User $user): Commande
    {
        $items = $dto->items;
        $produits = [];
        $origins = [];
        $poidsTotal = 0.0;

        foreach ($items as $item) {
            $produit = $this->produitRepository->find((int) $item['id_produit']);

            if (!$produit) {
                throw ValidationException::withMessages([
                    'items' => 'Produit invalide dans la commande.',
                ]);
            }

            $produits[(int) $item['id_produit']] = $produit;
            $origins[$produit->pays_origine] = true;
            $poidsTotal += (float) $item['quantite_kg'];
        }

        $paysOrigine = count($origins) === 1 ? array_key_first($origins) : 'MIXTE';

        return DB::transaction(function () use ($dto, $user, $items, $produits, $paysOrigine, $poidsTotal) {
            $commande = $this->repository->create([
                'user_id' => $user->id_user,
                'pays_origine' => $paysOrigine,
                'statut' => 'en_attente',
                'date_statut' => null,
                'montant_total' => 0,
                'type_achat' => $dto->type_achat,
                'adresse_livraison' => $dto->adresse_livraison,
                'pays_livraison' => $dto->pays_livraison,
                'mode_transport' => $dto->mode_transport,
                'cout_transport' => 0,
                'poids_total_kg' => $poidsTotal,
                'numero_suivi' => null,
                'date_livraison_estimee' => null,
                'num_telephone' => $dto->num_telephone,
                'email_valide' => $dto->email_valide,
            ]);

            foreach ($items as $item) {
                LigneCommande::create([
                    'id_commande' => $commande->id_commande,
                    'id_produit' => (int) $item['id_produit'],
                    'quantite_kg' => (float) $item['quantite_kg'],
                    'prix_unitaire' => 0,
                    'sous_total' => 0,
                ]);
            }

            $admins = User::query()
                ->where('role', 'admin')
                ->pluck('id_user')
                ->all();

            foreach ($admins as $adminId) {
                $this->notificationService->createForUserCommande(
                    (int) $adminId,
                    $commande,
                    'commande',
                    'Nouvelle commande en attente de chiffrage.'
                );
            }

            return $commande->load(['lignes']);
        });
    }

    private function normalizeStatus(string $statut): string
    {
        return match ($statut) {
            'confirmée' => 'confirmee',
            'préparation' => 'preparation',
            'expédiée' => 'expediee',
            'livrée' => 'livree',
            'annulée' => 'annulee',
            default => $statut,
        };
    }

    private function statusLabel(string $statut): string
    {
        return match ($statut) {
            'confirmee' => 'Confirmee',
            'preparation' => 'Preparation',
            'expediee' => 'Expediee',
            'en_transit' => 'En transit',
            'livree' => 'Livree',
            'annulee' => 'Annulee',
            'en_attente' => 'En attente',
            default => $statut,
        };
    }

    private function upsertFacture(Commande $commande): void
    {
        $montantTtc = (float) $commande->montant_total;
        $coutTransport = (float) ($commande->cout_transport ?? 0);
        $montantHt = max(0, $montantTtc - $coutTransport);

        $factureData = [
            'id_commande' => $commande->id_commande,
            'numero_facture' => $this->numeroFacture($commande->id_commande),
            'date_emission' => now(),
            'montant_ht' => $montantHt,
            'taux_tva' => 0,
            'montant_tva' => 0,
            'montant_ttc' => $montantTtc,
            'cout_transport' => $coutTransport,
            'mode_transport' => $commande->mode_transport,
            'mention_dernier_km' => true,
            'statut_paiement' => 'en_attente',
            'mode_paiement' => 'manuel',
            'payment_reference' => null,
        ];

        Facture::query()->updateOrCreate(
            ['id_commande' => $commande->id_commande],
            $factureData
        );
    }

    private function numeroFacture(int $idCommande): string
    {
        return 'ASI-' . now()->year . '-' . str_pad((string) $idCommande, 6, '0', STR_PAD_LEFT);
    }
}
