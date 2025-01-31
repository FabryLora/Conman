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
            "image" => "string|nullable",
            "product_id" => "required|exists:products,id",
        ]);

        if (isset($data["image"])) {
            $realativePath = $this->saveImage($data["image"]);
            $data["image"] = $realativePath;
        }

        $product = RealProduct::create($data);
        return new RealProductResource($product);
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
    public function update(Request $request, RealProduct $realProduct)
    {
        $data = $request->validate([
            "name" => "required|string",
            "code" => "required|string",
            "price" => "required|numeric",
            "discount" => "nullable|integer",
            "image" => "string|nullable",

        ]);

        if (isset($data["image"])) {
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;

            if ($realProduct->image) {
                $absolutePath = public_path($realProduct->image);
                File::delete($absolutePath);
            }
        }

        $realProduct->update($data);
        return new RealProductResource($realProduct);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RealProduct $realProduct)
    {
        $realProduct->delete();
        return response('', 204);
    }

    private function saveImage($image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ",") + 1);
            $type = strtolower($type[1]);

            if (!in_array($type, ["jpg", "jpeg", "gif", "png"])) {
                throw new \Exception("invalid image type");
            }
            $image = str_replace(" ", "+", $image);
            $image = base64_decode($image);
        } else {
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
