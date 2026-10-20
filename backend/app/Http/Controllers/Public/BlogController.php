<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function __construct(private readonly ArticleService $service)
    {
    }

    public function index(): JsonResponse
    {
        $articles = $this->service->paginatePublished(perPage: 9);

        return response()->json([
            'articles' => $articles->through(fn ($article) => $this->mapArticle($article)),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $article = $this->service->findPublishedBySlug($slug);

        abort_if($article === null, 404);

        $latest = $this->service->latestPublished(3)
            ->where('id_article', '!=', $article->id_article)
            ->take(3)
            ->map(fn (Article $item) => $this->mapArticle($item))
            ->values();

        return response()->json([
            'article' => $this->mapArticle($article, withContent: true),
            'latestArticles' => $latest,
        ]);
    }

    private function mapArticle(Article $article, bool $withContent = false): array
    {
        return [
            'id' => $article->id_article,
            'title' => $article->titre,
            'slug' => $article->slug,
            'excerpt' => $article->extrait,
            'content' => $withContent ? $article->contenu : null,
            'image' => $article->image_url,
            'status' => $article->statut,
            'published_at' => optional($article->date_publication)->toDateString(),
            'author' => ($article->user?->role ?? null) === 'admin'
                ? 'Equipe Diary'
                : (trim(sprintf('%s %s', $article->user?->prenom ?? '', $article->user?->nom ?? '')) ?: 'Equipe Diary'),
            'category' => $article->categorieArticle ? [
                'id' => $article->categorieArticle->id_categorie_article,
                'name' => $article->categorieArticle->nom,
                'description' => $article->categorieArticle->description,
            ] : null,
        ];
    }
}
