<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ["image", "principal", "product_id"];

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
