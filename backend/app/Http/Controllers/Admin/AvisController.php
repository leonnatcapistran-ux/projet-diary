<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\UpdateAvisDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAvisRequest;
use App\Models\Avis;
use App\Services\AvisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    public function __construct(private readonly AvisService $service)
    {
    }

    public function index(Request $request)
    {
        $filters = $request->only(['statut', 'id_produit']);
        $perPage = (int) $request->query('per_page', 15);
        $avis = $this->service->paginate($filters, $perPage);

        if (!$request->wantsJson()) {
            return response()->json([
                'avis' => $avis,
                'filters' => $filters,
            ]);
        }

        return response()->json($avis);
    }

    public function update(UpdateAvisRequest $request, Avis $avis): JsonResponse
    {
        $dto = UpdateAvisDTO::fromArray($request->validated());
        $updated = $this->service->update($avis, $dto);

        return response()->json($updated);
    }
}
