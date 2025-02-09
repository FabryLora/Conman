<?php

namespace App\Http\Controllers;

use App\Http\Resources\CalidadInfoResource;
use App\Models\CalidadInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class CalidadInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CalidadInfoResource::collection(CalidadInfo::all());
    }




    /**
     * Display the specified resource.
     */
    public function show(CalidadInfo $calidadInfo)
    {
        return new CalidadInfoResource($calidadInfo);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $calidadInfo = CalidadInfo::find($id);

        $data = $request->validate([
            "text" => "nullable",
            "image" => "nullable|file|mimes:jpg,jpeg,png,gif",
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($calidadInfo->image) {
                $absolutePath = public_path('storage/' . $calidadInfo->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $calidadInfo->update($data);
        return response()->json($calidadInfo);
    }
}
