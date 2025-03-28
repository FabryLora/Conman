<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStore extends FormRequest
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
            "description" => "nullable|string",
            "image" => "nullable|file|max:2048",
            "file" => "nullable|file|max:2048",
            "name"  => "sometimes|string",
            "sub_category_id" => "sometimes|exists:sub_categories,id",
            "category_id" => "required|exists:categories,id",

        ];
    }
}
