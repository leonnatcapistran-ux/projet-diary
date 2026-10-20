<?php

namespace App\DTOs;

class UpdateCategorieArticleDTO
{
    public function __construct(
        public readonly string $nom,
        public readonly ?string $description,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            nom: $data['nom'],
            description: $data['description'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'nom'         => $this->nom,
            'description' => $this->description,
        ];
    }
}
