<?php

namespace App\Http\Controllers;

use App\Http\Resources\NosotrosSecondResource;
use App\Models\NosotrosSecond;
use Illuminate\Http\Request;

class NosotrosSecondController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NosotrosSecondResource::collection(NosotrosSecond::all());
    }


    /**
     * Display the specified resource.
     */
    public function show(NosotrosSecond $nosotrosSecond)
    {
        return new NosotrosSecondResource($nosotrosSecond);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $nosotrosSecond = NosotrosSecond::find($id);
        $nosotrosSecond->update($request->all());
        return new NosotrosSecondResource($nosotrosSecond);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NosotrosSecond $nosotrosSecond)
    {
        $nosotrosSecond->delete();
    }
}
