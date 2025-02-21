<?php

namespace App\Http\Controllers;

use App\Jobs\ImportarImportadosJob;
use App\Jobs\ImportarManguerasJob;
use Illuminate\Http\Request;
use App\Jobs\ImportarProductosJob;
use Illuminate\Support\Facades\Storage;

class ImportImportadosController extends Controller
{
    public function importar(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xlsx,xls'
        ]);

        // Guardar archivo en almacenamiento temporal
        $archivoPath = $request->file('archivo')->store('importaciones');

        // Encolar el Job
        ImportarImportadosJob::dispatch($archivoPath);

        return response()->json(['message' => 'El archivo se está procesando en segundo plano.'], 200);
    }
}
