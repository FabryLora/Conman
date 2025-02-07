<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NosotrosSecondResource extends JsonResource
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
            "mision" => $this->mision,
            "vision" => $this->vision,
            "sustentabilidad" => $this->sustentabilidad,

        ];
    }
}
