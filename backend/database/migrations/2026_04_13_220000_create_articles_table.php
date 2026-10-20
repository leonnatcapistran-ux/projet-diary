<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id('id_article');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('categorie_id')->nullable();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('extrait', 500)->nullable();
            $table->longText('contenu');
            $table->string('image_url')->nullable();
            $table->enum('statut', ['brouillon', 'publie', 'archive'])->default('brouillon')->index();
            $table->timestamp('date_publication')->nullable()->index();
            $table->timestamps();

            $table->foreign('user_id')->references('id_user')->on('users')->nullOnDelete();
            $table->foreign('categorie_id')->references('id_categorie_article')->on('categorie_articles')->cascadeOnDelete();

            if (Schema::getConnection()->getDriverName() !== 'sqlite') {
                $table->fullText('titre');
                $table->fullText('extrait');
                $table->fullText('contenu');
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
