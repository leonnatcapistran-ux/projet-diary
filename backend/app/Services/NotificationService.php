<?php

namespace App\Services;

use App\DTOs\CreateNotificationDTO;
use App\Interfaces\NotificationRepositoryInterface;
use App\Models\Commande;
use App\Models\Notification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class NotificationService
{
    public function __construct(private readonly NotificationRepositoryInterface $repository)
    {
    }

    public function paginateForUser(int $idUser, int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginateForUser($idUser, $perPage);
    }

    public function create(CreateNotificationDTO $dto): Notification
    {
        return $this->repository->create($dto->toArray());
    }

    public function createForCommande(Commande $commande, string $type, string $message): Notification
    {
        $dto = new CreateNotificationDTO(
            user_id: $commande->user_id,
            id_commande: $commande->id_commande,
            type: $type,
            message: $message,
            lu: false,
        );

        return $this->create($dto);
    }

    public function createForUserCommande(int $idUser, Commande $commande, string $type, string $message): Notification
    {
        $dto = new CreateNotificationDTO(
            user_id: $idUser,
            id_commande: $commande->id_commande,
            type: $type,
            message: $message,
            lu: false,
        );

        return $this->create($dto);
    }

    public function markAllRead(int $idUser): void
    {
        $this->repository->markAllReadForUser($idUser);
    }
}
