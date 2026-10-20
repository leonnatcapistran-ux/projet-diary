<?php

namespace App\Repositories;

use App\Interfaces\ArticleRepositoryInterface;
use App\Models\Article;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function __construct(private readonly Article $model)
    {
    }

    public function paginate(array $filters = [], int $perPage = 5): LengthAwarePaginator
    {
        return $this->model->newQuery()
            ->with(['user', 'categorieArticle'])
            ->when(
                isset($filters['search']) && $filters['search'] !== '',
                fn ($query) => $query->where(function ($sub) use ($filters) {
                    $sub->where('titre', 'like', '%'.$filters['search'].'%')
                        ->orWhere('contenu', 'like', '%'.$filters['search'].'%')
                        ->orWhere('extrait', 'like', '%'.$filters['search'].'%');
                })
            )
            ->when(
                isset($filters['statut']) && $filters['statut'] !== '',
                fn ($query) => $query->where('statut', $filters['statut'])
            )
            ->when(
                isset($filters['categorie_id']) && $filters['categorie_id'] !== '',
                fn ($query) => $query->where('categorie_id', $filters['categorie_id'])
            )
            ->orderByDesc('date_publication')
            ->orderByDesc('id_article')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function latestPublished(int $limit = 3): Collection
    {
        return $this->model->newQuery()
            ->where('statut', 'publie')
            ->with(['user', 'categorieArticle'])
            ->orderByDesc('date_publication')
            ->orderByDesc('id_article')
            ->limit($limit)
            ->get();
    }

    public function find(int $id): ?Article
    {
        return $this->model->newQuery()
            ->with(['user', 'categorieArticle'])
            ->find($id);
    }

    public function findPublishedBySlug(string $slug): ?Article
    {
        return $this->model->newQuery()
            ->with(['user', 'categorieArticle'])
            ->where('statut', 'publie')
            ->where('slug', $slug)
            ->first();
    }

    public function create(array $data): Article
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(Article $article, array $data): Article
    {
        $article->fill($data);
        $article->save();

        return $article;
    }

    public function delete(Article $article): void
    {
        $article->delete();
    }
}
