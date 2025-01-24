<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\NosotrosFirstController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SubCategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
});
Route::get('/me-admin', [AdminController::class, 'me']);

Route::apiResource('/contact-info', ContactInfoController::class);
Route::apiResource('/nosotros-first', NosotrosFirstController::class);
Route::apiResource('/slider', SliderController::class);
Route::apiResource('/subcategory', SubCategoryController::class);
Route::apiResource('/category', CategoryController::class);
Route::apiResource('/product', ProductController::class);
Route::apiResource('/subcategory', SubCategoryController::class);
Route::apiResource('/provincia', ProvinciaController::class);




Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-admin', [AdminController::class, 'login']);
Route::post('/signup-admin', [AdminController::class, 'signup']);
