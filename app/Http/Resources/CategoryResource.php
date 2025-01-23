<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "order_value"=> $this->order_value,
            "subcategories" => SubCategoryResource::collection($this->whenLoaded('subcategories')),
            "destacado" => $this->destacado,
            'image_url' => $this->image ? URL::to($this->image) : null,
        ];
    }
}
