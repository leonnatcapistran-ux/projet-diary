<?php

namespace App\Repositories;

use App\Interfaces\AvisRepositoryInterface;
use App\Models\Avis;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AvisRepository implements AvisRepositoryInterface
{
    public function __construct(private readonly Avis $model)
    {
    }

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['user', 'produit', 'commande']);

        if (!empty($filters['statut'])) {
            $query->where('statut', $filters['statut']);
        }

        if (!empty($filters['id_produit'])) {
            $query->where('id_produit', $filters['id_produit']);
        }

        return $query->orderByDesc('id_avis')->paginate($perPage);
    }

    public function create(array $data): Avis
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(Avis $avis, array $data): Avis
    {
        $avis->fill($data);
        $avis->save();

        return $avis;
    }

    public function findByCommandeAndUser(int $idCommande, int $idUser): ?Avis
    {
        return $this->model->newQuery()
            ->where('id_commande', $idCommande)
            ->where('user_id', $idUser)
            ->first();
    }
}
