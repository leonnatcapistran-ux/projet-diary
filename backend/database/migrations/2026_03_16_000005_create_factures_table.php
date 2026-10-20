<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id('id_facture');
            $table->foreignId('id_commande')->unique()->constrained('commandes', 'id_commande')->cascadeOnDelete();
            $table->string('numero_facture', 50)->unique();
            $table->timestamp('date_emission')->useCurrent();
            $table->decimal('montant_ht', 10, 2);
            $table->decimal('taux_tva', 5, 2)->default(0);
            $table->decimal('montant_tva', 10, 2)->default(0);
            $table->decimal('montant_ttc', 10, 2);
            $table->decimal('cout_transport', 10, 2)->default(0);
            $table->string('mode_transport', 20)->nullable();
            $table->boolean('mention_dernier_km')->default(true);
            $table->string('statut_paiement', 20);
            $table->string('mode_paiement', 50)->default('stripe');
            $table->string('payment_reference', 200)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
