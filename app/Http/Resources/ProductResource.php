<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            "images" => ImageResource::collection($this->whenLoaded('images')),
            "realProducts" => RealProductResource::collection($this->whenLoaded('realProducts')),
            "category" => new CategoryResource($this->whenLoaded('category')),
            "subCategory" => new SubCategoryResource($this->whenLoaded('subCategory')),

        ];
    }
}
