<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreateArticleDTO;
use App\DTOs\UpdateArticleDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreArticleRequest;
use App\Http\Requests\Admin\UpdateArticleRequest;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function __construct(private readonly ArticleService $service)
    {
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'statut', 'categorie_id']);
        $perPage = (int) $request->query('per_page', 5);
        $articles = $this->service->paginate($filters, $perPage);
        $categories = \App\Models\CategorieArticle::query()
            ->orderBy('nom')
            ->get(['id_categorie_article', 'nom']);

        return response()->json([
            'articles' => $articles,
            'filters' => $filters,
            'categories' => $categories,
        ]);
    }

    public function store(StoreArticleRequest $request): JsonResponse
    {
        $payload = $request->validated();
        $userId = $request->user()?->id_user ?? $request->user()?->id ?? null;
        $dto = CreateArticleDTO::fromArray([
            ...$payload,
            'user_id' => $userId,
        ]);

        $article = $this->service->create(
            $dto,
            $request->file('image')
        );

        return response()->json($article, 201);
    }

    public function update(UpdateArticleRequest $request, Article $article): JsonResponse
    {
        $payload = $request->validated();
        $dto = UpdateArticleDTO::fromArray($payload);

        $updated = $this->service->update(
            $article,
            $dto,
            $request->file('image')
        );

        return response()->json($updated);
    }

    public function destroy(Article $article): JsonResponse
    {
        $this->service->delete($article);

        return response()->json(null, 204);
    }
}
