<?php

namespace App\Models;

use App\Models\Blog;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}