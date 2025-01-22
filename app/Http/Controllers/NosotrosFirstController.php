<?php

namespace App\Http\Controllers;

use App\Http\Requests\NosotrosFirstUpdate;
use App\Http\Resources\NosotrosFirstResourse as NosotrosFirstResource;
use App\Models\NosotrosFirst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class NosotrosFirstController extends Controller
{
    public function index( Request $request)
    {
        return NosotrosFirstResource::collection(NosotrosFirst::paginate(50));
    }

   
    public function show(NosotrosFirst $nosotrosFirst, Request $request)
    {
        
        return new NosotrosFirstResource($nosotrosFirst);
    }

    
    public function update(NosotrosFirstUpdate $request, NosotrosFirst $nosotrosFirst)
    {
        $data = $request->validated();

        if (isset($data["image"])) {
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;

            if ($nosotrosFirst->image) {
                $absolutePath = public_path($nosotrosFirst->image);
                File::delete($absolutePath);
            }
        }
        $nosotrosFirst->update($data);
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
