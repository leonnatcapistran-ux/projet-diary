<?php

namespace App\Http\Requests\Client;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommandeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'min:2'],
            'prenom' => ['required', 'string', 'min:2'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.id_produit' => ['required', 'integer', 'min:1'],
            'items.*.quantite_kg' => ['required', 'numeric', 'min:0.01'],
            'adresse_livraison' => ['required', 'string', 'min:3'],
            'pays_livraison' => ['required', 'string', 'min:2'],
            'num_telephone' => ['nullable', 'string', 'min:5'],
            'email_valide' => ['nullable', 'email'],
            'mode_transport' => ['nullable', 'in:maritime,aerien'],
            'type_achat' => ['nullable', 'in:standard,groupe'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::storeCommande();
    }
}
