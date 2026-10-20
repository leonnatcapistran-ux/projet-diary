<?php

namespace App\Http\Requests\Client;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class StoreAvisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_produit' => ['required', 'integer', 'exists:produits,id_produit'],
            'id_commande' => ['required', 'integer', 'exists:commandes,id_commande'],
            'note' => ['required', 'integer', 'min:1', 'max:5'],
            'commentaire' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::storeAvis();
    }
}
