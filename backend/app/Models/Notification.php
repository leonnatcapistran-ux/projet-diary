<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{User, Commande};

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';
    protected $primaryKey = 'id_notification';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'id_commande',
        'type',
        'message',
        'lu',
        'date_envoi',
    ];

    protected $casts = [
        'lu' => 'boolean',
        'date_envoi' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }
}
