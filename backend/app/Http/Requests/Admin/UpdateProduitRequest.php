<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProduitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['sometimes', 'string', 'max:200'],
            'description' => ['nullable', 'string'],
            'origine_details' => ['nullable', 'string'],
            'calibre_variete' => ['nullable', 'string', 'max:255'],
            'pays_origine' => ['sometimes', 'in:MDG'],
            'categorie' => ['sometimes', 'string', 'max:100'],
            'stock_disponible' => ['sometimes', 'numeric', 'min:0'],
            'poids_unitaire_kg' => ['sometimes', 'numeric', 'min:0.001'],
            'prix_unitaire_kg' => ['sometimes', 'numeric', 'min:0'],
            'conditionnement' => ['nullable', 'string'],
            'methode_extraction' => ['nullable', 'string'],
            'moq' => ['nullable', 'string', 'max:100'],
            'certifications' => ['nullable', 'string', 'max:255'],
            'saisonnalite' => ['nullable', 'string', 'max:255'],
            'utilisation' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'statut' => ['sometimes', 'in:actif,inactif'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::updateProduit();
    }
}
