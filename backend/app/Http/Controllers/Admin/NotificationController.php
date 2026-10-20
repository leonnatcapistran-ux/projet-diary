<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Commande;
use App\Models\MessageContact;
use Illuminate\Support\Collection;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function index(): JsonResponse
    {
        $commandeNotifications = Commande::query()
            ->where('statut', 'en_attente')
            ->latest('date_commande')
            ->limit(20)
            ->get()
            ->map(fn (Commande $commande) => [
                'id' => 'commande-'.$commande->id_commande,
                'type' => 'commande',
                'title' => 'Nouvelle commande à traiter',
                'message' => sprintf('Commande #%d en attente de validation.', $commande->id_commande),
                'date' => optional($commande->date_commande)->toIso8601String(),
                'link' => '/admin/commandes',
            ]);

        $messageNotifications = MessageContact::query()
            ->where('statut', 'non_lu')
            ->latest('date_envoi')
            ->limit(20)
            ->get()
            ->map(fn (MessageContact $message) => [
                'id' => 'message-'.$message->id_message,
                'type' => 'message',
                'title' => 'Nouveau message de contact',
                'message' => sprintf('%s a ecrit au sujet de "%s".', $message->nom, $message->sujet),
                'date' => optional($message->date_envoi)->toIso8601String(),
                'link' => '/admin/messages',
            ]);

        $avisNotifications = Avis::query()
            ->with('produit')
            ->where('statut', 'en_attente')
            ->latest('date_avis')
            ->limit(20)
            ->get()
            ->map(fn (Avis $avis) => [
                'id' => 'avis-'.$avis->id_avis,
                'type' => 'avis',
                'title' => 'Nouvel avis en attente',
                'message' => sprintf(
                    'Un avis sur "%s" attend une moderation.',
                    $avis->produit?->nom ?? 'un produit'
                ),
                'date' => optional($avis->date_avis)->toIso8601String(),
                'link' => '/admin/avis',
            ]);

        /** @var Collection<int, array{id:string,type:string,title:string,message:string,date:?string,link:string}> $notifications */
        $notifications = $commandeNotifications
            ->concat($messageNotifications)
            ->concat($avisNotifications)
            ->sortByDesc(fn (array $notification) => $notification['date'] ?? '')
            ->values();

        return response()->json([
            'notifications' => $notifications,
            'summary' => [
                'commandes' => $commandeNotifications->count(),
                'messages' => $messageNotifications->count(),
                'avis' => $avisNotifications->count(),
                'total' => $notifications->count(),
            ],
        ]);
    }

    public function markAsViewed(string $type, int $id)
    {
        if (! in_array($type, ['commande', 'avis', 'message'], true)) {
            abort(404);
        }

        match ($type) {
            'commande' => Commande::where('id_commande', $id)->update(['admin_viewed' => true]),
            'avis' => Avis::where('id_avis', $id)->update(['admin_viewed' => true]),
            'message' => MessageContact::where('id_message', $id)->update(['statut' => 'lu']),
        };

        // Redirect to the appropriate page based on notification type
        $routes = [
            'commande' => '/admin/commandes',
            'avis' => '/admin/avis',
            'message' => '/admin/messages',
        ];

        return redirect($routes[$type] ?? '/admin/notifications');
    }
}
