<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produits';

    protected $primaryKey = 'id_produit';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'nom',
        'description',
        'origine_details',
        'calibre_variete',
        'pays_origine',
        'categorie',
        'stock_disponible',
        'poids_unitaire_kg',
        'prix_unitaire_kg',
        'conditionnement',
        'methode_extraction',
        'moq',
        'certifications',
        'saisonnalite',
        'utilisation',
        'image_url',
        'statut',
    ];

    protected $casts = [
        'stock_disponible' => 'decimal:2',
        'poids_unitaire_kg' => 'decimal:3',
        'prix_unitaire_kg' => 'decimal:2',
    ];

    public function avis(): HasMany
    {
        return $this->hasMany(Avis::class, 'id_produit', 'id_produit');
    }

    public function lignesCommandes(): HasMany
    {
        return $this->hasMany(LigneCommande::class, 'id_produit', 'id_produit');
    }
}
