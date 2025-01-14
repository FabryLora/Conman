<?php

use App\Http\Controllers\ContactInfoController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {
    Route::apiResource('/contactinfo', ContactInfoController::class);
});
