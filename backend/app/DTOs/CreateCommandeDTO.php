<?php

namespace App\DTOs;

class CreateCommandeDTO
{
    /**
     * @param array<int, array{id_produit:int, quantite_kg:float}> $items
     */
    public function __construct(
        public readonly array $items,
        public readonly string $adresse_livraison,
        public readonly string $pays_livraison,
        public readonly ?string $mode_transport,
        public readonly ?string $num_telephone,
        public readonly ?string $email_valide,
        public readonly string $type_achat = 'standard',
    ) {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            items: $data['items'],
            adresse_livraison: $data['adresse_livraison'],
            pays_livraison: $data['pays_livraison'],
            mode_transport: $data['mode_transport'] ?? null,
            num_telephone: $data['num_telephone'] ?? null,
            email_valide: $data['email_valide'] ?? null,
            type_achat: $data['type_achat'] ?? 'standard',
        );
    }
}
