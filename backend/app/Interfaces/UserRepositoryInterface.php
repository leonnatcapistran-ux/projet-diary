<?php

namespace App\Interfaces;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator;
}
