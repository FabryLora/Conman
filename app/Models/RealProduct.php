<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RealProduct extends Model
{

    protected $fillable = [
        'product_id',
        'name',
        'code',
        'price',
        'discount',
        'image',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function subCategories()
    {
        return $this->belongsTo(SubCategory::class);
    }
}
