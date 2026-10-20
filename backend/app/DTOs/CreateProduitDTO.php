<?php

namespace App\DTOs;

final class CreateProduitDTO
{
    public function __construct(
        public readonly string $nom,
        public readonly ?string $description,
        public readonly ?string $origine_details,
        public readonly ?string $calibre_variete,
        public readonly string $pays_origine,
        public readonly string $categorie,
        public readonly float $stock_disponible,
        public readonly float $poids_unitaire_kg,
        public readonly ?float $prix_unitaire_kg,
        public readonly ?string $conditionnement,
        public readonly ?string $methode_extraction,
        public readonly ?string $moq,
        public readonly ?string $certifications,
        public readonly ?string $saisonnalite,
        public readonly ?string $utilisation,
        public readonly ?string $image_url,
        public readonly string $statut,
    ) {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            nom: (string) $data['nom'],
            description: $data['description'] ?? null,
            origine_details: $data['origine_details'] ?? null,
            calibre_variete: $data['calibre_variete'] ?? null,
            pays_origine: (string) $data['pays_origine'],
            categorie: (string) $data['categorie'],
            stock_disponible: (float) $data['stock_disponible'],
            poids_unitaire_kg: (float) $data['poids_unitaire_kg'],
            prix_unitaire_kg: isset($data['prix_unitaire_kg']) ? (float) $data['prix_unitaire_kg'] : null,
            conditionnement: $data['conditionnement'] ?? null,
            methode_extraction: $data['methode_extraction'] ?? null,
            moq: $data['moq'] ?? null,
            certifications: $data['certifications'] ?? null,
            saisonnalite: $data['saisonnalite'] ?? null,
            utilisation: $data['utilisation'] ?? null,
            image_url: $data['image_url'] ?? null,
            statut: (string) $data['statut'],
        );
    }

    public function toArray(): array
    {
        return [
            'nom' => $this->nom,
            'description' => $this->description,
            'origine_details' => $this->origine_details,
            'calibre_variete' => $this->calibre_variete,
            'pays_origine' => $this->pays_origine,
            'categorie' => $this->categorie,
            'stock_disponible' => $this->stock_disponible,
            'poids_unitaire_kg' => $this->poids_unitaire_kg,
            'prix_unitaire_kg' => $this->prix_unitaire_kg,
            'conditionnement' => $this->conditionnement,
            'methode_extraction' => $this->methode_extraction,
            'moq' => $this->moq,
            'certifications' => $this->certifications,
            'saisonnalite' => $this->saisonnalite,
            'utilisation' => $this->utilisation,
            'image_url' => $this->image_url,
            'statut' => $this->statut,
        ];
    }
}
