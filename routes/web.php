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

Route::get('/', [HomeController::class, '__invoke'])->name('home');
Route::get('/motors', [MotorGalleryController::class, 'index'])->name('motors.index');
Route::get('/motors/{motor}', [MotorGalleryController::class, 'show'])->name('motors.show');
Route::get('/motors/{motor}/credit-calculation', [MotorGalleryController::class, 'showCreditCalculation'])->name('motors.credit-calculation');
Route::get('/contact', function() {
    return redirect('/#contact');
})->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.submit');

// Authentication routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

// Admin routes
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    // Motor management
    Route::resource('motors', MotorController::class);
    
    // Contact messages management
    Route::resource('contact', ContactMessageController::class)->only(['index', 'show', 'destroy']);
    
    // User management
    Route::resource('users', UserController::class)->except(['create', 'store', 'show']);
});
