<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageResource::collection(Image::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "image" => "required|file|mimes:jpg,jpeg,png,gif", // Para imágenes cargadas como archivos
            "principal" => "boolean|nullable",
            "product_id" => "required|exists:products,id"
        ]);

        // Guardar la imagen en el sistema de archivos
        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        // Crear el registro de la imagen
        $image = Image::create($data);

        return new ImageResource($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return new ImageResource($image);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        $data = $request->validate([
            "image" => "file|mimes:jpg,jpeg,png,gif|nullable", // Imagen opcional
            "principal" => "boolean|nullable"
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($image->image) {
                $absolutePath = public_path('storage/' . $image->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        // Actualizar el registro de la imagen
        $image->update($data);

        return new ImageResource($image);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // Eliminar la imagen del sistema de archivos
        if ($image->image) {
            $absolutePath = public_path('storage/' . $image->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        // Eliminar el registro de la imagen
        $image->delete();

        return response('', 204);
    }
}
