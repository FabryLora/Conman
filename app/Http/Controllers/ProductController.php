<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStore;
use App\Http\Requests\ProductUpdate;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::with(["images","category","subCategory"])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStore $request)
    {
        $data = $request->validated();
        $product = Product::create($data);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image');
            $imagePath = $imagePath->store('images', 'public');
    
            
            $product->images()->create([
                'image' => $imagePath,
            ]);
        }

        return new ProductResource($product->load(["images", "subCategory", "category"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['images', 'subCategory', 'category']);
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
    public function update(ProductUpdate $request, Product $product)
    {
        $data = $request->validated();
        $product->update($data);
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {   
        $product->images->each(function($image){
            $image->delete();
        });
        $product->delete();
        return response("",204);
    }
}
