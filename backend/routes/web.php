<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Ce backend est maintenant une API pure : toutes les données transitent par
| routes/api.php (préfixe /api). Ce fichier ne garde que les redirections
| d'anciennes URLs. Les routes login/register/logout/... sont enregistrées
| automatiquement par Laravel Fortify (guard 'web', utilisé aussi par Sanctum
| pour l'auth SPA par cookie de session).
*/

Route::redirect('/catalogue/{origin}', '/catalogue', 301)->where('origin', 'madagascar|maroc');
Route::redirect('/about', '/a-propos', 301);
Route::redirect('/engagement', '/nos-engagements', 301);
Route::redirect('/notre-histoire', '/a-propos', 301);
Route::redirect('/engagements', '/nos-engagements', 301);
Route::redirect('/contact', '/nous-contacter', 301);

Route::redirect('/dashboard', '/admin', 301)->name('dashboard');
