<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class RealProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *p
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "code" => $this->code,
            "price" => $this->price,
            'image_url' => $this->image ? URL::to($this->image) : null,
            "discount" => $this->discount,
            "product" => new ProductResource($this->whenLoaded('product')),


        ];
    }
}
