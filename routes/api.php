<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NosotrosFirstController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
});
Route::get('/me-admin', [AdminController::class, 'me']);

Route::apiResource('/nosotros-first', NosotrosFirstController::class);


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-admin', [AdminController::class, 'login']);
Route::post('/signup-admin', [AdminController::class, 'signup']);
