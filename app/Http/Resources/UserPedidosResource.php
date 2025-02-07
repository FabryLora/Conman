<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPedidosResource extends JsonResource
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
            "codigo_postal" => $this->codigo_postal,
            "direccion" => $this->direccion,
            "telefono" => $this->telefono,
            "nombre" => $this->nombre,
            "email" => $this->email,
            "dni" => $this->dni,
            "localidad" => $this->localidad,
            "provincia" => $this->provincia,
            "razon_social" => $this->razon_social,

        ];
    }
}
