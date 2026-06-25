<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RideController;
use Illuminate\Support\Facades\Route;

// بدون token
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// محتاجة token
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    

    // Profile
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::get('/profile/stats', [ProfileController::class, 'stats']);

    // Rides
    Route::get('/rides/nearby', [RideController::class, 'nearby']);
    Route::post('/rides/{id}/join', [RideController::class, 'join']);
    Route::post('/rides/{id}/leave', [RideController::class, 'leave']);
    Route::apiResource('rides', RideController::class);

    // Clubs
    Route::apiResource('clubs', ClubController::class);
    Route::post('/clubs/{id}/join', [ClubController::class, 'join']);
    Route::post('/clubs/{id}/leave', [ClubController::class, 'leave']);

    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/recommendations', [ProductController::class, 'recommend']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    

    // Activities
    Route::get('/activities', [ActivityController::class, 'index']);
    Route::post('/activities', [ActivityController::class, 'store']);

    // Achievements
    Route::get('/achievements', [AchievementController::class, 'index']);
    Route::post('/achievements', [AchievementController::class, 'store']);

    // Notifications
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::get('/notifications', [NotificationController::class, 'index']);
});