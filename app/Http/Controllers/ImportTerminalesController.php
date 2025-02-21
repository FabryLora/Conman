<?php

namespace App\Http\Controllers;

use App\Jobs\ImportarManguerasJob;
use Illuminate\Http\Request;
use App\Jobs\ImportarProductosJob;
use App\Jobs\ImportarTerminalesJob;
use Illuminate\Support\Facades\Storage;

class ImportTerminalesController extends Controller
{
    public function importar(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xlsx,xls'
        ]);

        // Guardar archivo en almacenamiento temporal
        $archivoPath = $request->file('archivo')->store('importaciones');

        // Encolar el Job
        ImportarTerminalesJob::dispatch($archivoPath);

        return response()->json(['message' => 'El archivo se está procesando en segundo plano.'], 200);
    }
}
