<?php

namespace App\Http\Controllers;

use App\Http\Resources\CalidadInicioResource;
use App\Models\CalidadInicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CalidadInicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CalidadInicioResource::collection(CalidadInicio::all());
    }


    /**
     * Display the specified resource.
     */
    public function show(CalidadInicio $calidadInicio)
    {
        return new CalidadInicioResource($calidadInicio);
    }


    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        $calidadInicio = CalidadInicio::find($id);

        if (!$calidadInicio) {
            return response()->json(["error" => "CalidadInicio no encontrada"], 404);
        }

        $data = $request->validate([
            "imageOne" => "sometimes|file",
            "imageTwo" => "sometimes|file",
            "text" => "required",
            "title" => "required",
        ]);

        foreach (['imageOne', 'imageTwo'] as $imageField) {
            if ($request->hasFile($imageField)) {
                // Eliminar la imagen existente si ya hay una guardada
                if ($calidadInicio->$imageField) {
                    $absolutePath = public_path('storage/' . $calidadInicio->$imageField);
                    if (File::exists($absolutePath)) {
                        File::delete($absolutePath);
                    }
                }

                // Guardar la nueva imagen
                $imagePath = $request->file($imageField)->store('images', 'public');
                $data[$imageField] = $imagePath;
            }
        }

        $calidadInicio->update($data);

        return new CalidadInicioResource($calidadInicio);
    }
}
