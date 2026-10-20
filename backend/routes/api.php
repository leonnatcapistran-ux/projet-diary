<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\AvisController as AdminAvisController;
use App\Http\Controllers\Admin\CategorieArticleController;
use App\Http\Controllers\Admin\ClientController as AdminClientController;
use App\Http\Controllers\Admin\CommandeController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\MessageContactController as AdminMessageContactController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ProduitController;
use App\Http\Controllers\Admin\SettingsController as AdminSettingsController;
use App\Http\Controllers\Client\AvisController as ClientAvisController;
use App\Http\Controllers\Client\CommandeController as ClientCommandeController;
use App\Http\Controllers\Client\MessageContactController as ClientMessageContactController;
use App\Http\Controllers\Public\BlogController;
use App\Http\Controllers\Public\CatalogueController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ProductController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — toutes préfixées automatiquement par /api
|--------------------------------------------------------------------------
| Auth : Sanctum SPA (cookie de session). Le frontend doit d'abord appeler
| GET /sanctum/csrf-cookie puis POST /login (fourni par Fortify) avant
| d'accéder aux routes protégées par 'auth:sanctum'.
*/

// ---- Utilisateur courant ----
Route::middleware('auth:sanctum')->get('/user', fn (Request $request) => $request->user());

// ---- Public ----
Route::get('/', [HomeController::class, 'index'])->name('api.home');
Route::get('/catalogue', [CatalogueController::class, 'index'])->name('api.catalogue.index');
Route::get('/produit/{id}', [ProductController::class, 'show'])->name('api.product.show');
Route::get('/actualites', [BlogController::class, 'index'])->name('api.blog.index');
Route::get('/actualites/{slug}', [BlogController::class, 'show'])->name('api.blog.show');

Route::get('/a-propos', function () {
    $featuredProducts = Produit::query()
        ->where('statut', 'actif')
        ->orderByDesc('id_produit')
        ->limit(4)
        ->get()
        ->map(fn ($produit) => [
            'id' => $produit->id_produit,
            'name' => $produit->nom,
            'description' => $produit->description,
            'image' => $produit->image_url,
            'price' => $produit->prix_unitaire_kg !== null ? (float) $produit->prix_unitaire_kg : null,
            'origin' => 'MADAGASCAR',
            'category' => $produit->categorie,
        ]);

    return response()->json(['featuredProducts' => $featuredProducts]);
})->name('api.about');

Route::get('/nos-engagements', fn () => response()->json([]))->name('api.engagement');
Route::get('/nous-contacter', fn () => response()->json([]))->name('api.contact.index');
Route::get('/faq', fn () => response()->json([]))->name('api.faq.index');
Route::get('/checkout', fn () => response()->json([]))->name('api.checkout.index');

Route::post('/contact', [ClientMessageContactController::class, 'store'])->name('api.contact.store');

// ---- Compte (auth requise) ----
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('api.settings.profile.edit');
    Route::patch('/settings/profile', [ProfileController::class, 'update'])->name('api.settings.profile.update');

    Route::middleware('verified')->group(function () {
        Route::delete('/settings/profile', [ProfileController::class, 'destroy'])->name('api.settings.profile.destroy');
        Route::put('/settings/password', [PasswordController::class, 'update'])
            ->middleware('throttle:6,1')
            ->name('api.settings.password.update');
        Route::get('/settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])->name('api.settings.two-factor.show');
    });

    Route::prefix('compte')->name('api.account.')->group(function () {
        Route::get('commandes', [ClientCommandeController::class, 'index'])->name('orders.index');
        Route::get('commandes/{commande}/facture', [ClientCommandeController::class, 'downloadFacture'])->name('orders.facture');
        Route::post('avis', [ClientAvisController::class, 'store'])->name('avis.store');
    });

    Route::post('/commandes', [ClientCommandeController::class, 'store'])->name('api.orders.store');
});

// ---- Admin (auth + rôle admin requis) ----
Route::prefix('admin')
    ->middleware(['auth:sanctum', 'admin'])
    ->name('api.admin.')
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::get('clients', [AdminClientController::class, 'index'])->name('clients.index');
        Route::patch('clients/{user}/deactivate', [AdminClientController::class, 'deactivate'])->name('clients.deactivate');
        Route::patch('clients/{user}/activate', [AdminClientController::class, 'activate'])->name('clients.activate');
        Route::delete('clients/{user}', [AdminClientController::class, 'destroy'])->name('clients.destroy');

        Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::post('notifications/{type}/{id}/mark-viewed', [NotificationController::class, 'markAsViewed'])->name('notifications.markViewed');

        Route::get('parametres', [AdminSettingsController::class, 'index'])->name('settings.index');
        Route::post('parametres', [AdminSettingsController::class, 'update'])->name('settings.update');

        Route::apiResource('articles', ArticleController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::apiResource('categories', CategorieArticleController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->parameters(['categories' => 'categorie_article']);

        Route::apiResource('produits', ProduitController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::apiResource('commandes', CommandeController::class)
            ->only(['index', 'show', 'update', 'destroy']);

        Route::get('avis', [AdminAvisController::class, 'index'])->name('avis.index');
        Route::put('avis/{avis}', [AdminAvisController::class, 'update'])->name('avis.update');

        Route::get('messages', [AdminMessageContactController::class, 'index'])->name('messages.index');
        Route::put('messages/{messageContact}', [AdminMessageContactController::class, 'update'])->name('messages.update');
        Route::delete('messages/{messageContact}', [AdminMessageContactController::class, 'destroy'])->name('messages.destroy');
    });
