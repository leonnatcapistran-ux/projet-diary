<?php

namespace App\DTOs;

final class CreateNotificationDTO
{
    public function __construct(
        public readonly int $user_id,
        public readonly ?int $id_commande,
        public readonly string $type,
        public readonly string $message,
        public readonly bool $lu = false,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            user_id: (int) $data['user_id'],
            id_commande: isset($data['id_commande']) ? (int) $data['id_commande'] : null,
            type: (string) $data['type'],
            message: (string) $data['message'],
            lu: isset($data['lu']) ? (bool) $data['lu'] : false,
        );
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'id_commande' => $this->id_commande,
            'type' => $this->type,
            'message' => $this->message,
            'lu' => $this->lu,
        ];
    }
}
