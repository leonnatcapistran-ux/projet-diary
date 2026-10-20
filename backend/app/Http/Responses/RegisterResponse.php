<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request)
    {
        $redirectTo = $this->sanitizeRedirect($request->input('redirect_to'));

        if ($redirectTo !== null) {
            return redirect()->to($redirectTo)->with('info', 'Compte cree avec succes. Completez votre commande.');
        }

        return redirect()->intended(route('dashboard'));
    }

    private function sanitizeRedirect(mixed $redirectTo): ?string
    {
        if (!is_string($redirectTo) || $redirectTo === '') {
            return null;
        }

        if (!str_starts_with($redirectTo, '/')) {
            return null;
        }

        return $redirectTo;
    }
}
