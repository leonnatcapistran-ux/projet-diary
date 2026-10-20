<?php

namespace App\Services;

use App\DTOs\CreateProduitDTO;
use App\DTOs\UpdateProduitDTO;
use App\Interfaces\ProduitRepositoryInterface;
use App\Models\Produit;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProduitService
{
    public function __construct(private readonly ProduitRepositoryInterface $repository)
    {
    }

    public function paginate(array $filters = [], int $perPage = 5): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function create(CreateProduitDTO $dto): Produit
    {
        return $this->repository->create($dto->toArray());
    }

    public function update(Produit $produit, UpdateProduitDTO $dto): Produit
    {
        return $this->repository->update($produit, $dto->toArray());
    }

    public function delete(Produit $produit): void
    {
        $this->repository->delete($produit);
    }
}
