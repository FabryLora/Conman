<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $guarded = [];

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function realProducts()
    {
        return $this->hasMany(RealProduct::class);
    }
}
