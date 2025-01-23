<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    
    protected $fillable = ['name', 'code', 'price', 'subcategory_id', "image_id"];

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function image()
    {
        return $this->hasMany(Image::class);
    }
}
