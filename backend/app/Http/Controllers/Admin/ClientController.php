<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ClientController extends Controller
{
    public function __construct(private readonly UserService $service)
    {
    }

    public function index(Request $request): Response|\Illuminate\Http\JsonResponse
    {
        $filters = $request->only(['search', 'type_client', 'statut', 'role', 'pays_residence']);
        $perPage = (int) $request->query('per_page', 15);
        $clients = $this->service->paginate($filters, $perPage);

        if (!$request->wantsJson()) {
            return response()->json([
                'clients' => $clients,
                'filters' => $filters,
            ]);
        }

        return response()->json($clients);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }

    public function deactivate(User $user)
    {
        $user->update(['statut' => 'inactif']);
        return redirect()->back();
    }

    public function activate(User $user)
    {
        $user->update(['statut' => 'actif']);
        return redirect()->back();
    }
}
