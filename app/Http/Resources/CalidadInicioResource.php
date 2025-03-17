<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalidadInicioResource extends JsonResource
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
            "text" => $this->text,
            "imageOne" => $this->imageOne ? url("storage/" . $this->imageOne) : null,
            "imageTwo" => $this->imageTwo ? url("storage/" . $this->imageTwo) : null,
            "title" => $this->title,
        ];
    }
}
