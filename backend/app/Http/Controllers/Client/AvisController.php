<?php

namespace App\Http\Controllers\Client;

use App\DTOs\CreateAvisDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreAvisRequest;
use App\Models\Commande;
use App\Services\AvisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AvisController extends Controller
{
    public function __construct(private readonly AvisService $service) {}

    public function store(StoreAvisRequest $request): JsonResponse|RedirectResponse
    {
        $user = $request->user();
        $commande = Commande::query()->findOrFail($request->validated()['id_commande']);

        if ((int) $commande->user_id !== (int) $user->id_user) {
            abort(403);
        }

        $productId = (int) $request->validated()['id_produit'];
        $belongsToOrder = $commande->lignes()
            ->where('id_produit', $productId)
            ->exists();

        if (! $belongsToOrder) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Le produit selectionne ne correspond pas a cette commande.',
                    'errors' => [
                        'id_produit' => ['Le produit selectionne ne correspond pas a cette commande.'],
                    ],
                ], 422);
            }

            return back()->withErrors([
                'id_produit' => 'Le produit selectionne ne correspond pas a cette commande.',
            ]);
        }

        $dto = CreateAvisDTO::fromArray([
            'user_id' => (int) $user->id_user,
            'id_produit' => $productId,
            'id_commande' => (int) $request->validated()['id_commande'],
            'note' => (int) $request->validated()['note'],
            'commentaire' => $request->validated()['commentaire'] ?? null,
        ]);

        $avis = $this->service->create($dto, $commande);

        if (! $request->wantsJson()) {
            return redirect()->back()->with('success', 'Avis envoye. Il sera publie apres moderation.');
        }

        return response()->json($avis, 201);
    }
}
