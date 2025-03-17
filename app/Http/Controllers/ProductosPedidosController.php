<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProdPedidoResource;
use App\Models\ProductosPedidos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class ProductosPedidosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProdPedidoResource::collection(ProductosPedidos::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                "name" => "required|string",
                "code" => "required|string",
                "price" => "required|numeric",
                "dolar_price" => "required|numeric",
                "cantidad" => "required|numeric",
                "image" => "required|string",
                'descuentoEntrega' => "required|nullable",
                'descuentoCliente' => "required|nullable",
                "pedido_id" => "required|exists:pedidos,id",
            ]
        );


        $productoPedido = ProductosPedidos::create($data);
        return new ProdPedidoResource($productoPedido);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductosPedidos $productosPedidos)
    {
        return new ProdPedidoResource($productosPedidos);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductosPedidos $productosPedidos)
    {
        if ($productosPedidos->image) {
            $absolutePath = public_path('storage/' . $productosPedidos->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }
        $productosPedidos->delete();
        return new ProdPedidoResource($productosPedidos);
    }
}
