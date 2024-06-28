<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return redirect()->route('login');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::prefix('api')->group(function () {
        Route::get('/productos', [ProductosController::class, 'index']);
        Route::post('/producto', [ProductosController::class, 'store']);
        Route::delete('/producto/{id}', [ProductosController::class, 'destroy']);
        Route::put('/producto/{id}', [ProductosController::class, 'update']);
        Route::post('/productos/aumentar-precios', [ProductosController::class, 'aumentarPrecios']);
        Route::post('/productos/disminuir-precios', [ProductosController::class, 'disminuirPrecios']);

        
        Route::get('/users', [UserController::class, 'index']);
        Route::put('/users/{user}', [UserController::class, 'update']);
    });


});






require __DIR__ . '/auth.php';
