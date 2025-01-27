<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    
    protected $fillable = [
        'name', 'code', 'price', 'category_id', 'sub_category_id',
    ];

    public function subCategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function category()
    {
        return $this->belongsTo(Subcategory::class, 'sub_category_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
