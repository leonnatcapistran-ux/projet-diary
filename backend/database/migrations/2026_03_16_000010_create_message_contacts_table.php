<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('message_contacts', function (Blueprint $table) {
            $table->id('id_message');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('nom', 100);
            $table->string('email', 191);
            $table->string('sujet', 30);
            $table->text('message');
            $table->string('statut', 20)->default('non_lu');
            $table->timestamp('date_envoi')->useCurrent();
            $table->text('reponse_admin')->nullable();
            $table->timestamp('date_traitement')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_contacts');
    }
};
