<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
Schema::create('clients', function (Blueprint $table) {
    $table->id();

    $table->string('nom')->nullable();
    $table->string('prenom')->nullable();
    $table->string('email')->unique();
    $table->string('telephone')->nullable();
    $table->string('pays')->nullable();
    $table->string('ville')->nullable();
    $table->foreignId('user_id')->constrained('users', 'id_user')->cascadeOnDelete();

    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
