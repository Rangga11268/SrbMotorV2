# ROLLBACK DOKUMENTASI - SISTEM ORDER MANAGEMENT SRB MOTORS

Dokumen ini menjelaskan langkah-langkah untuk melakukan rollback total terhadap semua fitur sistem order management yang telah diimplementasikan di aplikasi SRB Motors.

## DAFTAR ISI
1. [Ringkasan Fitur yang Akan Di-Rollback](#ringkasan-fitur)
2. [Daftar File yang Akan Dihapus](#daftar-file)
3. [Langkah-Langkah Rollback](#langkah-langkah)
4. [Perintah Rollback Database](#perintah-database)
5. [Verifikasi Rollback](#verifikasi)

## RINGKASAN FITUR
Fitur sistem order management yang akan dihapus meliputi:
- Sistem pemesanan tunai & kredit
- Manajemen dokumen pendukung kredit
- Status workflow untuk transaksi
- Sistem notifikasi otomatis
- Integrasi dengan antarmuka pengguna dan admin

## DAFTAR FILE YANG AKAN DIHAPUS

### A. File Migrations
- `database/migrations/2025_11_05_000001_create_transactions_table.php`
- `database/migrations/2025_11_05_000002_create_credit_details_table.php`
- `database/migrations/2025_11_05_000003_create_documents_table.php`
- `database/migrations/2025_11_05_064733_create_notifications_table.php`

### B. File Model
- `app/Models/Transaction.php`
- `app/Models/CreditDetail.php`
- `app/Models/Document.php`

### C. File Controller
- `app/Http/Controllers/TransactionController.php`

### D. File View (Frontend)
- `resources/views/pages/motors/cash_order_form.blade.php`
- `resources/views/pages/motors/credit_order_form.blade.php`
- `resources/views/pages/motors/order_confirmation.blade.php`
- `resources/views/pages/motors/upload_credit_documents.blade.php`
- `resources/views/pages/motors/document_management.blade.php`
- `resources/views/pages/motors/user_transactions.blade.php`

### E. File View (Admin)
- `resources/views/pages/admin/transactions/create.blade.php`
- `resources/views/pages/admin/transactions/edit.blade.php`
- `resources/views/pages/admin/transactions/index.blade.php`
- `resources/views/pages/admin/transactions/show.blade.php`

### F. File Lainnya
- `app/Observers/TransactionObserver.php`
- `app/Providers/EventServiceProvider.php`
- `app/Notifications/TransactionCreated.php`
- `app/Notifications/TransactionStatusChanged.php`
- `database/factories/MotorFactory.php` (bagian terkait order ditambahkan)

### G. File yang Dimodifikasi
- `routes/web.php`
- `resources/views/layouts/admin.blade.php`
- `resources/views/partials/header.blade.php`
- `app/Http/Controllers/MotorGalleryController.php`
- `bootstrap/providers.php`

## LANGKAH-LANGKAH ROLLBACK

### 1. Hentikan Aplikasi
```bash
# Jika aplikasi berjalan di server development
# Hentikan server Laravel
```

### 2. Rollback Database Migrations
```bash
php artisan migrate:rollback --step=4
```
Perintah ini akan mengembalikan 4 migrasi terakhir (transactions, credit_details, documents, notifications).

### 3. Hapus File yang Ditambahkan

Hapus semua file yang tercantum dalam daftar:

```bash
# Hapus migrations
del "D:\laragon\www\SrbMotor\database\migrations\2025_11_05_000001_create_transactions_table.php"
del "D:\laragon\www\SrbMotor\database\migrations\2025_11_05_000002_create_credit_details_table.php"
del "D:\laragon\www\SrbMotor\database\migrations\2025_11_05_000003_create_documents_table.php"
del "D:\laragon\www\SrbMotor\database\migrations\2025_11_05_064733_create_notifications_table.php"

# Hapus models
del "D:\laragon\www\SrbMotor\app\Models\Transaction.php"
del "D:\laragon\www\SrbMotor\app\Models\CreditDetail.php"
del "D:\laragon\www\SrbMotor\app\Models\Document.php"

# Hapus controller
del "D:\laragon\www\SrbMotor\app\Http\Controllers\TransactionController.php"

# Hapus views
del "D:\laragon\www\SrbMotor\resources\views\pages\motors\cash_order_form.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\motors\credit_order_form.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\motors\order_confirmation.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\motors\upload_credit_documents.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\motors\document_management.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\motors\user_transactions.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\admin\transactions\create.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\admin\transactions\edit.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\admin\transactions\index.blade.php"
del "D:\laragon\www\SrbMotor\resources\views\pages\admin\transactions\show.blade.php"

# Hapus file lainnya
del "D:\laragon\www\SrbMotor\app\Observers\TransactionObserver.php"
del "D:\laragon\www\SrbMotor\app\Providers\EventServiceProvider.php"
del "D:\laragon\www\SrbMotor\app\Notifications\TransactionCreated.php"
del "D:\laragon\www\SrbMotor\app\Notifications\TransactionStatusChanged.php"
```

### 4. Kembalikan File yang Dimodifikasi

#### A. routes/web.php
Kembalikan ke kondisi sebelum penambahan route order management:
- Hapus semua route terkait: `motors.cash-order`, `motors.process-cash-order`, `motors.credit-order`, `motors.process-credit-order`, `motors.order.confirmation`, `motors.upload-credit-documents`, `motors.manage-documents`, `motors.update-documents`, `motors.user-transactions`
- Hapus juga route admin untuk transactions

#### B. resources/views/layouts/admin.blade.php  
Kembalikan ke kondisi sebelum penambahan menu Transaksi

#### C. resources/views/partials/header.blade.php
Kembalikan ke kondisi sebelum penambahan link "Riwayat Pemesanan"

#### D. app/Http/Controllers/MotorGalleryController.php
Kembalikan ke kondisi sebelum penambahan:
- Method `showCashOrderForm`
- Method `processCashOrder` 
- Method `showCreditOrderForm`
- Method `processCreditOrder`
- Method `showOrderConfirmation`
- Method `showUploadCreditDocuments`
- Method `uploadCreditDocuments`
- Method `showDocumentManagement`
- Method `updateDocuments`
- Method `showUserTransactions`

#### E. bootstrap/providers.php
Kembalikan hanya ke: `App\Providers\AppServiceProvider::class`

### 5. Hapus EventServiceProvider dari konfigurasi
Jika EventServiceProvider yang dihapus adalah satu-satunya service provider selain AppServiceProvider, cukup pastikan bootstrap/providers.php hanya berisi:
```php
<?php

return [
    App\Providers\AppServiceProvider::class,
];
```

### 6. Bersihkan Cache
```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
```

## PERINTAH ROLLBACK DATABASE

Jika Anda ingin mengembalikan database ke kondisi sebelum implementasi sistem order, gunakan perintah:

```bash
php artisan migrate:rollback --step=4
```

Ini akan mengembalikan 4 migrasi terakhir yang terkait dengan sistem order:
1. `create_notifications_table`
2. `create_documents_table`
3. `create_credit_details_table`
4. `create_transactions_table`

## VERIFIKASI ROLLBACK

Setelah melakukan rollback, verifikasi bahwa:

1. **File-file telah dihapus**:
   - Pastikan semua file yang tercantum dalam daftar telah dihapus
   - Tidak ada error saat mengakses aplikasi

2. **Database telah dikembalikan**:
   - Jalankan `php artisan migrate:status` untuk memastikan migrasi terkait order tidak aktif
   - Cek struktur database untuk memastikan tidak ada tabel transactions, credit_details, documents, dan notifications

3. **Fungsi aplikasi dasar masih berfungsi**:
   - Halaman utama masih bisa diakses
   - Sistem login masih berfungsi
   - Fungsi-fungsi dasar motor gallery masih berfungsi

4. **Tidak ada route yang rusak**:
   - Semua route yang tersisa masih berfungsi dengan benar
   - Tidak ada error 404 atau 500 karena referensi yang hilang

## CATATAN TAMBAHAN

- Pastikan untuk mencadangkan database sebelum melakukan rollback
- Dalam produksi, lakukan rollback saat waktu pemeliharaan untuk menghindari gangguan layanan
- Jika Anda menyimpan data penting di tabel yang akan dihapus, lakukan backup terlebih dahulu
- Sistem otentikasi dasar dan fungsi admin lainnya tidak akan terpengaruh oleh rollback ini

## JIKA TERJADI KESALAHAN

Jika terjadi error setelah rollback:

1. Periksa log aplikasi: `storage/logs/laravel.log`
2. Pastikan semua dependensi file yang dihapus telah dihapus
3. Jalankan perintah `composer dump-autoload` untuk memperbarui pemuatan kelas
4. Cek kembali file-file yang dimodifikasi untuk memastikan tidak ada referensi yang tertinggal

---
**Catatan**: Dokumen ini disusun untuk membantu tim dalam melakukan rollback fitur sistem order management secara aman dan lengkap.