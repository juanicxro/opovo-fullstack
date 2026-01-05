<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->controller(AuthController::class)
    ->group(function () {
        Route::post('register', 'register')->middleware('throttle:auth-register');
        Route::post('login', 'login')->middleware('throttle:auth-login');
    });

Route::apiResource('posts', PostController::class)
    ->only(['index', 'show'])
    ->whereNumber('post');

Route::middleware(['auth:api'])->group(function () {
    Route::get('posts/mine', [PostController::class, 'mine']);

    Route::apiResource('posts', PostController::class)
        ->only(['store'])
        ->whereNumber('post')
        ->middleware('throttle:posts-write');

    Route::put('posts/{post}', [PostController::class, 'update'])
        ->whereNumber('post')
        ->middleware(['throttle:posts-write', 'can:update,post']);

    Route::delete('posts/{post}', [PostController::class, 'destroy'])
        ->whereNumber('post')
        ->middleware(['throttle:posts-write', 'can:delete,post']);
});
