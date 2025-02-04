<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdPedidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "code" => $this->code,
            "price" => $this->price,
            "discount" => $this->discount,
            "price_discount" => $this->price_discount,
            "cantidad" => $this->cantidad,
            "image" => $this->image,
        ];
    }
}
