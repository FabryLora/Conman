<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserPedidosResource;
use App\Models\UserPedido;
use Illuminate\Http\Request;

class UserPedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserPedidosResource::collection(UserPedido::all());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "codigo_postal" => "required",
            "direccion" => "required",
            "telefono" => "required",
            "nombre" => "required",
            "email" => "required",
            "dni" => "required",
            "localidad" => "required",
            "provincia" => "required",
            "razon_social" => "required",
            "pedido_id" => "exists:pedidos,id",
        ]);
        $userPedido = UserPedido::create($request->all());
        return response()->json($userPedido);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPedido $userPedido)
    {
        return new UserPedidosResource($userPedido);
    }
}
