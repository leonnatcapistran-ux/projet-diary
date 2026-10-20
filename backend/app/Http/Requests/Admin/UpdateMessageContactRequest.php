<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'statut' => ['required', 'in:non_lu,lu,traite'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::updateMessageContact();
    }
}
