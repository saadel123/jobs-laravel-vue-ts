<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\AuthController;
use App\Models\Job;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);

    // User data
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Check ownerschip
    Route::get('/jobs/{job}/check-ownership', [JobController::class, 'checkOwnership']);

    // Jobs resource
    Route::apiResource('jobs', JobController::class);
});
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
