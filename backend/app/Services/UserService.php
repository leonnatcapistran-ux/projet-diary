<?php

namespace App\Services;

use App\Interfaces\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    public function __construct(private readonly UserRepositoryInterface $repository)
    {
    }

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }
}
