<?php

namespace App\DTOs;

final class UpdateAvisDTO
{
    public function __construct(
        public readonly ?string $statut,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            statut: $data['statut'] ?? null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'statut' => $this->statut,
        ], static fn ($value) => $value !== null);
    }
}
