<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MotorController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MotorGalleryController;
use App\Http\Controllers\OrderController;

Route::get('/', [HomeController::class, '__invoke'])->name('home');
Route::get('/motors', [MotorGalleryController::class, 'index'])->name('motors.index');
Route::get('/motors/{motor}', [MotorGalleryController::class, 'show'])->name('motors.show');
Route::get('/motors/{motor}/credit-calculation', [MotorGalleryController::class, 'showCreditCalculation'])->name('motors.credit-calculation');
Route::get('/contact', function() {
    return redirect('/#contact');
})->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.submit');

// Authentication routes - protected by guest middleware so logged-in users can't access them
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Logout route requires authentication
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// User order routes
Route::middleware('auth')->group(function () {
    Route::get('/motors/{motor}/order', [OrderController::class, 'create'])->name('motors.order');
    Route::post('/motors/{motor}/order', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index'); // User's order history
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // User's order detail
});

// Admin routes
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    // Motor management
    Route::resource('motors', MotorController::class);
    
    // Contact messages management
    Route::resource('contact', ContactMessageController::class)->only(['index', 'show', 'destroy']);
    
    // User management
    Route::resource('users', UserController::class)->except(['create', 'store', 'show']);
    
    // Order management
    Route::get('/orders', [OrderController::class, 'indexAdmin'])->name('orders.index');
    Route::get('/orders/{order}/edit', [OrderController::class, 'edit'])->name('orders.edit');
    Route::put('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');
});
