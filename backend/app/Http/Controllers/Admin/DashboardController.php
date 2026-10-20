<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Commande;
use App\Models\MessageContact;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        $ordersToday = Commande::query()
            ->whereDate('date_commande', $today)
            ->count();

        $monthlyRevenue = (float) Commande::query()
            ->whereBetween('date_commande', [$startOfMonth, Carbon::now()->endOfDay()])
            ->sum('montant_total');

        $activeClients = User::query()
            ->where('role', '!=', 'admin')
            ->where('statut', 'actif')
            ->count();

        $pendingOrders = Commande::query()->where('statut', 'en_attente')->count();
        $pendingMessages = MessageContact::query()->where('statut', 'non_lu')->count();
        $pendingReviews = Avis::query()->where('statut', 'en_attente')->count();

        $recentOrders = Commande::query()
            ->with(['user', 'lignes.produit'])
            ->latest('date_commande')
            ->limit(5)
            ->get()
            ->map(function (Commande $commande) {
                $firstLine = $commande->lignes->first();
                $produit = $firstLine?->produit;

                return [
                    'id' => $commande->id_commande,
                    'client_name' => trim(($commande->user?->prenom ?? '').' '.($commande->user?->nom ?? '')) ?: 'Client',
                    'client_country' => $commande->user?->pays_residence ?? '-',
                    'product_name' => $produit?->nom ?? 'Produit',
                    'origin' => $commande->pays_origine === 'MDG' ? 'MADAGASCAR' : $commande->pays_origine,
                    'total' => (float) $commande->montant_total,
                    'shipping_mode' => $commande->mode_transport ?? '-',
                    'status' => $commande->statut,
                ];
            })
            ->values();

        $monthlyChart = collect(range(5, 0))
            ->map(function (int $offset) {
                $month = Carbon::now()->subMonths($offset);
                $start = $month->copy()->startOfMonth();
                $end = $month->copy()->endOfMonth();

                return [
                    'month' => $month->translatedFormat('M'),
                    'revenue' => (float) Commande::query()
                        ->whereBetween('date_commande', [$start, $end])
                        ->sum('montant_total'),
                ];
            })
            ->values();

        return response()->json([
            'stats' => [
                'orders_today' => $ordersToday,
                'monthly_revenue' => $monthlyRevenue,
                'active_clients' => $activeClients,
                'pending_total' => $pendingOrders + $pendingMessages + $pendingReviews,
                'pending_reviews' => $pendingReviews,
                'pending_messages' => $pendingMessages,
                'pending_orders' => $pendingOrders,
            ],
            'chartData' => [
                'monthly' => $monthlyChart,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
