<?php

namespace App\Jobs;

use App\Models\RealProduct;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ActualizarPreciosJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        // Constructor vacío
    }

    public function handle()
    {
        // Obtener el valor de "compra" desde la API
        $response = Http::get('https://dolarapi.com/v1/dolares/oficial');
        $dolarCompra = $response->successful() ? $response->json()['venta'] : null;

        if (!$dolarCompra) {
            throw new \Exception('No se pudo obtener el valor del dólar.');
        }

        // Obtener todos los RealProducts y actualizar precios si dolar_price no es null o mayor a 0
        RealProduct::whereNotNull('dolar_price')->where('dolar_price', '>', 0)->each(function ($producto) use ($dolarCompra) {
            $producto->price = (float) $producto->dolar_price * (float) $dolarCompra;
            $producto->save();
        });
    }
}
