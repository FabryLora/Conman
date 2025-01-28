<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\NosotrosFirstController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\SendContactInfoController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SubCategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::post('/sendcontact', [SendContactInfoController::class, 'sendContactEmail']);
Route::put('/users/{id}', [AuthController::class, 'updateProfile']);
Route::delete('/users/{id}', [AuthController::class, 'destroy']);
Route::get('/me-admin', [AdminController::class, 'me']);
Route::get('/allusers', [AuthController::class, 'index']);
Route::apiResource('/contact-info', ContactInfoController::class);
Route::apiResource('/nosotros-first', NosotrosFirstController::class);
Route::apiResource('/slider', SliderController::class);
Route::apiResource('/subcategory', SubCategoryController::class);
Route::apiResource('/category', CategoryController::class);
Route::apiResource('/product', controller: ProductController::class);
Route::get('/products/{id}', [ProductController::class, "show_products"]);

Route::apiResource('/subcategory', SubCategoryController::class);
Route::apiResource('/provincia', ProvinciaController::class);
Route::apiResource('/image', ImageController::class);




Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-admin', [AdminController::class, 'login']);
Route::post('/signup-admin', [AdminController::class, 'signup']);
