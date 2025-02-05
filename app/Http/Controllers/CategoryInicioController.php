<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryInicioResource;
use App\Models\CategoryInicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class CategoryInicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryInicioResource::collection(CategoryInicio::all());
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = CategoryInicio::findOrFail($id);

        return response()->json($category);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $categoryInicio = CategoryInicio::findOrFail($id);


        $data = $request->validate([
            "name" => " required | string | max:255",
            "image" => " required | file | mimes:jpg,jpeg,png,gif",
            "link" => " required | string | max:255",
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($categoryInicio->image) {
                $absolutePath = public_path('storage/' . $categoryInicio->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $categoryInicio->update($data);
        return response()->json($categoryInicio);
    }
}
