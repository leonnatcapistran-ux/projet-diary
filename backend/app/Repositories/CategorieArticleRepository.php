<?php

namespace App\Repositories;

use App\Interfaces\CategorieArticleRepositoryInterface;
use App\Models\CategorieArticle;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategorieArticleRepository implements CategorieArticleRepositoryInterface
{
    public function __construct(private readonly CategorieArticle $model) {}

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->newQuery()
            ->withCount('articles')
            ->orderBy('nom')
            ->paginate($perPage);
    }

    public function find(int $id): ?CategorieArticle
    {
        return $this->model->newQuery()->find($id);
    }

    public function create(array $data): CategorieArticle
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(CategorieArticle $category, array $data): CategorieArticle
    {
        $category->fill($data);
        $category->save();

        return $category;
    }

    public function delete(CategorieArticle $category): void
    {
        $category->delete();
    }
}
