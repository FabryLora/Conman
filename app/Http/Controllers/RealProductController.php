<?php

namespace App\Http\Controllers;

use App\Http\Resources\RealProductResource;
use App\Models\RealProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class RealProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RealProductResource::collection(RealProduct::with("product")->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => "required|string",
            "code" => "required|string",
            "price" => "required|numeric",
            "discount" => "nullable|integer",
            "dolar_price" => "required|numeric",
            "image" => "required|file|mimes:jpg,jpeg,png,gif",
            "product_id" => "required|exists:products,id",
        ]);


        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        $realProduct = RealProduct::create($data);
        return new RealProductResource($realProduct);
    }

    /**
     * Display the specified resource.
     */
    public function show(RealProduct $realProduct)
    {
        $realProduct->load("product");
        return new RealProductResource($realProduct);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $realProduct = RealProduct::find($id);

        $data = $request->validate([
            "name" => "required|string",
            "code" => "required|string",
            "price" => "required|numeric",
            "dolar_price" => "required|numeric",
            "discount" => "nullable|integer",
            "image" => "nullable|file|mimes:jpg,jpeg,png,gif",
            "product_id" => "required|exists:products,id",
        ]);


        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($realProduct->image) {
                $absolutePath = public_path('storage/' . $realProduct->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $realProduct->update($data);

        return response()->json($realProduct, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $realProduct = RealProduct::find($id);

        if ($realProduct->image) {
            $absolutePath = public_path('storage/' . $realProduct->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }
        $realProduct->delete();


        return response()->json('', 204);
    }
}
