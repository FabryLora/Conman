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

class ImportarTerminalesJob implements ShouldQueue
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

        $productos = []; // Array para rastrear los grupos (Product)

        foreach ($rows as $index => $row) {
            if ($index === 1) continue; // Saltar encabezado

            $codigo = trim($row['A'] ?? '');
            $nombreCompleto = trim($row['B'] ?? '');
            $precio = $row['D'] ?? null;

            if (empty($codigo) || empty($nombreCompleto)) {
                continue;
            }

            // Intentar separar el grupo y el agregado de forma genérica
            $partes = explode(' ', $nombreCompleto);
            $grupo = array_shift($partes);
            foreach ($partes as $parte) {
                if (!preg_match('/[0-9]/', $parte)) {
                    $grupo .= ' ' . $parte;
                } else {
                    break;
                }
            }
            $agregado = trim(str_replace($grupo, '', $nombreCompleto));

            // Buscar o crear el Product
            if (!isset($productos[$grupo])) {
                $product = Product::where('name', $grupo)->first();

                if ($product) {
                    // Si el producto ya existe, actualiza la descripción (puedes agregar más campos si es necesario)
                    $product->update([
                        'description' => $grupo,
                    ]);
                } else {
                    // Si no existe, se crea
                    $product = Product::create([
                        'name' => $grupo,
                        'category_id' => 1,
                        'description' => $grupo,
                        'image' => null,
                        'file' => null,
                    ]);
                }

                $productos[$grupo] = $product;
            }

            $product = $productos[$grupo];

            // Buscar si ya existe el RealProduct con el código
            $realProduct = RealProduct::where('code', $codigo)->first();

            if ($realProduct) {
                // Si ya existe, se actualiza
                $realProduct->update([
                    'name'        => "$grupo $agregado",
                    'price'       => (float) $precio,
                    'dolar_price' => 0,
                    'discount'    => 0,
                    'product_id'  => $product->id,
                ]);
            } else {
                // Si no existe, se crea
                RealProduct::create([
                    'code'        => $codigo,
                    'name'        => "$grupo $agregado",
                    'price'       => (float) $precio,
                    'dolar_price' => 0,
                    'image'       => null,
                    'discount'    => 0,
                    'product_id'  => $product->id,
                ]);
            }
        }
    }
}
