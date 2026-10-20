<?php

namespace App\DTOs;

final class CreateAvisDTO
{
    public function __construct(
        public readonly int $user_id,
        public readonly int $id_produit,
        public readonly int $id_commande,
        public readonly int $note,
        public readonly ?string $commentaire,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            user_id: (int) $data['user_id'],
            id_produit: (int) $data['id_produit'],
            id_commande: (int) $data['id_commande'],
            note: (int) $data['note'],
            commentaire: $data['commentaire'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'id_produit' => $this->id_produit,
            'id_commande' => $this->id_commande,
            'note' => $this->note,
            'commentaire' => $this->commentaire,
            'statut' => 'en_attente',
        ];
    }
}
