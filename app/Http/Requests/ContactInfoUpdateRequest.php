<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactInfoUpdateRequest extends FormRequest
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
            "mail" => "nullable|string|max:100",
            "phone" => "nullable|string|max:100",
            "wp" => "nullable|string|max:100",
            "location" => "nullable|string|max:100",
            "iframe" => "nullable|string",
            "ig" => "nullable|string|max:100",
            "fb" => "nullable|string|max:100",
        ];
    }
}
