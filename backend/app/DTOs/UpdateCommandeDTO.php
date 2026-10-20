<?php

namespace App\DTOs;

final class UpdateCommandeDTO
{
    public function __construct(
        public readonly ?string $statut,
        public readonly ?string $numero_suivi,
        public readonly ?string $date_livraison_estimee,
        public readonly ?string $mode_transport,
        public readonly ?float $cout_transport,
        public readonly ?float $montant_ht,
        public readonly ?string $adresse_livraison,
        public readonly ?string $pays_livraison,
        public readonly ?float $poids_total_kg,
    ) {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            statut: $data['statut'] ?? null,
            numero_suivi: $data['numero_suivi'] ?? null,
            date_livraison_estimee: $data['date_livraison_estimee'] ?? null,
            mode_transport: $data['mode_transport'] ?? null,
            cout_transport: isset($data['cout_transport']) ? (float) $data['cout_transport'] : null,
            montant_ht: isset($data['montant_ht']) ? (float) $data['montant_ht'] : null,
            adresse_livraison: $data['adresse_livraison'] ?? null,
            pays_livraison: $data['pays_livraison'] ?? null,
            poids_total_kg: isset($data['poids_total_kg']) ? (float) $data['poids_total_kg'] : null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'statut' => $this->statut,
            'date_statut' => $this->statut ? now() : null,
            'numero_suivi' => $this->numero_suivi,
            'date_livraison_estimee' => $this->date_livraison_estimee,
            'mode_transport' => $this->mode_transport,
            'cout_transport' => $this->cout_transport,
            'montant_ht' => $this->montant_ht,
            'adresse_livraison' => $this->adresse_livraison,
            'pays_livraison' => $this->pays_livraison,
            'poids_total_kg' => $this->poids_total_kg,
        ], static fn ($value) => $value !== null);
    }
}
