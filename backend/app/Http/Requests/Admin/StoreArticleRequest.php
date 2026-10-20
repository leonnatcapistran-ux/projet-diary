<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titre' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:articles,slug'],
            'extrait' => ['nullable', 'string', 'max:500'],
            'contenu' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'statut' => ['required', Rule::in(['brouillon', 'publie'])],
            'date_publication' => ['nullable', 'date'],
            'categorie_id' => ['nullable', 'integer', 'exists:categorie_articles,id_categorie_article'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::storeArticle();
    }
}
