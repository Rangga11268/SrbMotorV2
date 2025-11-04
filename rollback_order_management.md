# Rollback Panduan - Fitur Manajemen Pesanan SRB Motors

Dokumen ini menjelaskan langkah-langkah untuk melakukan rollback fitur Manajemen Pesanan jika diperlukan.

## File yang Ditambahkan

### 1. Model
- `app/Models/Order.php`

### 2. Controller
- `app/Http/Controllers/OrderController.php`

### 3. Migration
- `database/migrations/2025_11_03_220914_create_orders_table.php`

### 4. Seeder
- `database/seeders/OrderSeeder.php`

### 5. Routes
- Baris-baris terkait pesanan ditambahkan di `routes/web.php`

### 6. Views (User)
- `resources/views/pages/orders/create.blade.php`
- `resources/views/pages/orders/index.blade.php`
- `resources/views/pages/orders/show.blade.php`

### 7. Views (Admin)
- `resources/views/pages/admin/orders/index.blade.php`
- `resources/views/pages/admin/orders/edit.blade.php`

### 8. Modifikasi Views
- `resources/views/pages/motors/show.blade.php` (tombol "Pesan Sekarang")
- `resources/views/layouts/admin.blade.php` (link navigasi "Pesanan")
- `resources/views/pages/admin/dashboard.blade.php` (statistik pesanan baru)

## Langkah-langkah Rollback

### 1. Hapus Migration
```bash
php artisan migrate:rollback --step=1
```
Perintah ini akan menghapus tabel `orders` dari database.

### 2. Hapus File-file Berikut
```
app/Models/Order.php
app/Http/Controllers/OrderController.php
database/migrations/2025_11_03_220914_create_orders_table.php
database/seeders/OrderSeeder.php
resources/views/pages/orders/
resources/views/pages/admin/orders/
```

### 3. Kembalikan routes/web.php
Hapus baris-baris berikut dari file `routes/web.php`:
```php
// User order routes
Route::middleware('auth')->group(function () {
    Route::get('/motors/{motor}/order', [OrderController::class, 'create'])->name('motors.order');
    Route::post('/motors/{motor}/order', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index'); // User's order history
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // User's order detail
});

// Admin order routes
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
    // ... admin order routes
});
```

### 4. Kembalikan AdminController
Hapus atau komentari kode terkait order dari `app/Http/Controllers/AdminController.php`.

### 5. Kembalikan layouts/admin.blade.php
Hapus link "Pesanan" dari navigasi admin.

### 6. Kembalikan motor detail page
Hapus tombol "Pesan Sekarang" dari `resources/views/pages/motors/show.blade.php`.

### 7. Kembalikan dashboard
Hapus statistik pesanan dari `resources/views/pages/admin/dashboard.blade.php`.

## Catatan Penting

1. **Data Pesanan** - Jika fitur ini sudah digunakan secara aktif dan ada data pesanan penting di database, pastikan untuk mencadangkan data tersebut sebelum melakukan rollback:
   ```bash
   mysqldump -u [username] -p [database_name] orders > orders_backup.sql
   ```

2. **Ketergantungan** - Pastikan tidak ada bagian lain dari sistem yang mulai tergantung pada fitur pesanan ini sebelum melakukan rollback.

3. **Cache** - Setelah melakukan perubahan, bersihkan cache Laravel jika diperlukan:
   ```bash
   php artisan config:clear
   php artisan route:clear
   php artisan view:clear
   ```

## Testing Setelah Rollback

Setelah menyelesaikan rollback, pastikan untuk:
1. Memeriksa bahwa halaman utama masih berfungsi
2. Memeriksa bahwa halaman admin masih berfungsi
3. Memastikan tidak ada error terkait route yang hilang
4. Mengakses beberapa halaman untuk memastikan aplikasi berjalan normal
