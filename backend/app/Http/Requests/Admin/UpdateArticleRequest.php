<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $articleId = $this->route('article')?->id_article ?? $this->route('article');

        return [
            'titre' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('articles', 'slug')->ignore($articleId, 'id_article'),
            ],
            'extrait' => ['nullable', 'string', 'max:500'],
            'contenu' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'statut' => ['required', Rule::in(['brouillon', 'publie', 'archive'])],
            'date_publication' => ['nullable', 'date'],
            'categorie_id' => ['nullable', 'integer', 'exists:categorie_articles,id_categorie_article'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::updateArticle();
    }
}
