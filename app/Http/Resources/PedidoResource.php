<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
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
            "mensaje" => $this->mensaje,
            'archivo_url' => $this->archivo ? url('storage/' . $this->archivo) : null,
            "tipo_entrega" => $this->tipo_entrega,
            "subtotal" => $this->subtotal,
            "descuento" => $this->descuento,
            "subtotaldescuento" => $this->subtotaldescuento,
            "iva" => $this->iva,
            "total" => $this->total,
            "prodPedidos" => ProdPedidoResource::collection($this->whenLoaded('prodPedidos')),
            "userPedido" => new UserPedidosResource($this->whenLoaded('userPedido')),
        ];
    }
}
