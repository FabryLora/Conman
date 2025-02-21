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

class ImportarImportadosJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $archivoPath;

    public function __construct($archivoPath)
    {
        $this->archivoPath = $archivoPath;
    }

    public function handle()
    {
        $filePath = Storage::path($this->archivoPath);
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray(null, true, true, true);

        $currentProduct = null;

        foreach ($rows as $index => $row) {
            if ($index === 1) continue; // Saltar encabezado

            $colA = trim($row['A'] ?? '');
            $colB = trim($row['B'] ?? '');
            $most = $row['C'] ?? null;
            $most30 = $row['D'] ?? null;
            $imagen = $row['I'] ?? null;

            // 📌 Si la columna A tiene texto y C está vacía, es un nuevo Product (por celda combinada)
            if (!empty($colA) && empty($most)) {
                $currentProduct = Product::firstOrCreate([
                    'name' => $colA, // Solo usamos A porque B está vacía por la celda combinada
                    'category_id' => 2, // Ajusta según sea necesario
                    'description' => $colA,
                    'image' => null,
                    'file' => null,
                ]);
                continue;
            }

            // 📌 Si hay código en A y nombre en B, es un RealProduct asociado al último Product detectado
            if (!empty($colA) && !empty($colB) && $currentProduct) {
                // Manejo de imagen
                $imagenPath = null;
                if ($imagen && filter_var($imagen, FILTER_VALIDATE_URL)) {
                    $imagenData = Http::get($imagen)->body();
                    $nombreImagen = 'imagenes/' . uniqid() . '.jpg';
                    Storage::put('public/' . $nombreImagen, $imagenData);
                    $imagenPath = $nombreImagen;
                } elseif ($imagen) {
                    $imagenPath = $imagen;
                }

                // Crear RealProduct
                RealProduct::create([
                    'code'        => $colA,
                    'name'        => $colB,
                    'price'       => (float) $most,
                    'dolar_price' => (float) $most30,
                    'image'       => null,
                    'discount'    => 0,
                    'product_id'  => $currentProduct->id,
                ]);
            }
        }
    }
}
