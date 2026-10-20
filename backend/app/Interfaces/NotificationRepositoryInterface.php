<?php

namespace App\Interfaces;

use App\Models\Notification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface NotificationRepositoryInterface
{
    public function paginateForUser(int $idUser, int $perPage = 15): LengthAwarePaginator;

    public function create(array $data): Notification;

    public function markAllReadForUser(int $idUser): void;
}
