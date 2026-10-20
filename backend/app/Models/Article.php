<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\CategorieArticle;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';
    protected $primaryKey = 'id_article';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'categorie_id',
        'titre',
        'slug',
        'extrait',
        'contenu',
        'image_url',
        'statut',
        'date_publication',
    ];

    protected $casts = [
        'date_publication' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function categorieArticle(): BelongsTo
    {
        return $this->belongsTo(CategorieArticle::class, 'categorie_id', 'id_categorie_article');
    }

    //Scope pour la logique metier des articles et leurs statuts
    public function scopePublished($query)
    {
        return $query->where('statut', 'publie');
    }

    public function scopeDraft($query)
    {
        return $query->where('statut', 'brouillon');
    }

    public function scopeArchived($query)
    {
        return $query->where('statut', 'archive');
    }
}
