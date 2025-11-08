# Rollback Procedures for Invoice and Reporting Features

I have successfully implemented the invoice and reporting features for the SRB Motors application. This document provides complete documentation of the changes made and the rollback procedures.

## Features Implemented

1. **Invoice Generation**
   - PDF invoice generation for transactions
   - Download and preview functionality
   - Professional invoice template with company details, customer information, and transaction details

2. **Reporting System**
   - Sales, income, customer, and status reports
   - PDF export functionality for reports
   - Report dashboard in admin panel
   - Filterable reports by date range

## Changes Made

### 1. Dependencies Added
- `barryvdh/laravel-dompdf` for PDF generation

### 2. Database Changes
- Created `reports` table with migration (2025_11_08_045703_create_reports_table.php)

### 3. New Controllers
- `InvoiceController` for invoice generation and preview
- `ReportController` for report management

### 4. New Models
- `Report` model with relationships and attributes

### 5. New Views
- Invoice template (resources/views/pages/admin/invoices/invoice.blade.php)
- Report management views (index, create, show) in `resources/views/pages/admin/reports/`
- Report PDF template

### 6. Route Changes
- Added invoice routes in web.php
- Added report routes in web.php
- Added reports navigation link in admin layout

## Rollback Procedures

To completely rollback these invoice and reporting features, follow these steps in order:

### 1. Remove Invoice and Report Routes
Remove these route entries from `routes/web.php`:
```php
// Remove these lines from the admin routes group:
Route::get('/transactions/{transaction}/invoice', [InvoiceController::class, 'preview'])->name('transactions.invoice.preview');
Route::get('/transactions/{transaction}/invoice/download', [InvoiceController::class, 'generate'])->name('transactions.invoice.download');
Route::resource('reports', ReportController::class);
Route::get('/reports/{report}/export', [ReportController::class, 'export'])->name('reports.export');
```

Also remove the InvoiceController and ReportController imports at the top of the file:
```php
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReportController;
```

### 2. Remove Navigation Link
Remove the "Laporan" link from the admin navigation in `resources/views/layouts/admin.blade.php`:
```html
<li class="nav-item">
    <a class="nav-link" href="{{ route('admin.reports.index') }}">Laporan</a>
</li>
```

### 3. Remove Invoice Button from Transaction Show
Remove the invoice button from `resources/views/pages/admin/transactions/show.blade.php`:
```html
<a href="{{ route('transactions.invoice.download', $transaction->id) }}" class="btn btn-secondary w-100 mb-2">
    <i class="fas fa-file-invoice"></i> Cetak Invoice
</a>
```

### 4. Remove Directories and Files
Remove these directories and their contents:
- `app/Http/Controllers/InvoiceController.php`
- `app/Http/Controllers/ReportController.php`
- `app/Models/Report.php`
- `database/migrations/2025_11_08_045703_create_reports_table.php`
- `resources/views/pages/admin/invoices/` directory
- `resources/views/pages/admin/reports/` directory

### 5. Remove Package Dependencies
Remove the PDF generation library:
```bash
composer remove barryvdh/laravel-dompdf
```

Then remove the config file:
- `config/dompdf.php`

### 6. Rollback Database Migration
Run the following command to rollback the reports table:
```bash
php artisan migrate:rollback
```

## Alternative: Using Migration Rollback
If you want to rollback only the reports migration, you can use:
```bash
php artisan migrate:rollback --step=1
```

## Complete Rollback Summary
1. Remove route entries and imports from web.php
2. Remove navigation link from admin layout
3. Remove invoice button from transaction show view
4. Delete invoice and report controllers
5. Delete report model
6. Delete invoice and report views directories
7. Delete the reports migration file
8. Remove the dompdf package with composer
9. Run migration rollback to remove reports table

## Potential Issues and Solutions
- If you encounter database errors about 'data' field not having a default value when creating reports, ensure that the ReportController initializes the 'data' field with an empty array during report creation.

By following these steps in reverse order, you can completely remove the invoice and reporting features from your application without affecting any existing functionality.