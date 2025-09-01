<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

// User login
Route::post('/login', [AuthController::class, 'login']);

// User registration
Route::post('/register', [AuthController::class, 'register']);


// -----------------------------
// Public Job Routes
// -----------------------------

// Get all job listings
Route::get('/jobs', [JobController::class, 'index']);

// Get a specific job by ID
Route::get('/jobs/{job}', [JobController::class, 'show']);


// -----------------------------
// Protected Routes (Authenticated via Sanctum)
// -----------------------------
Route::middleware('auth:sanctum')->group(function () {

    // Logout the authenticated user
    Route::post('/logout', [AuthController::class, 'logout']);

    // Get authenticated user data
    Route::get('/user', fn(Request $request) => $request->user());

    // -----------------------------
    // Job Management (CRUD)
    // -----------------------------

    // Create a new job
    Route::post('/jobs', [JobController::class, 'store']);

    // Update an existing job
    Route::put('/jobs/{job}', [JobController::class, 'update']);

    // Delete a job
    Route::delete('/jobs/{job}', [JobController::class, 'destroy']);


    // -----------------------------
    // Profile Management Routes
    // -----------------------------
    Route::prefix('profile')->group(function () {

        // User Profile Info
        Route::get('/user', [ProfileController::class, 'getUser']);
        Route::put('/user', [ProfileController::class, 'updateUser']);

        // Company Info
        Route::get('/company', [ProfileController::class, 'getCompany']);
        Route::put('/company', [ProfileController::class, 'updateCompany']);

        // Jobs owned by the authenticated user
        Route::get('/jobs', [ProfileController::class, 'getJobs']);
    });

    Route::get('/me/company', [ProfileController::class, 'company']);
});
