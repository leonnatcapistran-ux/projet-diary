<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Article;


class CategorieArticle extends Model
{
    use HasFactory;

    protected $table = 'categorie_articles';
    protected $primaryKey = 'id_categorie_article';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'description'
    ];
    public function articles()
    {
        return $this->hasMany(Article::class, 'categorie_id', 'id_categorie_article');
    }
}
