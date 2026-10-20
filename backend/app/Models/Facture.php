<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{Commande};

class Facture extends Model
{
    use HasFactory;

    protected $table = 'factures';
    protected $primaryKey = 'id_facture';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'id_commande',
        'numero_facture',
        'date_emission',
        'montant_ht',
        'taux_tva',
        'montant_tva',
        'montant_ttc',
        'cout_transport',
        'mode_transport',
        'mention_dernier_km',
        'statut_paiement',
        'mode_paiement',
        'payment_reference',
    ];

    protected $casts = [
        'date_emission' => 'datetime',
        'montant_ht' => 'decimal:2',
        'taux_tva' => 'decimal:2',
        'montant_tva' => 'decimal:2',
        'montant_ttc' => 'decimal:2',
        'cout_transport' => 'decimal:2',
        'mention_dernier_km' => 'boolean',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }
}
