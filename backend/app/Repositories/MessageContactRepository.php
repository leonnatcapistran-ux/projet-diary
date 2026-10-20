<?php

namespace App\Repositories;

use App\Interfaces\MessageContactRepositoryInterface;
use App\Models\MessageContact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MessageContactRepository implements MessageContactRepositoryInterface
{
    public function __construct(private readonly MessageContact $model)
    {
    }

    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('user');

        if (!empty($filters['statut'])) {
            $query->where('statut', $filters['statut']);
        }

        return $query->orderByDesc('id_message')->paginate($perPage);
    }

    public function create(array $data): MessageContact
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(MessageContact $message, array $data): MessageContact
    {
        $message->fill($data);
        $message->save();

        return $message;
    }

    public function delete(MessageContact $message): void
    {
        $message->delete();
    }
}
