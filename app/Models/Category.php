<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'status',
        'image',
    ];

    protected $casts = [
        'created_at' => "datetime:d-m-Y H:i",
    ];

    public function posts() {
        return $this->hasMany(Post::class, 'category_id', 'id');
    }

    public function setSlugAttribute($value)
    {
        if (static::whereSlug($slug = str_slug($value))->exists()) {
            $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();
            $slug = "{$slug}-{$count}";
        }
        $this->attributes['slug'] = $slug;
    }
}
