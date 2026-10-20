<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\ValidationMessageCatalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'settings' => [
                'company_name' => env('COMPANY_NAME', 'Diary'),
                'company_address' => env('COMPANY_ADDRESS', 'Antananarivo, Madagascar'),
            ],
            'email' => $request->user()?->email,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return back()->with('error', 'Utilisateur non authentifie');
        }

        $validated = $request->validate(
            [
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users', 'email')->ignore($user->getKey(), 'id_user'),
                ],
                'mot_de_passe' => ['nullable', 'min:6', 'confirmed'],
            ],
            ValidationMessageCatalog::adminSettings()
        );

        $user->email = $validated['email'];

        if (!empty($validated['mot_de_passe'])) {
            $user->mot_de_passe = bcrypt($validated['mot_de_passe']);
        }

        $user->save();

        Auth::logout();

        return redirect()->route('login')->with(
            'success',
            'Modifications enregistrees. Veuillez vous reconnecter avec vos nouveaux identifiants.'
        );
    }
}
