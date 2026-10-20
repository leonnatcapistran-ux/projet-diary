<?php

namespace App\Http\Controllers\Client;

use App\DTOs\CreateCommandeDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreCommandeRequest;
use App\Models\Commande;
use App\Services\CommandeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Barryvdh\DomPDF\Facade\Pdf;

class CommandeController extends Controller
{
    public function __construct(private readonly CommandeService $service)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $filters = ['user_id' => $user->id_user];
        $perPage = (int) $request->query('per_page', 10);
        $commandes = $this->service->paginate($filters, $perPage);

        $commandes->through(function ($commande) {
            if (is_string($commande->statut) && str_starts_with($commande->statut, 'ASI-')) {
                $commande->statut = 'en_attente';
            }
            if ($commande->facture && is_string($commande->facture->numero_facture)) {
                $parts = array_filter(array_map('trim', explode(';', $commande->facture->numero_facture)));
                if (!empty($parts)) {
                    $commande->facture->numero_facture = end($parts);
                }
            }

            $commande->can_leave_review = $commande->statut === 'livree' && !$commande->avis;

            return $commande;
        });

        return response()->json([
            'commandes' => $commandes,
        ]);
    }

    public function store(StoreCommandeRequest $request): Response|JsonResponse|RedirectResponse
    {
        $user = Auth::user();
        $validated = $request->validated();

        $user->fill([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'telephone' => $validated['num_telephone'] ?? $user->telephone,
            'adresse' => $validated['adresse_livraison'],
            'pays_residence' => $validated['pays_livraison'],
        ]);
        $user->save();

        $dto = CreateCommandeDTO::fromRequest($validated);

        $commande = $this->service->createManual($dto, $user);

        if ($request->wantsJson()) {
            return response()->json($commande, 201);
        }

        return redirect()
            ->route('account.orders.index')
            ->with('success', 'Commande bien envoyée.');
    }

    public function downloadFacture(Request $request, Commande $commande): SymfonyResponse
    {
        $user = $request->user();

        if ((int) $commande->user_id !== (int) $user->id_user) {
            abort(403);
        }

        $commande->load(['facture', 'lignes.produit']);

        if (!$commande->facture) {
            abort(404);
        }

        $facture = $commande->facture;
        $filename = $facture->numero_facture . ".pdf";

        $pdf = Pdf::loadView('factures.commande', [
            'commande' => $commande,
            'facture' => $facture,
            'user' => $user,
        ]);

        return $pdf->download($filename);
    }
}
