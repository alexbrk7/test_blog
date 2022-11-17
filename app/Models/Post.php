<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'content',
        'status',
        'image',
    ];

    protected $casts = [
        'created_at' => "datetime:d-m-Y H:i",
    ];

    // Post in Category
    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
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
