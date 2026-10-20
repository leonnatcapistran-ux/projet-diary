<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    use HasFactory;

    protected $table = 'ligne_commandes';
    protected $primaryKey = 'id_ligne';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'id_commande',
        'id_produit',
        'quantite_kg',
        'prix_unitaire',
        'sous_total',
    ];

    protected $casts = [
        'quantite_kg' => 'decimal:2',
        'prix_unitaire' => 'decimal:2',
        'sous_total' => 'decimal:2',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit', 'id_produit');
    }
}
