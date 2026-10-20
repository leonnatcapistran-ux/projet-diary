<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('avis', function (Blueprint $table) {
            $table->boolean('admin_viewed')->default(false)->after('statut');
        });
    }

    public function down(): void
    {
        Schema::table('avis', function (Blueprint $table) {
            $table->dropColumn('admin_viewed');
        });
    }
};
