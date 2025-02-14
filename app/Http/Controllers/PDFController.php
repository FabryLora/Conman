<?php

namespace App\Http\Controllers;

use App\Http\Resources\PDFResource;
use App\Models\PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class PDFController extends Controller
{

    public function index()
    {
        return PDFResource::collection(PDF::all());
    }

    public function show(PDF $pdf)
    {
        return new PDFResource($pdf);
    }

    public function update(Request $request, PDF $pdf)
    {
        $data = $request->validate([
            'name' => 'nullable|string|',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,gif',
            'pdf' => 'nullable|file|mimes:pdf',
        ]);

        // Si se sube una nueva imagen, eliminar la anterior y guardar la nueva
        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($pdf->image) {
                $absolutePath = public_path('storage/' . $pdf->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        // Si se sube un nuevo archivo, eliminar el anterior y guardar el nuevo
        if ($request->hasFile('pdf')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($pdf->pdf) {
                $absolutePath = public_path('storage/' . $pdf->pdf);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $pdfPath = $request->file('pdf')->store('pdfs', 'public');
            $data["pdf"] = $pdfPath;
        }

        // Intentar actualizar y verificar si realmente cambia algo
        $pdf->update($data);

        return new PDFResource($pdf);
    }



    // 📤 Subir PDF
    public function uploadPDF(Request $request)
    {
        $data = $request->validate([
            'pdf' => 'required|file|mimes:pdf|', // Máximo 2MB, solo PDFs
            'name' => 'required|string|max:255',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,gif', // Máximo 2MB, solo imágenes
        ]);

        // Guardar la imagen
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $pdfPath = $request->file('pdf')->store('pdfs', 'public');
        $data["pdf"] = $pdfPath;


        $pdf = PDF::create($data);


        return response()->json($pdf, 201);
    }

    // 📥 Descargar PDF
    public function downloadPDF($filename)
    {


        $path = storage_path("app/public/pdfs/" . $filename); // Ruta correcta

        if (file_exists($path)) {
            return response()->download($path);
        }

        return response()->json(['message' => 'Archivo no encontrado'], 404);
    }

    public function destroy($id)
    {

        $pdf = PDF::find($id);

        if ($pdf->image) {
            $absolutePath = public_path('storage/' . $pdf->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }
        if ($pdf->pdf) {
            $absolutePath = public_path('storage/' . $pdf->pdf);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        $pdf->delete();
        return response("", 204);
    }
}
