<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidosInformacionResource;
use App\Models\PedidosInformacion;
use Illuminate\Http\Request;

class PedidosInformacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PedidosInformacionResource::collection(PedidosInformacion::all());
    }



    /**
     * Display the specified resource.
     */
    public function show(PedidosInformacion $pedidosInformacion)
    {
        return new PedidosInformacionResource($pedidosInformacion);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $pedidosInformacion = PedidosInformacion::find($id);
        $pedidosInformacion->update($request->all());
        return response()->json($pedidosInformacion);
    }
}
