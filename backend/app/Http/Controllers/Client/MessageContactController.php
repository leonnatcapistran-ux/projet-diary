<?php

namespace App\Http\Controllers\Client;

use App\DTOs\CreateMessageContactDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreMessageContactRequest;
use App\Services\MessageContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class MessageContactController extends Controller
{
    public function __construct(private readonly MessageContactService $service)
    {
    }

    public function store(StoreMessageContactRequest $request): Response|JsonResponse|RedirectResponse
    {
        $user = $request->user();
        $payload = $request->validated();
        $userId = $user?->id_user ?? $user?->id ?? null;
        $message = $this->buildMessage($payload);

        $dto = CreateMessageContactDTO::fromArray([
            'user_id' => $userId,
            'nom' => $payload['nom'],
            'email' => $payload['email'],
            'sujet' => $payload['sujet'],
            'message' => $message,
        ]);

        $createdMessage = $this->service->create($dto);

        if ($request->wantsJson()) {
            return response()->json($createdMessage, 201);
        }

        return redirect()
            ->route('contact.index')
            ->with('success', 'Message bien envoyé.');
    }

    private function buildMessage(array $payload): string
    {
        $sections = [];

        if (!empty($payload['phone'])) {
            $sections[] = 'Telephone : ' . $payload['phone'];
        }

        if (!empty($payload['company'])) {
            $sections[] = 'Entreprise : ' . $payload['company'];
        }

        $sections[] = 'Message :';
        $sections[] = $payload['message'];

        return implode("\n", $sections);
    }
}
