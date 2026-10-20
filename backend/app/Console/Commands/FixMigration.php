<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class FixMigration extends Command
{
    protected $signature = 'fix:migration';
    protected $description = 'Create admin user';

    public function handle()
    {
        User::create([
            'nom' => 'Admin',
            'email' => 'admin@diary.test',
            'password' => Hash::make('Admin@12345'),
            'role' => 'admin',
        ]);

        $this->info('Admin créé !');
    }
}