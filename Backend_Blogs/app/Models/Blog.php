<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;


    protected $fillable = [
        'image', 
        'title', 
        'article', 
        'user_id', 
        'categories', 
        'likes', 
        'comments_count', 
        'short_description', 
        'published_at'
    ];
    
     
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    function comments(){
        return $this->hasMany(Comment::class);
    }

    function users(){
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
