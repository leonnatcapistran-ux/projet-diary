<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user && $user->statut === 'inactif') {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/login')->with('status', 'Votre compte a ete desactive. Veuillez contacter le support.');
        }

        $redirectTo = $this->sanitizeRedirect($request->input('redirect_to'));

        if ($redirectTo !== null) {
            return redirect()->to($redirectTo);
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
