<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserRepository implements UserRepositoryInterface
{
    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = User::query()
            ->where('role', '!=', 'admin')
            ->withCount('commandes')
            ->withSum('commandes', 'montant_total');

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                    ->orWhere('prenom', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (!empty($filters['type_client'])) {
            $query->where('type_client', $filters['type_client']);
        }

        if (!empty($filters['statut'])) {
            $query->where('statut', $filters['statut']);
        }

        if (!empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (!empty($filters['pays_residence'])) {
            $query->where('pays_residence', $filters['pays_residence']);
        }

        return $query->orderByDesc('id_user')->paginate($perPage)->withQueryString();
    }
}
