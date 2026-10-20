<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCommandeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'statut' => ['sometimes', 'in:confirmee,preparation,expediee,en_transit,livree,annulee'],
            'numero_suivi' => ['nullable', 'string', 'max:100'],
            'date_livraison_estimee' => ['nullable', 'date'],
            'mode_transport' => ['nullable', 'in:maritime,aerien'],
            'cout_transport' => ['nullable', 'numeric', 'min:0'],
            'montant_ht' => ['nullable', 'numeric', 'min:0'],
            'adresse_livraison' => ['nullable', 'string'],
            'pays_livraison' => ['nullable', 'string', 'max:80'],
            'poids_total_kg' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::updateCommande();
    }
}
