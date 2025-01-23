<?php

namespace App\Http\Controllers;

use App\Http\Requests\SliderStore;
use App\Http\Requests\SliderUpdate;
use App\Http\Resources\SliderResource;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SliderResource::collection(Slider::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SliderStore $request)
    {
        $data = $request->validated();

        if (isset($data["image"])) {
            $realativePath = $this->saveImage($data["image"]);
            $data["image"] = $realativePath;
        }

        $slider = Slider::create($data);

        return new SliderResource($slider);
    }

    /**
     * Display the specified resource.
     */
    public function show(Slider $slider, Request $request)
    {
        return new SliderResource($slider);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SliderUpdate $request, Slider $slider)
    {
        $data = $request->validated();

        if (isset($data["image"])) {
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;

            if ($slider->image) {
                $absolutePath = public_path($slider->image);
                File::delete($absolutePath);
            }
        }

        $slider->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider)
    {
        $slider->delete();

        if ($slider->image) {
            $absolutePath = public_path($slider->image);
            File::delete($absolutePath);
        }

        return response("",204);
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
