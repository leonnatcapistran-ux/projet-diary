<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use App\Auth\CustomUserProvider;
use App\Interfaces\ArticleRepositoryInterface;
use App\Interfaces\AvisRepositoryInterface;
use App\Interfaces\CommandeRepositoryInterface;
use App\Interfaces\MessageContactRepositoryInterface;
use App\Interfaces\NotificationRepositoryInterface;
use App\Interfaces\ProduitRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\AvisRepository;
use App\Repositories\ArticleRepository;
use App\Repositories\CommandeRepository;
use App\Repositories\MessageContactRepository;
use App\Repositories\NotificationRepository;
use App\Repositories\ProduitRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use App\Interfaces\CategorieArticleRepositoryInterface;
use App\Repositories\CategorieArticleRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProduitRepositoryInterface::class, ProduitRepository::class);
        $this->app->bind(ArticleRepositoryInterface::class, ArticleRepository::class);
        $this->app->bind(CommandeRepositoryInterface::class, CommandeRepository::class);
        $this->app->bind(NotificationRepositoryInterface::class, NotificationRepository::class);
        $this->app->bind(AvisRepositoryInterface::class, AvisRepository::class);
        $this->app->bind(MessageContactRepositoryInterface::class, MessageContactRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(CategorieArticleRepositoryInterface::class, CategorieArticleRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();

        // Register custom user provider
        \Illuminate\Support\Facades\Auth::provider('custom', fn ($app, array $config) => new CustomUserProvider($app['hash'], $config['model']));
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
