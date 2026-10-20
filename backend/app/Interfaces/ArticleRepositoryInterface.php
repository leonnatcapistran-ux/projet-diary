<?php

namespace App\Interfaces;

use App\Models\Article;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ArticleRepositoryInterface
{
    public function paginate(array $filters = [], int $perPage = 5): LengthAwarePaginator;

    public function latestPublished(int $limit = 3);

    public function find(int $id): ?Article;

    public function findPublishedBySlug(string $slug): ?Article;

    public function create(array $data): Article;

    public function update(Article $article, array $data): Article;

    public function delete(Article $article): void;
}
