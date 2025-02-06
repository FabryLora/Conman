<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryResource::collection(Category::with('subcategories', 'products')->get());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => "required|string",
            "order_value" => "string",
            "link" => "string",
            "image" => "file|nullable",
            "destacado" => "boolean|nullable"
        ]);

        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        $category = Category::create($data);
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $category->load('subcategories', 'products');
        return new CategoryResource($category);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $category = Category::findOrFail($id);



        $data = $request->validate([
            "name" => "required|string",
            "order_value" => "string",
            "link" => "string",
            "image" => "string|nullable",
            "destacado" => "boolean|nullable"
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($category->image) {
                $absolutePath = public_path('storage/' . $category->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }



        $category->update($data);
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        if ($category->image) {
            $absolutePath = public_path('storage/' . $category->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }
        $category->delete();
        return response('', 204);
    }
}
