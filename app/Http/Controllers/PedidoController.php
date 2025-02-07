<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoResource;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PedidoResource::collection(Pedido::with(["prodPedidos", "userPedido"])->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "mensaje" => "nullable|string",
            "archivo" => "sometimes|file",
            "tipo_entrega" => "required|string",
            "subtotal" => "required|string",
            "descuento" => "required|string",
            "subtotaldescuento" => "required|string",
            "iva" => "required|string",
            "total" => "required|string",
        ]);
        if ($request->hasFile('archivo')) {
            $archivoPath = $request->file('archivo')->store('archivos', 'public');
            $data["archivo"] = $archivoPath;
        }


        $pedido = Pedido::create($data);

        return new PedidoResource($pedido);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        $pedido->load(["prodPedidos", "userPedido"]);
        return new PedidoResource($pedido);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        if ($pedido->archivo) {
            $absolutePath = public_path('storage/' . $pedido->archivo);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }
        $pedido->delete();
        return response()->json(null, 204);
    }
}
