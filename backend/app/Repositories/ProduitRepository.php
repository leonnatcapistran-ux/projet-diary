<?php

namespace App\Repositories;

use App\Interfaces\ProduitRepositoryInterface;
use App\Models\Produit;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ProduitRepository implements ProduitRepositoryInterface
{
    public function __construct(private readonly Produit $model) {}

    public function paginate(array $filters = [], int $perPage = 5): LengthAwarePaginator
    {
        return $this->model->newQuery()
            ->when(
                isset($filters['search']) && $filters['search'] !== '',
                fn ($query) => $query->where('nom', 'like', '%'.$filters['search'].'%')
            )
            ->when(
                isset($filters['statut']) && $filters['statut'] !== '',
                fn ($query) => $query->where('statut', $filters['statut'])
            )
            ->orderByDesc('id_produit')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function find(int $id): ?Produit
    {
        return $this->model->newQuery()->find($id);
    }

    public function create(array $data): Produit
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(Produit $produit, array $data): Produit
    {
        $produit->fill($data);
        $produit->save();

        return $produit;
    }

    public function delete(Produit $produit): void
    {
        DB::transaction(function () use ($produit): void {
            $produit->avis()->delete();
            $produit->lignesCommandes()->delete();
            $produit->delete();
        });
    }
}
