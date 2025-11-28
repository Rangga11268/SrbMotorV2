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
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminProfileController;


Route::get('/', [HomeController::class, '__invoke'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/motors', [MotorGalleryController::class, 'index'])->name('motors.index');
Route::get('/motors/my-transactions', [MotorGalleryController::class, 'showUserTransactions'])->name('motors.user-transactions')->middleware('auth');
Route::get('/motors/{motor}', [MotorGalleryController::class, 'show'])->name('motors.show');
Route::get('/motors/{motor}/cash-order', [MotorGalleryController::class, 'showCashOrderForm'])->name('motors.cash-order');
Route::post('/motors/{motor}/process-cash-order', [MotorGalleryController::class, 'processCashOrder'])->name('motors.process-cash-order');
Route::get('/motors/{motor}/credit-order', [MotorGalleryController::class, 'showCreditOrderForm'])->name('motors.credit-order');
Route::post('/motors/{motor}/process-credit-order', [MotorGalleryController::class, 'processCreditOrder'])->name('motors.process-credit-order');
Route::get('/motors/order-confirmation/{transaction}', [MotorGalleryController::class, 'showOrderConfirmation'])->name('motors.order.confirmation')->middleware('auth');
Route::get('/motors/{transaction}/upload-credit-documents', [MotorGalleryController::class, 'showUploadCreditDocuments'])->name('motors.upload-credit-documents')->middleware('auth');
Route::post('/motors/{transaction}/upload-credit-documents', [MotorGalleryController::class, 'uploadCreditDocuments'])->name('motors.upload-credit-documents')->middleware('auth');
Route::get('/motors/{transaction}/manage-documents', [MotorGalleryController::class, 'showDocumentManagement'])->name('motors.manage-documents')->middleware('auth');
Route::post('/motors/{transaction}/update-documents', [MotorGalleryController::class, 'updateDocuments'])->name('motors.update-documents')->middleware('auth');
Route::get('/contact', function () {
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

// Profile management routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
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

    // Transaction management
    Route::resource('transactions', TransactionController::class);
    Route::post('/transactions/{transaction}/status', [TransactionController::class, 'updateStatus'])->name('transactions.updateStatus');
    Route::post('/transactions/{transaction}/upload-document', [TransactionController::class, 'uploadDocument'])->name('transactions.upload-document');
    Route::delete('/documents/{document}', [TransactionController::class, 'deleteDocument'])->name('transactions.delete-document');

    // Invoice management
    Route::get('/transactions/{transaction}/invoice', [InvoiceController::class, 'preview'])->name('transactions.invoice.preview');
    Route::get('/transactions/{transaction}/invoice/download', [InvoiceController::class, 'generate'])->name('transactions.invoice.download');

    // Report management
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::get('/reports/generate', [ReportController::class, 'generate'])->name('reports.generate');
    Route::get('/reports/export', [ReportController::class, 'export'])->name('reports.export');
    Route::get('/reports/export-excel', [ReportController::class, 'exportExcel'])->name('reports.export-excel');

    // Admin Profile management
    Route::get('/profile', [AdminProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password.update');
});
