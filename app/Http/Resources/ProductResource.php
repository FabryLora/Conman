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
            "description" => $this->description,
            "image_url" => $this->image ? url("storage/" . $this->image) : null,
            "file_url" => $this->file ? url("storage/" . $this->file) : null,
            "images" => ImageResource::collection($this->whenLoaded('images')),
            "realProducts" => RealProductResource::collection($this->whenLoaded('realProducts')),
            "category" => new CategoryResource($this->whenLoaded('category')),
            "subCategory" => $this->sub_category_id ? new SubCategoryResource($this->whenLoaded('subCategory')) : null,
        ];
    }
}
