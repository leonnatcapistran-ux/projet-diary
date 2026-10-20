<?php

namespace App\Services;

use App\DTOs\CreateCategorieArticleDTO;
use App\DTOs\UpdateCategorieArticleDTO;
use App\Interfaces\CategorieArticleRepositoryInterface;
use App\Models\CategorieArticle;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategorieArticleService
{
    public function __construct(
        private readonly CategorieArticleRepositoryInterface $repository
    ) {}

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($perPage);
    }

    public function find(int $id): ?CategorieArticle
    {
        return $this->repository->find($id);
    }

    public function create(CreateCategorieArticleDTO $dto): CategorieArticle
    {
        return $this->repository->create($dto->toArray());
    }

    public function update(CategorieArticle $category, UpdateCategorieArticleDTO $dto): CategorieArticle
    {
        return $this->repository->update($category, $dto->toArray());
    }

    public function delete(CategorieArticle $category): void
    {
        $this->repository->delete($category);
    }
}
