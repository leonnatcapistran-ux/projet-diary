<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(): JsonResponse
    {
        return response()->json([]);
    }

    /**
     * Update the user's password.
     */
    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'mot_de_passe' => $request->password,
        ]);

        return back();
    }
}
