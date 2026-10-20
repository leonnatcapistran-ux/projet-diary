<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreateProduitDTO;
use App\DTOs\UpdateProduitDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProduitRequest;
use App\Http\Requests\Admin\UpdateProduitRequest;
use App\Models\Produit;
use App\Services\ProduitService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{
    public function __construct(private readonly ProduitService $service)
    {
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'statut']);
        $perPage = (int) $request->query('per_page', 5);
        $produits = $this->service->paginate($filters, $perPage);

        if (!$request->wantsJson()) {
            return response()->json([
                'produits' => $produits,
                'filters' => $filters,
            ]);
        }

        return response()->json($produits);
    }

    public function store(StoreProduitRequest $request): JsonResponse
    {
        $payload = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('produits', 'public');
            $payload['image_url'] = Storage::url($path);
        }

        $dto = CreateProduitDTO::fromRequest($payload);
        $produit = $this->service->create($dto);

        return response()->json($produit, 201);
    }

    public function update(UpdateProduitRequest $request, Produit $produit): JsonResponse
    {
        $payload = $request->validated();

        if ($request->hasFile('image')) {
            if ($produit->image_url && str_starts_with($produit->image_url, '/storage/')) {
                $relativePath = ltrim(str_replace('/storage/', '', $produit->image_url), '/');
                Storage::disk('public')->delete($relativePath);
            }

            $path = $request->file('image')->store('produits', 'public');
            $payload['image_url'] = Storage::url($path);
        }

        $dto = UpdateProduitDTO::fromRequest($payload);
        $updated = $this->service->update($produit, $dto);

        return response()->json($updated);
    }

    public function destroy(Produit $produit): JsonResponse
    {
        $this->service->delete($produit);

        return response()->json(null, 204);
    }
}
