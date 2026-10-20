<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreateArticleDTO;
use App\DTOs\UpdateArticleDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreArticleRequest;
use App\Http\Requests\Admin\UpdateArticleRequest;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{
    public function __construct(private readonly ArticleService $service)
    {
    }

    // public function index(Request $request)
    // {
    //     $filters = $request->only(['search', 'statut', 'categorie_id']);
    //     $perPage = (int) $request->query('per_page', 15);
    //     $articles = $this->service->paginate($filters, $perPage);

    //     if (! $request->wantsJson()) {
    //         return response()->json([
    //             'articles' => $articles,
    //             'filters' => $filters,
    //         ]);
    //     }

    //     return response()->json($articles);
    // }
    public function index(Request $request)
{
    $filters = $request->only(['search', 'statut', 'categorie_id']);
    $perPage = (int) $request->query('per_page', 5);
    $articles = $this->service->paginate($filters, $perPage);
    $categories = \App\Models\CategorieArticle::orderBy('nom')->get(['id_categorie_article', 'nom']); // ← ajouter

    if (! $request->wantsJson()) {
        return response()->json([
            'articles'   => $articles,
            'filters'    => $filters,
            'categories' => $categories, // ← ajouter
        ]);
    }

    return response()->json($articles);
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

        if ($request->wantsJson()) {
            return response()->json($article, 201);
        }

        return back()->with([
            'success' => $article->statut === 'publie'
                ? 'Article publie avec succes.'
                : 'Article enregistre comme brouillon avec succes.',
        ]);
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

        if ($request->wantsJson()) {
            return response()->json($updated);
        }

        return redirect()->back()->with('success', match ($updated->statut) {
            'publie' => 'Article publie avec succes.',
            'archive' => 'Article archive avec succes.',
            default => 'Article enregistre comme brouillon avec succes.',
        });
    }

    public function destroy(Article $article): JsonResponse
    {
        $this->service->delete($article);

        if (request()->wantsJson()) {
            return response()->json(null, 204);
        }

        return redirect()->back()->with('success', 'Article supprime avec succes.');
    }
}
