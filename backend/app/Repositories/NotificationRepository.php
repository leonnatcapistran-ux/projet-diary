<?php

namespace App\Repositories;

use App\Interfaces\NotificationRepositoryInterface;
use App\Models\Notification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function __construct(private readonly Notification $model)
    {
    }

    public function paginateForUser(int $idUser, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->newQuery()
            ->where('user_id', $idUser)
            ->orderByDesc('id_notification')
            ->paginate($perPage);
    }

    public function create(array $data): Notification
    {
        return $this->model->newQuery()->create($data);
    }

    public function markAllReadForUser(int $idUser): void
    {
        $this->model->newQuery()
            ->where('user_id', $idUser)
            ->where('lu', false)
            ->update(['lu' => true]);
    }
}
