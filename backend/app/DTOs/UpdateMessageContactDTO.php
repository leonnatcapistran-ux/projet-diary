<?php

namespace App\DTOs;

final class UpdateMessageContactDTO
{
    public function __construct(
        public readonly ?string $statut,
        public readonly ?string $reponse_admin,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            statut: $data['statut'] ?? null,
            reponse_admin: $data['reponse_admin'] ?? null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'statut' => $this->statut,
            'reponse_admin' => $this->reponse_admin,
            'date_traitement' => $this->reponse_admin ? now() : null,
        ], static fn ($value) => $value !== null);
    }
}
