<?php

namespace App\Services;

use App\DTOs\CreateMessageContactDTO;
use App\DTOs\UpdateMessageContactDTO;
use App\Interfaces\MessageContactRepositoryInterface;
use App\Models\MessageContact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MessageContactService
{
    public function __construct(private readonly MessageContactRepositoryInterface $repository)
    {
    }

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function create(CreateMessageContactDTO $dto): MessageContact
    {
        return $this->repository->create($dto->toArray());
    }

    public function update(MessageContact $message, UpdateMessageContactDTO $dto): MessageContact
    {
        return $this->repository->update($message, $dto->toArray());
    }

    public function delete(MessageContact $message): void
    {
        $this->repository->delete($message);
    }
}
