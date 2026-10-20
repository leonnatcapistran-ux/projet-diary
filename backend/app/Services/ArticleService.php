<?php

namespace App\Services;

use App\DTOs\CreateArticleDTO;
use App\DTOs\UpdateArticleDTO;
use App\Interfaces\ArticleRepositoryInterface;
use App\Models\Article;
use App\Models\CategorieArticle;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ArticleService
{
    public function __construct(private readonly ArticleRepositoryInterface $repository)
    {
    }

    public function paginate(array $filters = [], int $perPage = 5): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function paginatePublished(array $filters = [], int $perPage = 12)
    {
        $filters['statut'] = 'publie';

        return $this->repository->paginate($filters, $perPage);
    }

    public function findPublishedBySlug(string $slug)
    {
        return $this->repository->findPublishedBySlug($slug);
    }

    public function latestPublished(int $limit = 3): Collection
    {
        return Cache::remember('latest_published_articles', 3600, function () use ($limit) {
            return $this->repository->latestPublished($limit);
        });
    }

    public function find(int $id): ?Article
    {
        return $this->repository->find($id);
    }

    public function create(CreateArticleDTO $dto, ?UploadedFile $image = null): Article
    {
        $data = $this->resolveCategoryData($dto->toArray());

        if ($image) {
            $path = $image->store('articles', 'public');
            $data['image_url'] = Storage::url($path);
        }

        if (($data['statut'] ?? 'brouillon') === 'publie' && empty($data['date_publication'])) {
            $data['date_publication'] = now()->toDateTimeString();
        }

        return $this->repository->create($data);
    }

    public function update(Article $article, UpdateArticleDTO $dto, ?UploadedFile $image = null): Article
    {
        $data = $this->resolveCategoryData($dto->toArray());

        if ($image) {
            if ($article->image_url && str_starts_with($article->image_url, '/storage/')) {
                $relativePath = ltrim(str_replace('/storage/', '', $article->image_url), '/');
                Storage::disk('public')->delete($relativePath);
            }

            $path = $image->store('articles', 'public');
            $data['image_url'] = Storage::url($path);
        } else {
            $data['image_url'] = $data['image_url'] ?? $article->image_url;
        }

        if (($data['statut'] ?? $article->statut) === 'publie' && empty($data['date_publication'])) {
            $data['date_publication'] = now()->toDateTimeString();
        }

        return $this->repository->update($article, $data);
    }

    public function delete(Article $article): void
    {
        if ($article->image_url && str_starts_with($article->image_url, '/storage/')) {
            $relativePath = ltrim(str_replace('/storage/', '', $article->image_url), '/');
            Storage::disk('public')->delete($relativePath);
        }

        $this->repository->delete($article);
    }

    public function publish(Article $article): Article
    {
        $article->update(['statut' => 'publie', 'date_publication' => now()]);

        return $article;
    }

    public function archive(Article $article): Article
    {
        $article->update(['statut' => 'archive']);

        return $article;
    }

    private function resolveCategoryData(array $data): array
    {
        if (!empty($data['categorie']) && Schema::hasTable('categorie_articles')) {
            $category = CategorieArticle::firstOrCreate(
                ['nom' => $data['categorie']],
                ['description' => null]
            );

            $data['categorie_id'] = $category->id_categorie_article;
        }

        unset($data['categorie']);

        return $data;
    }
}
