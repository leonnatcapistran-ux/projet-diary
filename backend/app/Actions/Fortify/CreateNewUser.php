<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use App\Support\ValidationMessageCatalog;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make(
            $input,
            [
                ...$this->profileRules(),
                'password' => $this->passwordRules(),
                'pays_residence' => ['required', 'string', 'max:80'],
                'type_client' => ['required', 'in:particulier,professionnel'],
                'telephone' => ['nullable', 'string', 'max:30'],
                'adresse' => ['nullable', 'string'],
                'entreprise' => ['nullable', 'string', 'max:200'],
                'numero_tva' => ['nullable', 'string', 'max:50'],
            ],
            ValidationMessageCatalog::authRegister()
        )->validate();

        return User::create([
            'nom' => $input['nom'],
            'prenom' => $input['prenom'],
            'email' => $input['email'],
            'mot_de_passe' => $input['password'],
            'telephone' => $input['telephone'] ?? null,
            'adresse' => $input['adresse'] ?? null,
            'pays_residence' => $input['pays_residence'],
            'type_client' => $input['type_client'],
            'role' => 'client',
            'statut' => 'actif',
            'compte_invite' => false,
            'entreprise' => $input['entreprise'] ?? null,
            'numero_tva' => $input['numero_tva'] ?? null,
        ]);
    }
}
