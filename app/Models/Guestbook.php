<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
class Guestbook extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'link',
        'comment',
        'user_ip',
        'user_agent',
        'image',
    ];
    protected $casts = [
        'created_at' => "datetime:d-m-Y H:i",
    ];

//    public function getImageAttribute()
//    {
//        return url('storage/uploads/guestbook/source').'/'.$this->attributes['image'];
//    }

}
