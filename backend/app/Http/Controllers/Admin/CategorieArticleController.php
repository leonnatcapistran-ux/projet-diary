<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreateCategorieArticleDTO;
use App\DTOs\UpdateCategorieArticleDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategorieArticleRequest;
use App\Http\Requests\Admin\UpdateCategorieArticleRequest;
use App\Models\CategorieArticle;
use App\Services\CategorieArticleService;
use Illuminate\Http\JsonResponse;

class CategorieArticleController extends Controller
{
    public function __construct(private readonly CategorieArticleService $service) {}

    public function index()
    {
        $categories = $this->service->paginate(5);

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function store(StoreCategorieArticleRequest $request): JsonResponse
    {
        $dto = CreateCategorieArticleDTO::fromArray($request->validated());
        $category = $this->service->create($dto);

        return response()->json($category, 201);
    }

    public function update(UpdateCategorieArticleRequest $request, CategorieArticle $categorie_article): JsonResponse
    {
        $dto = UpdateCategorieArticleDTO::fromArray($request->validated());
        $updated = $this->service->update($categorie_article, $dto);

        return response()->json($updated);
    }

    public function destroy(CategorieArticle $categorie_article): JsonResponse
    {
        $this->service->delete($categorie_article);

        return response()->json(null, 204);
    }
}
