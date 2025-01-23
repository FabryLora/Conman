<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ["name","oreder_value", "image", "destacado"];

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }
}
