<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageResource::collection(Image::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                "image" => "required|string",
                "principal" => "boolean|nullable"
            ]
        );
        if (isset($data["image"])) {
            $realativePath = $this->saveImage($data["image"]);
            $data["image"] = $realativePath;
        }

        $image = Image::create($data);
        return new ImageResource($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return new ImageResource($image);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        $data = $request->validate([
            "image"=> "required|string",
            "principal" => "boolean|nullable"
        ]);
        if (isset($data["image"])) {
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;

            if ($image->image) {
                $absolutePath = public_path($image->image);
                File::delete($absolutePath);
            }
        }
        $image->update($data);
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        $image->delete();
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
