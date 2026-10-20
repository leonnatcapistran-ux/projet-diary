<?php

namespace App\Http\Requests\Client;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class StoreMessageContactRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $name = $this->input('name');
        $subject = $this->input('sujet');
        $product = $this->input('product');

        if (! is_string($subject) || $subject === '') {
            $subject = is_string($product) && $product !== '' ? 'demande_produit' : 'partenariat';
        }

        $this->merge([
            'nom' => $this->input('nom', $name),
            'sujet' => $subject,
        ]);
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:191'],
            'sujet' => ['required', 'in:partenariat,demande_produit,livraison,autre'],
            'message' => ['required', 'string'],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:191'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::storeMessageContact();
    }
}
