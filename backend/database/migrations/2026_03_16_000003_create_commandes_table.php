<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id('id_commande');
            $table->foreignId('user_id')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->timestamp('date_commande')->useCurrent();
            $table->string('pays_origine', 10);
            $table->string('statut', 30);
            $table->timestamp('date_statut')->nullable();
            $table->decimal('montant_total', 10, 2);
            $table->string('type_achat', 20);
            $table->text('adresse_livraison');
            $table->string('pays_livraison', 80);
            $table->string('num_telephone', 20)->nullable();
            $table->string('email_valide', 255)->nullable();
            $table->string('mode_transport', 20)->nullable();
            $table->decimal('cout_transport', 10, 2)->nullable();
            $table->decimal('poids_total_kg', 10, 2);
            $table->string('numero_suivi', 100)->nullable();
            $table->date('date_livraison_estimee')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
