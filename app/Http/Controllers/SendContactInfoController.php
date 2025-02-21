<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class SendContactInfoController extends Controller
{
    public function sendReactEmail(Request $request)
    {
        $htmlContent = $request->input('html'); // Recibe el HTML renderizado

        $contactInfo = ContactInfo::first();

        if (!$contactInfo) {
            return response()->json(['error' => 'No se encontró información de contacto'], 404);
        }

        Mail::send([], [], function ($message) use ($htmlContent, $contactInfo) {
            $message->to($contactInfo->mail)
                ->subject('Correo de Contacto')
                ->html($htmlContent);
        });

        return response()->json(['message' => 'Correo enviado con éxito']);
    }
}
