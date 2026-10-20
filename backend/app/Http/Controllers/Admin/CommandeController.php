<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\UpdateCommandeDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateCommandeRequest;
use App\Models\Commande;
use App\Services\CommandeService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CommandeController extends Controller
{
    public function __construct(private readonly CommandeService $service)
    {
    }

    public function index(Request $request)
    {
        $filters = $request->only(['statut', 'pays_origine', 'type_achat', 'user_id']);
        $perPage = (int) $request->query('per_page', 15);
        $commandes = $this->service->paginate($filters, $perPage);

        if (!$request->wantsJson()) {
            return response()->json([
                'commandes' => $commandes,
                'filters' => $filters,
            ]);
        }

        return response()->json($commandes);
    }

    public function show(Commande $commande): JsonResponse
    {
        $found = $this->service->find($commande->id_commande);

        return response()->json($found);
    }

    public function update(UpdateCommandeRequest $request, Commande $commande): JsonResponse
    {
        $dto = UpdateCommandeDTO::fromRequest($request->validated());
        $updated = $this->service->update($commande, $dto);

        if ($request->wantsJson()) {
            return response()->json($updated);
        }

        return redirect()->back();
    }

    public function destroy(Commande $commande): JsonResponse
    {
        $this->service->delete($commande);

        if (request()->wantsJson()) {
            return response()->json(null, 204);
        }

        return redirect()->back();
    }
}
