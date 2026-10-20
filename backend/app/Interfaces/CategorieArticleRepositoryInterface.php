<?php

namespace App\Interfaces;

use App\Models\CategorieArticle;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CategorieArticleRepositoryInterface
{
    public function paginate(int $perPage = 15): LengthAwarePaginator;
    public function find(int $id): ?CategorieArticle;
    public function create(array $data): CategorieArticle;
    public function update(CategorieArticle $category, array $data): CategorieArticle;
    public function delete(CategorieArticle $category): void;
}
