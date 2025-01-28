<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => "required|string|max:255",
            'email' => "required|string|email|max:255|unique:users,email",
            "password"=> "required|confirmed|string|min:8",
            "razon_social"=> "required|string|max:100",
            "dni"=> "required|string|max:100",
            "telefono"=> "required|string|max:100",
            "direccion"=> "required|string|max:100",
            "provincia"=> "nullable|string|max:100",
            "localidad"=> "nullable|string|max:100",
            "codigo_postal"=> "required|string|max:100",

        ];
    }
}
