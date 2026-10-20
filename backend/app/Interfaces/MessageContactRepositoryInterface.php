<?php

namespace App\Interfaces;

use App\Models\MessageContact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface MessageContactRepositoryInterface
{
    public function paginate(array $filters, int $perPage = 15): LengthAwarePaginator;

    public function create(array $data): MessageContact;

    public function update(MessageContact $message, array $data): MessageContact;

    public function delete(MessageContact $message): void;
}
