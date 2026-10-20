<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->text('origine_details')->nullable()->after('description');
            $table->string('calibre_variete', 255)->nullable()->after('origine_details');
            $table->text('conditionnement')->nullable()->after('prix_unitaire_kg');
            $table->text('methode_extraction')->nullable()->after('conditionnement');
            $table->string('moq', 100)->nullable()->after('methode_extraction');
            $table->string('certifications', 255)->nullable()->after('moq');
            $table->string('saisonnalite', 255)->nullable()->after('certifications');
            $table->text('utilisation')->nullable()->after('saisonnalite');
        });
    }

    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->dropColumn([
                'origine_details',
                'calibre_variete',
                'conditionnement',
                'methode_extraction',
                'moq',
                'certifications',
                'saisonnalite',
                'utilisation',
            ]);
        });
    }
};
