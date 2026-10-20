<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageContact extends Model
{
    use HasFactory;

    protected $table = 'message_contacts';
    protected $primaryKey = 'id_message';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'nom',
        'email',
        'sujet',
        'message',
        'produits_selectionnes',
        'statut',
        'date_envoi',
        'reponse_admin',
        'date_traitement',
    ];

    protected $casts = [
        'produits_selectionnes' => 'array',
        'date_envoi' => 'datetime',
        'date_traitement' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }
}
