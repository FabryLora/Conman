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

    public function __construct($archivoPath)
    {
        $this->archivoPath = $archivoPath;
    }

    public function handle()
    {
        // Obtener el valor de "compra" desde la API
        $response = Http::get('https://dolarapi.com/v1/dolares/oficial');
        $dolarCompra = $response->successful() ? $response->json()['venta'] : null;

        if (!$dolarCompra) {
            throw new \Exception('No se pudo obtener el valor del dólar.');
        }

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

            if (!empty($colA) && empty($most)) {
                $currentProduct = Product::updateOrCreate(
                    ['name' => $colA],
                    [
                        'category_id' => 2,
                        'description' => $colA,
                        'image' => null,
                        'file' => null,
                    ]
                );
                continue;
            }

            if (!empty($colA) && !empty($colB) && $currentProduct) {
                $imagenPath = null;
                if ($imagen && filter_var($imagen, FILTER_VALIDATE_URL)) {
                    $imagenData = Http::get($imagen)->body();
                    $nombreImagen = 'imagenes/' . uniqid() . '.jpg';
                    Storage::put('public/' . $nombreImagen, $imagenData);
                    $imagenPath = $nombreImagen;
                } elseif ($imagen) {
                    $imagenPath = $imagen;
                }

                RealProduct::updateOrCreate(
                    [
                        'code' => $colA,

                    ],
                    [
                        'name'        => $colB,
                        'price'       => $most30 ? ((float) $most30 * (float) $dolarCompra) : null,
                        'dolar_price' => (float) $most30,
                        'image'       => $imagenPath,
                        'discount'    => 0,
                    ]
                );
            }
        }
    }
}
