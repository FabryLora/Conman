<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [];

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
