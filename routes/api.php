<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalidadInfoController;
use App\Http\Controllers\CalidadInicioController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryInicioController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ImportImportadosController;
use App\Http\Controllers\ImportTerminalesController;
use App\Http\Controllers\ListaDePreciosController;
use App\Http\Controllers\LogosController;
use App\Http\Controllers\MetadatosController;
use App\Http\Controllers\NosotrosFirstController;
use App\Http\Controllers\NosotrosInicioController;
use App\Http\Controllers\NosotrosSecondController;
use App\Http\Controllers\NovedadesController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PedidosInformacionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductosPedidosController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\RealProductController;
use App\Http\Controllers\SendContactInfoController;
use App\Http\Controllers\SendPedidoController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SliderImageController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\UserPedidoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/me-unico-admin', [AdminController::class, 'meunico']);




Route::post('/sendcontact', [SendContactInfoController::class, 'sendReactEmail']);
Route::post('/sendpedido', [SendPedidoController::class, 'sendReactEmail']);
Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/{id}', [AuthController::class, 'destroy']);
Route::get('/me-admin', [AdminController::class, 'me']);



Route::get('/allusers', [AuthController::class, 'index']);
Route::apiResource('/contact-info', ContactInfoController::class);
Route::apiResource('/nosotros-first', NosotrosFirstController::class);
Route::post('/upload-pdf', [PDFController::class, 'uploadPDF']);
Route::get('/download-pdf/{filename}', [PDFController::class, 'downloadPDF']);
Route::get('/downloadfile/{filename}', [ProductController::class, 'downloadPDF']);
Route::apiResource('/pdf', PDFController::class);
Route::apiResource('/slider', SliderController::class);
Route::apiResource('/subcategory', SubCategoryController::class);
Route::apiResource('/category', CategoryController::class);
Route::apiResource('/product', ProductController::class);
Route::apiResource('/realproducts', RealProductController::class);
Route::get('/products/{id}', [ProductController::class, "show_products"]);
Route::apiResource('/provincia', ProvinciaController::class);
Route::apiResource('/image', ImageController::class);
Route::apiResource('/sliderimage', SliderImageController::class);
Route::apiResource('/pedidos', PedidoController::class);
Route::apiResource('/prodpedidos', ProductosPedidosController::class);
Route::apiResource('/categoriasinicio', CategoryInicioController::class);
Route::apiResource('/nosotrosinicio', NosotrosInicioController::class);
Route::apiResource('/calidadinicio', CalidadInicioController::class);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-admin', [AdminController::class, 'login']);
Route::post('/signup-admin', [AdminController::class, 'signup']);
Route::put('/admin/{id}', [AdminController::class, 'update']);
Route::get('/alladmins', [AdminController::class, 'index']);
Route::apiResource('/novedades', NovedadesController::class);
Route::apiResource('/metadatos', MetadatosController::class);
Route::apiResource('/pedidosinformacion', PedidosInformacionController::class);
Route::apiResource('/userpedidos', UserPedidoController::class);
Route::apiResource("/listadeprecios", ListaDePreciosController::class);
Route::apiResource("/nosotrossecond", NosotrosSecondController::class);
Route::apiResource("/logos", LogosController::class);
Route::apiResource("/calidadinfo", CalidadInfoController::class);
Route::get('/downloadarchivo/{filename}', [ListaDePreciosController::class, 'downloadPDF']);
Route::get('/downloadpedido/{filename}', [PedidoController::class, 'downloadPDF']);
Route::post('/importar-excel', [ImportController::class, 'importar']);
Route::post('/importar-terminales', [ImportTerminalesController::class, 'importar']);
Route::post('/importar-importados', [ImportImportadosController::class, 'importar']);
