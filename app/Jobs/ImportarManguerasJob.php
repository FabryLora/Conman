<?php

namespace App\Jobs;

use App\Models\Product;
use App\Models\RealProduct;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class ImportarManguerasJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $archivoPath;

    /**
     * Create a new job instance.
     */
    public function __construct($archivoPath)
    {
        $this->archivoPath = $archivoPath;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $filePath = Storage::path($this->archivoPath);

        // Cargar el archivo Excel
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray(null, true, true, true);

        $currentProduct = null; // Mantiene el Product actual para asociar RealProducts

        foreach ($rows as $index => $row) {
            // Omitir la primera fila (encabezados)
            if ($index === 1) continue;

            $codigo = $row['A'] ?? null;
            $nombre = $row['B'] ?? null;
            $most = $row['C'] ?? null;
            $most30 = $row['D'] ?? null;
            $interior = $row['E'] ?? null;
            $imagen = $row['I'] ?? null;

            // Si la columna de código está vacía, puede ser un título de categoría (Product)
            if (empty($codigo) && !empty($nombre)) {
                $currentProduct = Product::firstOrCreate([
                    'name' => trim($nombre)
                ]);
                continue;
            }

            // Si no hay código ni nombre, la fila es inválida
            if (!$codigo || !$nombre || !$currentProduct) {
                continue;
            }

            // Manejo de la imagen
            $imagenPath = null;
            if ($imagen && filter_var($imagen, FILTER_VALIDATE_URL)) {
                $imagenData = Http::get($imagen)->body();
                $nombreImagen = 'imagenes/' . uniqid() . '.jpg';
                Storage::put('public/' . $nombreImagen, $imagenData);
                $imagenPath = $nombreImagen;
            } elseif ($imagen) {
                $imagenPath = $imagen;
            }

            // Guardar en la base de datos
            RealProduct::create([
                'code'        => trim($codigo),
                'name'        => trim($nombre),
                'price'       => (float) $most,
                'dolar_price' => (float) $most30,
                'image'       => $imagenPath,
                'discount'    => 0, // Asumiendo que no hay descuento
                'product_id'  => $currentProduct->id,
            ]);
        }
    }
}
