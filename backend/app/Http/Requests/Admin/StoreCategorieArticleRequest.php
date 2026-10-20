<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategorieArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom'         => ['required', 'string', 'max:100', 'unique:categorie_articles,nom'],
            'description' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::storeCategorieArticle();
    }
}
