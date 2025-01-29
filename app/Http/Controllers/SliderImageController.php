<?php

namespace App\Http\Controllers;

use App\Http\Resources\SliderImageResource;
use App\Models\SliderImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SliderImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SliderImageResource::collection(SliderImage::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "image" => "required|file|mimes:jpg,jpeg,png,gif", // Para imágenes cargadas como archivos
            "slider_id" => "required|exists:sliders,id"

        ]);

        // Guardar la imagen en el sistema de archivos
        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        // Crear el registro de la imagen
        $image = SliderImage::create($data);

        return new SliderImageResource($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(SliderImage $sliderImage)
    {
        return new SliderImageResource($sliderImage);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SliderImage $sliderImage)
    {
        $data = $request->validate([
            "image" => "file|mimes:jpg,jpeg,png,gif|nullable", // Imagen opcional

        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($sliderImage->image) {
                $absolutePath = public_path('storage/' . $sliderImage->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        // Actualizar el registro de la imagen
        $sliderImage->update($data);

        return new SliderImageResource($sliderImage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SliderImage $sliderImage)
    {
        if ($sliderImage->image) {
            $absolutePath = public_path('storage/' . $sliderImage->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        // Eliminar el registro de la imagen
        $sliderImage->delete();

        return response('', 204);
    }
}
