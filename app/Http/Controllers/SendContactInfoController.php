<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendContactInfoController extends Controller
{
    public function sendContactEmail(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'phone' => 'nullable|string|max:100',
            'company' => 'nullable|string|max:100',
        ]);

        // Enviar el correo
        $htmlContent = "
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> {$validated['name']}</p>
        <p><strong>Email:</strong> {$validated['email']}</p>
        <p><strong>Teléfono:</strong> {$validated['phone']}</p>
        <p><strong>Empresa:</strong> {$validated['company']}</p>
        <p><strong>Mensaje:</strong></p>
        <p>{$validated['message']}</p>
    ";

    // Enviar el correo utilizando el método adecuado
    Mail::send([], [], function ($message) use ($validated, $htmlContent) {
        $message->to('fabriloco2002@gmail.com') // Cambia por tu correo de destino
                ->subject('Nuevo mensaje de contacto')
                ->from($validated['email'], $validated['name'])
                ->html($htmlContent); // Usamos `html()` en lugar de `setBody()`
    });

        return response()->json(['message' => 'Mensaje enviado exitosamente.'], 200);
    }
}

