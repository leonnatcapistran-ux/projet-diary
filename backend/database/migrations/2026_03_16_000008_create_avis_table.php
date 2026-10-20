<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('avis', function (Blueprint $table) {
            $table->id('id_avis');
            $table->foreignId('user_id')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->foreignId('id_produit')->constrained('produits', 'id_produit');
            $table->foreignId('id_commande')->constrained('commandes', 'id_commande');
            $table->unsignedTinyInteger('note');
            $table->text('commentaire')->nullable();
            $table->string('statut', 20)->default('en_attente');
            $table->timestamp('date_avis')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avis');
    }
};
