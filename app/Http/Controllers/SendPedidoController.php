<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendPedidoController extends Controller
{
    public function sendReactEmail(Request $request)
    {
        $htmlContent = $request->input('html'); // Recibe el HTML renderizado

        Mail::send([], [], function ($message) use ($htmlContent) {
            $message->to('fabriloco2002@gmail.com')
                ->subject('Correo con Vista en React')
                ->html($htmlContent);
        });

        return response()->json(['message' => 'Correo enviado con éxito']);
    }
}
