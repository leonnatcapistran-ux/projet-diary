<?php

namespace App\Http\Requests\Admin;

use App\Support\ValidationMessageCatalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategorieArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('categorie_article')?->id_categorie_article
            ?? $this->route('categorie_article');

        return [
            'nom'         => [
                'required',
                'string',
                'max:100',
                Rule::unique('categorie_articles', 'nom')->ignore($categoryId, 'id_categorie_article'),
            ],
            'description' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return ValidationMessageCatalog::updateCategorieArticle();
    }
}
