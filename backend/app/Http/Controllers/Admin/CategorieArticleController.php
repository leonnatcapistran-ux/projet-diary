<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreateCategorieArticleDTO;
use App\DTOs\UpdateCategorieArticleDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategorieArticleRequest;
use App\Http\Requests\Admin\UpdateCategorieArticleRequest;
use App\Models\CategorieArticle;
use App\Services\CategorieArticleService;
use Symfony\Component\HttpFoundation\Response;

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

        return redirect()->back()->with('success', 'Catégorie créée avec succès.');
    }

    public function update(UpdateCategorieArticleRequest $request, CategorieArticle $categorie_article): JsonResponse
    {
        $dto = UpdateCategorieArticleDTO::fromArray($request->validated());
        $this->service->update($categorie_article, $dto);

        return redirect()->back()->with('success', 'Catégorie mise à jour avec succès.');
    }

    public function destroy(CategorieArticle $categorie_article): JsonResponse
    {
        $this->service->delete($categorie_article);

        return redirect()->back()->with('success', 'Catégorie supprimée avec succès.');
    }
}
