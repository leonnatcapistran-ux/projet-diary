<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id('id_produit');
            $table->string('nom', 200);
            $table->text('description')->nullable();
            $table->string('pays_origine', 10);
            $table->string('categorie', 100);
            $table->decimal('stock_disponible', 10, 2)->default(0);
            $table->decimal('poids_unitaire_kg', 8, 3);
            $table->decimal('prix_unitaire_kg', 10, 2)->nullable();
            $table->string('image_url', 500)->nullable();
            $table->string('statut', 20)->default('actif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
