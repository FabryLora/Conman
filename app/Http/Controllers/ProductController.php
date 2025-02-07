<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStore;
use App\Http\Requests\ProductUpdate;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::with(["images", "category", "subCategory", "realProducts"])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStore $request)
    {
        $data = $request->validated();

        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        $filePath = $request->file('file')->store('files', 'public');
        $data["file"] = $filePath;
        $product = Product::create($data);
        return new ProductResource($product->load(["images", "subCategory", "category", "realProducts"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['images', 'subCategory', 'category', 'realProducts']);
        return new ProductResource($product);
    }

    public function show_products($id)
    {
        $product = Product::findOrFail($id);
        $product->load(['images', 'subCategory']);
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdate $request, $id)
    {

        $product = Product::find($id);

        $data = $request->validated();
        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($product->image) {
                $absolutePath = public_path('storage/' . $product->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }
        if ($request->hasFile('file')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($product->image) {
                $absolutePath = public_path('storage/' . $product->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $filePath = $request->file('file')->store('files', 'public');
            $data["file"] = $filePath;
        }
        $product->update($data);
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $product = Product::find($id);
        if (!$product) {
            return response()->json(["error" => "Producto no encontrado"], 404);
        }
        if ($product->image) {
            $absolutePath = public_path('storage/' . $product->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }
        if ($product->file) {
            $absolutePath = public_path('storage/' . $product->file);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        $product->images->each(function ($image) {
            $image->delete();
        });
        $product->delete();
        return response("", 204);
    }

    public function downloadPDF($filename)
    {
        $path = storage_path("app/public/files/" . $filename); // Ruta correcta

        if (file_exists($path)) {
            return response()->download($path);
        }

        return response()->json(['message' => 'Archivo no encontrado'], 404);
    }
}
