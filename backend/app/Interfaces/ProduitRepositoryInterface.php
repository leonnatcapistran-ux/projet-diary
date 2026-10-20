<?php

namespace App\Interfaces;

use App\Models\Produit;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProduitRepositoryInterface
{
    public function paginate(array $filters = [], int $perPage = 5): LengthAwarePaginator;

    public function find(int $id): ?Produit;

    public function create(array $data): Produit;

    public function update(Produit $produit, array $data): Produit;

    public function delete(Produit $produit): void;
}
