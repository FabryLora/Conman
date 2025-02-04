<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $guarded = [];

    public function prodPedidos()
    {
        return $this->hasMany(ProductosPedidos::class);
    }
}
