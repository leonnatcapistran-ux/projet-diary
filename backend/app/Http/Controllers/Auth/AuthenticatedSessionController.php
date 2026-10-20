<?php

namespace App\Http\Controllers\Auth;

use App\Support\ValidationMessageCatalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController
{
    /**
     * Store a newly authenticated user session.
     */
    public function store(Request $request)
    {
        $credentials = $request->validate(
            [
                'email' => ['required', 'email'],
                'password' => ['required', 'string'],
                'remember' => ['boolean'],
            ],
            ValidationMessageCatalog::authLogin()
        );

        if (!Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']], $credentials['remember'] ?? false)) {
            throw ValidationException::withMessages([
                'email' => ValidationMessageCatalog::authLoginFailed(),
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        if ($user && method_exists($user, 'isAdmin') && $user->isAdmin()) {
            return redirect('/admin');
        }

        return redirect('/');
    }
}
