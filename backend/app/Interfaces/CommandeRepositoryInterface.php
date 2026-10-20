<?php

namespace App\Interfaces;

use App\Models\Commande;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CommandeRepositoryInterface
{
    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator;

    public function find(int $id): ?Commande;

    public function create(array $data): Commande;

    public function update(Commande $commande, array $data): Commande;

    public function delete(Commande $commande): void;
}
