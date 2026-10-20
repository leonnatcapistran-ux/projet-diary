<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@diary.test'],
            [
                'nom' => 'Diary',
                'prenom' => 'Admin',
                'email' => 'admin@diary.test',
                'email_verified_at' => now(),
                'mot_de_passe' => Hash::make('Admin@12345'),
                'telephone' => null,
                'adresse' => null,
                'pays_residence' => 'Madagascar',
                'type_client' => 'particulier',
                'role' => 'admin',
                'statut' => 'actif',
                'compte_invite' => false,
                'entreprise' => null,
                'numero_tva' => null,
                'date_creation' => now(),
            ]
        );
    }
}

