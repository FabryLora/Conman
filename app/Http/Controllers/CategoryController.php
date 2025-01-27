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
            "name"=> "required|string",
            "order_value"=> "string",
            "image" => "string|nullable",
            "destacado" => "boolean|nullable"
        ]);

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
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            "name"=> "required|string",
            "order_value"=> "string",
            "image" => "string|nullable",
            "destacado" => "boolean|nullable"
        ]);

        if (isset($data["image"])) {
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;

            if ($category->image) {
                $absolutePath = public_path($category->image);
                File::delete($absolutePath);
            }
        }

        $category->update($data);
        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response('',204);
    }

    private function saveImage($image) {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ",") + 1);
            $type = strtolower($type[1]);

            if (!in_array($type, ["jpg", "jpeg", "gif", "png"])) {
                throw new \Exception("invalid image type");
            }
            $image = str_replace(" ", "+", $image);
            $image = base64_decode($image);
        }
        else {
            throw new \Exception("did not match data URI with image data");
        }

        $dir = "images/";
        $file = Str::random() . "." . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
