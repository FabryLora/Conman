<?php

namespace App\Http\Controllers;

use App\Http\Resources\CalidadInicioResource;
use App\Models\CalidadInicio;
use Illuminate\Http\Request;

class CalidadInicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CalidadInicioResource::collection(CalidadInicio::all());
    }


    /**
     * Display the specified resource.
     */
    public function show(CalidadInicio $calidadInicio)
    {
        return new CalidadInicioResource($calidadInicio);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $calidadInicio = CalidadInicio::find($id);
        $calidadInicio->update($request->all());
        return new CalidadInicioResource($calidadInicio);
    }
}
