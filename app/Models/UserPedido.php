<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPedido extends Model
{
    protected $guarded = [];

    public function pedidos()
    {
        return $this->belongsTo(Pedido::class);
    }
}
