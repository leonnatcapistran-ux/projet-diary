<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\UpdateMessageContactDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateMessageContactRequest;
use App\Models\MessageContact;
use App\Services\MessageContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageContactController extends Controller
{
    public function __construct(private readonly MessageContactService $service)
    {
    }

    public function index(Request $request)
    {
        $filters = $request->only(['statut']);
        $perPage = (int) $request->query('per_page', 15);
        $messages = $this->service->paginate($filters, $perPage);

        if (!$request->wantsJson()) {
            return response()->json([
                'messages' => $messages,
                'filters' => $filters,
            ]);
        }

        return response()->json($messages);
    }

    public function update(UpdateMessageContactRequest $request, MessageContact $messageContact): JsonResponse
    {
        $dto = UpdateMessageContactDTO::fromArray($request->validated());
        $updated = $this->service->update($messageContact, $dto);

        return response()->json($updated);
    }

    public function destroy(MessageContact $messageContact): JsonResponse
    {
        $this->service->delete($messageContact);

        return response()->json(['success' => true]);
    }
}
