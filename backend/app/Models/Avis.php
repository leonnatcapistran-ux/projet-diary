<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $table = 'avis';
    protected $primaryKey = 'id_avis';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'id_produit',
        'id_commande',
        'note',
        'commentaire',
        'statut',
        'admin_viewed',
        'date_avis',
    ];

    protected $casts = [
        'date_avis' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit', 'id_produit');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }
}
