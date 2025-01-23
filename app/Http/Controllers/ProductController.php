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
        return ProductResource::collection(Product::with("images")->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStore $request)
    {
        $data = $request->validated();
        $product = Product::create($data);
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load("images");
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
        $product->delete();
        return response("",204);
    }
}
