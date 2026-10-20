<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $primaryKey = 'id_user';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'telephone',
        'adresse',
        'pays_residence',
        'type_client',
        'role',
        'statut',
        'compte_invite',
        'entreprise',
        'numero_tva',
        'date_creation',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'mot_de_passe',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'mot_de_passe' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'compte_invite' => 'boolean',
            'date_creation' => 'datetime',
        ];
    }

    public function getAuthPassword(): string
    {
        return $this->mot_de_passe;
    }

    public function getNameAttribute(): string
    {
        return trim($this->prenom.' '.$this->nom);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'user_id', 'id_user');
    }
}
