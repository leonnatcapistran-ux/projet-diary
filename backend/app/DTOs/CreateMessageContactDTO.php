<?php

namespace App\DTOs;

final class CreateMessageContactDTO
{
    /**
     * @param array<int, array{id_produit:int, quantite_kg:float}>|null $produits_selectionnes
     */
    public function __construct(
        public readonly ?int $user_id,
        public readonly string $nom,
        public readonly string $email,
        public readonly string $sujet,
        public readonly string $message,
        public readonly ?array $produits_selectionnes = null,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            user_id: isset($data['user_id']) ? (int) $data['user_id'] : null,
            nom: (string) $data['nom'],
            email: (string) $data['email'],
            sujet: (string) $data['sujet'],
            message: (string) $data['message'],
            produits_selectionnes: $data['produits_selectionnes'] ?? null,
        );
    }

    public function toArray(): array
    {
        $payload = [
            'user_id' => $this->user_id,
            'nom' => $this->nom,
            'email' => $this->email,
            'sujet' => $this->sujet,
            'message' => $this->message,
            'statut' => 'non_lu',
        ];

        if ($this->produits_selectionnes !== null) {
            $payload['produits_selectionnes'] = $this->produits_selectionnes;
        }

        return $payload;
    }
}
