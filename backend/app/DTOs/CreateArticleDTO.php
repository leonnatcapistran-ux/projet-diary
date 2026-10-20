<?php

namespace App\DTOs;

final class CreateArticleDTO
{
    public function __construct(
        public readonly ?int $user_id,
        public readonly string $titre,
        public readonly string $slug,
        public readonly ?string $extrait,
        public readonly string $contenu,
        public readonly ?string $image_url,
        public readonly string $statut,
        public readonly ?string $date_publication,
        public readonly ?int $categorie_id = null,
        public readonly ?string $categorie = null,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            user_id: isset($data['user_id']) ? (int) $data['user_id'] : null,
            titre: (string) $data['titre'],
            slug: (string) $data['slug'],
            extrait: isset($data['extrait']) && $data['extrait'] !== '' ? (string) $data['extrait'] : null,
            contenu: (string) $data['contenu'],
            image_url: isset($data['image_url']) && $data['image_url'] !== '' ? (string) $data['image_url'] : null,
            statut: (string) $data['statut'],
            date_publication: isset($data['date_publication']) && $data['date_publication'] !== '' ? (string) $data['date_publication'] : null,
            categorie_id: isset($data['categorie_id']) ? (int) $data['categorie_id'] : null,
            categorie: isset($data['categorie']) && $data['categorie'] !== '' ? (string) $data['categorie'] : null,
        );
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'titre' => $this->titre,
            'slug' => $this->slug,
            'extrait' => $this->extrait,
            'contenu' => $this->contenu,
            'image_url' => $this->image_url,
            'statut' => $this->statut,
            'date_publication' => $this->date_publication,
            'categorie_id' => $this->categorie_id,
            'categorie' => $this->categorie,
        ];
    }
}
