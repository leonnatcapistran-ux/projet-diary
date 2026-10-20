<?php

namespace App\Repositories;

use App\Interfaces\CommandeRepositoryInterface;
use App\Models\Commande;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CommandeRepository implements CommandeRepositoryInterface
{
    public function __construct(private readonly Commande $model) {}

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['user', 'facture', 'lignes.produit', 'avis']);

        if (! empty($filters['statut'])) {
            $query->where('statut', $filters['statut']);
        }

        if (! empty($filters['pays_origine'])) {
            $query->where('pays_origine', $filters['pays_origine']);
        }

        if (! empty($filters['type_achat'])) {
            $query->where('type_achat', $filters['type_achat']);
        }

        if (! empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        return $query->orderByDesc('id_commande')->paginate($perPage);
    }

    public function find(int $id): ?Commande
    {
        return $this->model->newQuery()->with(['user', 'lignes.produit', 'facture', 'avis'])->find($id);
    }

    public function create(array $data): Commande
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(Commande $commande, array $data): Commande
    {
        $commande->fill($data);
        $commande->save();

        return $commande;
    }

    public function delete(Commande $commande): void
    {
        $commande->delete();
    }
}
