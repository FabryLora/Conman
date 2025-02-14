<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class PDFResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $path = storage_path("app/public/" . $this->pdf);

        return [
            "id" => $this->id,
            "name" => $this->name,
            "pdf_url" => $this->pdf ? url("storage/" . $this->pdf) : null,
            "image_url" => $this->image ? url("storage/" . $this->image) : null,
            "peso" => file_exists($path) ? filesize($path) : null, // Tamaño en bytes
            "formato" => file_exists($path) ? mime_content_type($path) : null, // Tipo MIME
        ];
    }
}
