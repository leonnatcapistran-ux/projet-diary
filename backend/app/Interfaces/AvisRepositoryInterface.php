<?php

namespace App\Interfaces;

use App\Models\Avis;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AvisRepositoryInterface
{
    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator;

    public function create(array $data): Avis;

    public function update(Avis $avis, array $data): Avis;

    public function findByCommandeAndUser(int $idCommande, int $idUser): ?Avis;
}
