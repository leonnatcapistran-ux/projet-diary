<?php

namespace App\Services;

use App\DTOs\CreateAvisDTO;
use App\DTOs\UpdateAvisDTO;
use App\Interfaces\AvisRepositoryInterface;
use App\Models\Avis;
use App\Models\Commande;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Validation\ValidationException;

class AvisService
{
    public function __construct(private readonly AvisRepositoryInterface $repository)
    {
    }

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function create(CreateAvisDTO $dto, Commande $commande): Avis
    {
        if ($commande->statut !== 'livree') {
            throw ValidationException::withMessages([
                'id_commande' => 'Avis autorise uniquement pour une commande livree.',
            ]);
        }

        $existing = $this->repository->findByCommandeAndUser($dto->id_commande, $dto->user_id);
        if ($existing) {
            throw ValidationException::withMessages([
                'id_commande' => 'Un avis a deja ete soumis pour cette commande.',
            ]);
        }

        return $this->repository->create($dto->toArray());
    }

    public function update(Avis $avis, UpdateAvisDTO $dto): Avis
    {
        return $this->repository->update($avis, $dto->toArray());
    }
}
