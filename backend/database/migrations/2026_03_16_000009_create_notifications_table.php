<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('id_notification');
            $table->foreignId('user_id')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->foreignId('id_commande')->nullable()->constrained('commandes', 'id_commande');
            $table->string('type', 30);
            $table->text('message');
            $table->boolean('lu')->default(false);
            $table->timestamp('date_envoi')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
