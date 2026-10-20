<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{Avis, Facture, User, LigneCommande};

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commandes';
    protected $primaryKey = 'id_commande';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'date_commande',
        'pays_origine',
        'statut',
        'admin_viewed',
        'date_statut',
        'montant_total',
        'type_achat',
        'adresse_livraison',
        'pays_livraison',
        'num_telephone',
        'email_valide',
        'mode_transport',
        'cout_transport',
        'poids_total_kg',
        'numero_suivi',
        'date_livraison_estimee',
    ];

    protected $casts = [
        'date_commande' => 'datetime',
        'date_statut' => 'datetime',
        'date_livraison_estimee' => 'date',
        'montant_total' => 'decimal:2',
        'cout_transport' => 'decimal:2',
        'poids_total_kg' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function facture()
    {
        return $this->hasOne(Facture::class, 'id_commande', 'id_commande');
    }

    public function lignes()
    {
        return $this->hasMany(LigneCommande::class, 'id_commande', 'id_commande');
    }

    public function avis()
    {
        return $this->hasOne(Avis::class, 'id_commande', 'id_commande');
    }
}
