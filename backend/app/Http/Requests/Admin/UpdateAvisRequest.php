<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAvisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'statut' => ['required', 'in:en_attente,publie,rejete'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::updateAvis();
    }
}
