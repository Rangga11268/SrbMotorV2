Tentu, berikut adalah rancangan lengkap untuk mekanisme alur pengajuan kredit dan pembelian tunai (cash) untuk website dealer motor Anda, yang dikembangkan berbasis Laravel.

Rancangan ini mengadaptasi dan memperluas dokumen teknis yang Anda berikan, dengan fokus pada arsitektur, alur pengguna, dan logika bisnis tanpa menyertakan blok kode. Rancangan ini disesuaikan dengan struktur aplikasi Laravel yang saat ini ada di proyek SRB Motors.

---

## **Rancangan Sistem Order Terpadu (Kredit & Tunai) untuk Website Dealer Motor**

### **Bagian 1: Visi dan Tujuan Sistem**

#### **1.1 Latar Belakang**
Sistem ini dirancang untuk mendigitalkan dan mengotomatisasi seluruh proses pemesanan unit motor di dealer, mulai dari pemilihan produk hingga finalisasi transaksi. Tujuannya adalah menggantikan proses manual via WhatsApp dengan sebuah platform terpusat yang mampu menangani dua alur transaksi utama: **pembelian tunai (cash)** dan **pengajuan kredit**. Ini akan mengurangi *human error*, meningkatkan efisiensi admin, dan memberikan pengalaman yang transparan bagi pelanggan.

#### **1.2 Tujuan Rancangan**
* **Mendefinisikan Arsitektur Data Tunggal:** Merancang model database yang fleksibel untuk menampung data pesanan tunai dan kredit dalam satu struktur yang koheren.
* **Memetakan Alur Pengguna Ganda:** Merinci pengalaman pengguna (UX) yang jelas di sisi *front-end*, membedakan alur untuk pembeli tunai dan pemohon kredit.
* **Merancang Panel Admin Terpadu:** Mendesain antarmuka *back-end* yang memungkinkan admin mengelola kedua jenis transaksi dari satu dasbor.
* **Mengotomatiskan Komunikasi:** Memanfaatkan fitur bawaan Laravel untuk mengirim notifikasi otomatis (Email & WhatsApp) kepada pelanggan dan admin sesuai dengan status transaksi.

---

### **Bagian 2: Paradigma Sistem: Dari 'Pengajuan' Menjadi 'Transaksi'**

Sistem ini tidak lagi hanya berfokus pada "pengajuan kredit", melainkan pada "manajemen transaksi". Setiap pesanan yang masuk, baik tunai maupun kredit, akan dianggap sebagai sebuah **Transaksi** dengan alur dan status yang berbeda.

* **Alur Pembelian Tunai (Cash Flow):**
    1.  Pilih Motor
    2.  Isi Data Diri Singkat
    3.  Konfirmasi Pesanan (dengan opsi pembayaran tanda jadi/booking fee)
    4.  Admin Verifikasi
    5.  Proses Pembayaran & Pengiriman Unit

* **Alur Pengajuan Kredit (Credit Flow):**
    1.  Pilih Motor & Simulasi Kredit
    2.  Isi Formulir Data Lengkap & Unggah Dokumen
    3.  Admin Review Kelengkapan Data
    4.  Diteruskan ke Pihak Surveyor/Leasing
    5.  Proses Survei
    6.  Keputusan Kredit (Disetujui/Ditolak)
    7.  Proses Lanjutan (Pembayaran DP, Pengiriman Unit)

---

### **Bagian 3: Arsitektur Data (Desain Model Eloquent)**

Untuk mengakomodasi kedua alur, struktur database dimodifikasi menjadi lebih generik dan relasional. Berikut adalah model-model yang perlu dibuat atau dimodifikasi berdasarkan struktur aplikasi yang ada.

#### **3.1 Model `User` (Bawaan Laravel + Modifikasi)**
* **Fungsi:** Mengelola data dan autentikasi pelanggan.
* **Kolom Penting:** `id`, `name`, `email`, `password`, `phone_number`, `alamat`, `role` (sudah ada di aplikasi saat ini).
* **Catatan:** Telah diimplementasikan di aplikasi saat ini dengan penambahan kolom `role`.

#### **3.2 Model `Motor` (Produk)**
* **Fungsi:** Katalog motor yang dijual.
* **Kolom Penting:** `id`, `name`, `price` (Harga OTR), `description`, `image_path`, `tersedia` (sudah ada di aplikasi saat ini).
* **Catatan:** Sudah diimplementasikan dalam aplikasi saat ini dengan struktur motor dan spesifikasi terpisah.

#### **3.3 Model `MotorSpecification` (Spesifikasi Motor)**
* **Fungsi:** Menyimpan spesifikasi teknis dari motor.
* **Kolom Penting:** `id`, `motor_id`, `spec_key`, `spec_value` (sudah ada di aplikasi saat ini).
* **Catatan:** Telah diimplementasikan dalam aplikasi saat ini dengan relasi ke model Motor.

#### **3.4 Model `Transaction` (Inti Sistem)**
Ini adalah model sentral yang akan menggantikan sistem pemesanan manual. Setiap baris merepresentasikan satu pesanan, baik tunai maupun kredit.
* **Kolom Penting:**
    * `id` (Nomor Transaksi, misal: INV-202511-001)
    * `user_id` (Relasi ke `User`)
    * `motor_id` (Relasi ke `Motor`)
    * `transaction_type` (Tipe **ENUM** atau **string**: 'CASH', 'CREDIT')
    * `status` (Status keseluruhan transaksi, lihat detail di Bagian 5)
    * `notes` (Catatan dari pelanggan)
    * `booking_fee` (Jumlah booking fee yang dibayarkan - untuk alur tunai)
    * `total_amount` (Total jumlah pembayaran yang diperlukan)
    * `payment_method` (Metode pembayaran yang dipilih)
    * `payment_status` (Status pembayaran: pending, confirmed, failed)
    * `timestamps` (created_at, updated_at)

#### **3.5 Model `CreditDetail` (Data Khusus Kredit)**
Model ini hanya akan dibuat jika `transaction_type` adalah 'CREDIT'. Ini adalah relasi *one-to-one* dengan model `Transaction`.
* **Fungsi:** Menyimpan semua data yang spesifik untuk pengajuan kredit.
* **Kolom Penting:**
    * `id`
    * `transaction_id` (Relasi ke `Transaction`)
    * `down_payment` (Jumlah DP)
    * `tenor` (Jangka waktu cicilan)
    * `monthly_installment` (Jumlah cicilan bulanan)
    * `credit_status` (Status spesifik proses kredit, misal: `PENDING_REVIEW`, `SUBMITTED_TO_SURVEYOR`, `APPROVED`, `REJECTED`)
    * `approved_amount` (Jumlah kredit yang disetujui)

#### **3.6 Model `Document` (Dokumen Pendukung)**
* **Fungsi:** Menyimpan path file dokumen yang diunggah untuk pengajuan kredit.
* **Relasi:** Berelasi dengan `CreditDetail`.
* **Kolom Penting:** `id`, `credit_detail_id`, `document_type` ('KTP', 'KK', 'SLIP_GAJI'), `file_path`, `original_name`.

---

### **Bagian 4: Mekanisme Front-End (Alur Pengguna)**

Alur pengguna dirancang untuk menjadi intuitif, memandu mereka ke jalur yang benar sejak awal. Berdasarkan struktur aplikasi saat ini, halaman-halaman berikut perlu dibuat atau dimodifikasi:

#### **4.1 Halaman Produk & Pilihan Transaksi**
* Pelanggan melihat detail motor (sudah ada di `MotorGalleryController@show`).
* Di bawah harga, terdapat dua tombol *Call-to-Action* (CTA) yang jelas:
    1.  **"Beli Tunai"**
    2.  **"Ajukan Kredit"** (di sampingnya ada kalkulator simulasi kredit interaktif - sudah ada di fitur `showCreditCalculation`)
* **Catatan:** Fitur kalkulator kredit sudah diimplementasikan di `MotorGalleryController@showCreditCalculation`

#### **4.2 Alur "Beli Tunai"**
1.  **Klik "Beli Tunai"**: Pengguna diarahkan ke formulir pemesanan tunai.
2.  **Formulir Pesanan Tunai**:
    * Konfirmasi unit motor.
    * Form data diri singkat (Nama, No. Telepon, Alamat Pengiriman).
    * Opsi pembayaran: Tanda Jadi (Booking Fee) atau Pembayaran Penuh di Dealer.
3.  **Halaman Konfirmasi & Terima Kasih**:
    * Menampilkan ringkasan pesanan.
    * Instruksi selanjutnya (misal: "Tim kami akan segera menghubungi Anda untuk konfirmasi jadwal pembayaran dan pengiriman.").

#### **4.3 Alur "Ajukan Kredit"**
Ini mengikuti alur multi-langkah yang perlu diimplementasikan.
1.  **Klik "Ajukan Kredit"**: Pengguna diarahkan ke formulir pengajuan multi-langkah.
2.  **Langkah 1: Skema Pembiayaan**: Konfirmasi unit, pilih DP, dan tenor (menggunakan kalkulator kredit).
3.  **Langkah 2: Data Diri Lengkap**: Mengisi formulir sesuai KTP (wajib login).
4.  **Langkah 3: Unggah Dokumen**: Upload file KTP, KK, Bukti Penghasilan via form yang aman.
5.  **Langkah 4: Review & Kirim**: Pengguna meninjau semua data dan menyetujui S&K.
6.  **Halaman Konfirmasi & Terima Kasih**:
    * Menampilkan nomor pengajuan.
    * Informasi bahwa pengajuan sedang diproses.

---

### **Bagian 5: Mekanisme Back-End (Panel Admin)**

Panel admin adalah pusat kendali untuk mengelola semua jenis transaksi. Berdasarkan struktur aplikasi saat ini, perlu ditambahkan manajemen transaksi ke dalam admin panel.

#### **5.1 Dasbor Terpadu: "Manajemen Transaksi"**
* Satu halaman utama menampilkan tabel semua transaksi yang masuk, diurutkan dari yang terbaru.
* Setiap baris menampilkan info kunci: No. Transaksi, Nama Pelanggan, Tipe (`CASH` / `CREDIT` dalam bentuk label warna), Motor, dan Status.
* Tersedia filter untuk menyortir berdasarkan tipe transaksi atau status.

#### **5.2 Detail dan Aksi Transaksi**
Saat admin mengklik sebuah transaksi, tampilan detail akan disesuaikan:

* **Jika Tipe `CASH`:**
    * **Tampilan:** Data pelanggan, detail motor, catatan.
    * **Aksi Status:** Dropdown untuk mengubah status.
        * **Status untuk Tunai:** `NEW_ORDER` -> `WAITING_PAYMENT` -> `PAYMENT_CONFIRMED` -> `UNIT_PREPARATION` -> `READY_FOR_DELIVERY` -> `COMPLETED`.
    * **Tombol Aksi:** "Hubungi Pelanggan", "Cetak Invoice".

* **Jika Tipe `CREDIT`:**
    * **Tampilan:** Semua data dari `Transaction` dan `CreditDetail`, termasuk tautan untuk mengunduh dokumen yang diunggah.
    * **Aksi Status:** Dropdown untuk mengubah status proses kredit.
        * **Status untuk Kredit:** `PENDING_REVIEW` -> `DATA_INVALID` -> `SUBMITTED_TO_SURVEYOR` -> `SURVEY_SCHEDULED` -> `APPROVED` -> `REJECTED`.
    * **Tombol Aksi:** "Teruskan ke Surveyor", "Minta Kelengkapan Data".

#### **5.3 Modifikasi Admin Panel Saat Ini**
* Tambahkan menu baru di sidebar: "Manajemen Transaksi"
* Buat controller `TransactionController` untuk menangani CRUD transaksi
* Tambahkan route untuk manajemen transaksi di dalam grup route admin
* Sesuaikan layout admin (`resources/views/layouts/admin.blade.php`) dengan menu baru

---

### **Bagian 6: Otomatisasi Notifikasi (Laravel Observer & Notifications)**

Sistem ini menggunakan **Observer** pada model `Transaction` untuk memicu notifikasi secara otomatis.

#### **6.1 `TransactionObserver`**
Observer ini akan "mendengarkan" setiap kali sebuah transaksi dibuat (`created`) atau statusnya diubah (`updated`).

* **Saat Transaksi Dibuat (`created`):**
    * **Jika `transaction_type` == 'CASH'**:
        * Kirim notifikasi ke **Admin**: "Pesanan tunai baru untuk [Nama Motor] telah masuk."
        * Kirim notifikasi ke **Pelanggan**: "Terima kasih, pesanan Anda untuk [Nama Motor] telah kami terima."
    * **Jika `transaction_type` == 'CREDIT'**:
        * Kirim notifikasi ke **Admin**: "Pengajuan kredit baru untuk [Nama Motor] telah masuk."
        * Kirim notifikasi ke **Pelanggan**: "Terima kasih, pengajuan kredit Anda untuk [Nama Motor] sedang kami review."

* **Saat Transaksi Diperbarui (`updated`):**
    * Logika akan memeriksa kolom `status` atau `credit_status` mana yang berubah.
    * Sistem akan mengirim notifikasi yang relevan ke pelanggan. Contoh:
        * Status berubah menjadi `READY_FOR_DELIVERY` (untuk tunai): "Kabar baik! Motor Anda siap untuk diantar. Tim kami akan menghubungi Anda untuk konfirmasi jadwal."
        * Status berubah menjadi `APPROVED` (untuk kredit): "Selamat! Pengajuan kredit Anda telah disetujui."
        * Status berubah menjadi `DATA_INVALID` (untuk kredit): "Mohon periksa kembali dokumen Anda. Ada data yang perlu dilengkapi pada pengajuan Anda."

---

### **Bagian 7: Implementasi Berbasis Struktur Aplikasi Saat Ini**

Berdasarkan analisis struktur aplikasi Laravel SRB Motors saat ini, berikut adalah hal-hal yang perlu ditambahkan/ubah:

#### **7.1 Pembuatan Migration Baru**
Perlu dibuat migration untuk tabel-tabel berikut:
* `transactions` - untuk menyimpan data transaksi
* `credit_details` - untuk detail kredit
* `documents` - untuk menyimpan informasi dokumen pendukung

#### **7.2 Pembuatan Model Baru**
Perlu dibuat model berikut:
* `Transaction.php`
* `CreditDetail.php`
* `Document.php`

#### **7.3 Pembuatan Controller Baru**
Perlu dibuat controller berikut:
* `TransactionController.php`
* Penambahan method di `MotorGalleryController.php` untuk proses pemesanan
* Penambahan method di `AuthController.php` untuk registrasi pelanggan dengan informasi tambahan

#### **7.4 Modifikasi Route**
Perlu menambahkan route baru di `routes/web.php`:
* Route untuk proses pemesanan tunai dan kredit
* Route untuk manajemen transaksi di admin panel

#### **7.5 Pembuatan View Baru**
Perlu dibuat view berikut:
* Formulir pemesanan tunai
* Formulir pemesanan kredit multi-langkah
* Tampilan ringkasan pesanan
* Halaman konfirmasi
* View untuk manajemen transaksi di admin panel
* Tampilan detail transaksi

#### **7.6 Penambahan Notifikasi**
Gunakan Laravel Notifications untuk mengirim notifikasi email/SMS ke customer dan admin.

#### **7.7 Penambahan Validasi dan Upload File**
* Validasi form pemesanan
* Upload dan penyimpanan dokumen untuk pengajuan kredit
* Validasi file yang diunggah (tipe file, ukuran, keamanan)

---

### **Bagian 8: Rekomendasi Pengembangan Bertahap**

1.  **Fase 1 (MVP - Produk Minimum)**: 
    * Implementasi model, migration, dan controller dasar untuk sistem transaksi
    * Tambahkan formulir pemesanan tunai sederhana
    * Implementasi dasbor manajemen transaksi di admin panel
    * Tambahkan status dasar untuk transaksi tunai

2.  **Fase 2 (Pengembangan Alur Kredit)**: 
    * Implementasi alur pengajuan kredit lengkap
    * Implementasi sistem unggah dokumen
    * Tambahkan status dan manajemen untuk proses kredit

3.  **Fase 3 (Peningkatan Fitur)**:
    * **Integrasi WhatsApp API**: Aktifkan notifikasi via WhatsApp untuk komunikasi yang lebih cepat.
    * **Integrasi Payment Gateway**: Untuk alur tunai, sediakan opsi pembayaran tanda jadi (booking fee) secara online melalui Midtrans, Xendit, atau penyedia lainnya.
    * **Laporan dan Analitik**: Tambahkan fitur laporan pesanan untuk admin
    
4.  **Fase 4 (Skalabilitas)**: 
    * Jika bisnis berkembang dan melibatkan banyak pihak (sales, manajer, leasing), pertimbangkan untuk memisahkan logika notifikasi menjadi *Events & Listeners* untuk performa yang lebih baik dan menggunakan package manajemen alur kerja seperti `spatie/laravel-model-status` untuk melacak riwayat perubahan status secara lebih detail.

---

### **Catatan Implementasi**

Dokumen ini perlu disesuaikan dengan implementasi teknis aktual di proyek SRB Motors. Beberapa fitur seperti simulasi kredit sudah ada dalam bentuk dasar (`MotorGalleryController@showCreditCalculation`), sehingga pembuatan alur kredit bisa memanfaatkan logika yang sudah ada.

### **Implementasi dan Perbaikan yang Telah Dilakukan**

Berikut adalah ringkasan dari implementasi sistem pesanan terpadu dan perbaikan yang telah dilakukan:

1. **Struktur Database**: Migrasi dan model untuk `transactions`, `credit_details`, dan `documents` telah dibuat dengan relasi yang tepat.

2. **Kontroler dan Rute**: `TransactionController` telah dibuat dengan lengkap beserta rute-rute yang diperlukan untuk manajemen transaksi.

3. **Antarmuka Pengguna**: 
   - Formulir pesanan tunai dan kredit telah dibuat
   - Halaman konfirmasi pesanan telah ditambahkan
   - Tampilan detail transaksi untuk pelanggan
   - Integrasi ke halaman detail motor dengan tombol pesan

4. **Antarmuka Admin**:
   - Tampilan manajemen transaksi lengkap dengan filter
   - Formulir edit dan buat transaksi
   - Sistem update status transaksi
   - Tampilan detail transaksi dengan informasi menyeluruh

5. **Sistem Notifikasi**:
   - Observer untuk transaksi yang mencakup pembuatan dan pembaruan
   - Notifikasi email dan database untuk pelanggan dan admin
   - Konten notifikasi yang berbeda tergantung pada status dan jenis transaksi

6. **Perbaikan Error**:
   - Memperbaiki error PHP terkait operator ternary dalam template Blade
   - Memastikan semua ekspresi ternary dalam template Blade memiliki tanda kurung yang benar untuk menghindari error di PHP 8.3+

7. **Integrasi dengan Sistem Eksisting**:
   - Menjaga konsistensi desain dan pengalaman pengguna
   - Menambahkan menu transaksi ke panel admin
   - Mengintegrasikan dengan sistem otentikasi dan middleware yang ada

---

### **Alternatif untuk @switch Statement**

Dalam banyak file Blade di aplikasi ini, terutama dalam menampilkan status transaksi dan spesifikasi motor, saat ini digunakan pernyataan `@switch` yang bisa membuat kode menjadi panjang dan kurang fleksibel. Berikut adalah beberapa pendekatan alternatif yang lebih baik:

#### **1. Menggunakan Helper Function (Direkomendasikan)**

Pendekatan terbaik adalah dengan membuat fungsi helper untuk mengonversi status menjadi teks yang dapat dibaca:

**Langkah-langkah:**
1. Buat file helper di `app/Helpers/StatusHelper.php`:
```php
<?php

if (!function_exists('getTransactionStatusText')) {
    function getTransactionStatusText($status) {
        $statusMap = [
            'new_order' => 'Pesanan Baru',
            'waiting_payment' => 'Menunggu Pembayaran',
            'payment_confirmed' => 'Pembayaran Dikonfirmasi',
            'unit_preparation' => 'Persiapan Unit',
            'ready_for_delivery' => 'Siap Dikirim',
            'completed' => 'Selesai',
            'menunggu_persetujuan' => 'Menunggu Persetujuan',
            'data_tidak_valid' => 'Data Tidak Valid',
            'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
            'jadwal_survey' => 'Jadwal Survey',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'PENDING_REVIEW' => 'Menunggu Persetujuan',
            'DATA_INVALID' => 'Data Tidak Valid',
            'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
            'SURVEY_SCHEDULED' => 'Jadwal Survey',
            'APPROVED' => 'Disetujui',
            'REJECTED' => 'Ditolak'
        ];
        
        return $statusMap[$status] ?? $status;
    }
}

if (!function_exists('getCreditStatusText')) {
    function getCreditStatusText($status) {
        $statusMap = [
            'menunggu_persetujuan' => 'Menunggu Persetujuan',
            'data_tidak_valid' => 'Data Tidak Valid',
            'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
            'jadwal_survey' => 'Jadwal Survey',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'PENDING_REVIEW' => 'Menunggu Persetujuan',
            'DATA_INVALID' => 'Data Tidak Valid',
            'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
            'SURVEY_SCHEDULED' => 'Jadwal Survey',
            'APPROVED' => 'Disetujui',
            'REJECTED' => 'Ditolak'
        ];
        
        return $statusMap[$status] ?? $status;
    }
}
```

2. Tambahkan path helper ke `composer.json`:
```json
{
    "autoload": {
        "files": [
            "app/Helpers/StatusHelper.php"
        ]
    }
}
```

3. Jalankan `composer dump-autoload` untuk memuat helper.

4. Ganti pernyataan `@switch` di Blade dengan kode lebih sederhana:
```blade
<span class="badge bg-{{ 
    (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery']) ? 'success' : 
    (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment']) ? 'warning' : 
    (in_array($transaction->status, ['ditolak', 'data_tidak_valid']) ? 'danger' : 'info')))
}}">
    {{ getTransactionStatusText($transaction->status) }}
</span>
```

**Keunggulan pendekatan helper:**
- Kode Blade menjadi lebih bersih dan mudah dibaca
- Kemudahan pemeliharaan karena status hanya didefinisikan di satu tempat
- Performa lebih baik karena tidak perlu melewati banyak pernyataan case
- Memungkinkan untuk mudah menambahkan fitur seperti terjemahan

#### **2. Menggunakan Accessor di Model (Pendekatan OOP)**

Tambahkan accessor ke model Transaction untuk menghasilkan status yang dapat dibaca:

```php
// Dalam model Transaction.php
public function getStatusTextAttribute()
{
    $statusMap = [
        'new_order' => 'Pesanan Baru',
        'waiting_payment' => 'Menunggu Pembayaran',
        'payment_confirmed' => 'Pembayaran Dikonfirmasi',
        'unit_preparation' => 'Persiapan Unit',
        'ready_for_delivery' => 'Siap Dikirim',
        'completed' => 'Selesai',
        'menunggu_persetujuan' => 'Menunggu Persetujuan',
        'data_tidak_valid' => 'Data Tidak Valid',
        'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
        'jadwal_survey' => 'Jadwal Survey',
        'disetujui' => 'Disetujui',
        'ditolak' => 'Ditolak',
        'PENDING_REVIEW' => 'Menunggu Persetujuan',
        'DATA_INVALID' => 'Data Tidak Valid',
        'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
        'SURVEY_SCHEDULED' => 'Jadwal Survey',
        'APPROVED' => 'Disetujui',
        'REJECTED' => 'Ditolak'
    ];
    
    return $statusMap[$this->status] ?? $this->status;
}

public function getCreditStatusTextAttribute()
{
    if (!$this->creditDetail) {
        return '';
    }
    
    $statusMap = [
        'menunggu_persetujuan' => 'Menunggu Persetujuan',
        'data_tidak_valid' => 'Data Tidak Valid',
        'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
        'jadwal_survey' => 'Jadwal Survey',
        'disetujui' => 'Disetujui',
        'ditolak' => 'Ditolak',
        'PENDING_REVIEW' => 'Menunggu Persetujuan',
        'DATA_INVALID' => 'Data Tidak Valid',
        'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
        'SURVEY_SCHEDULED' => 'Jadwal Survey',
        'APPROVED' => 'Disetujui',
        'REJECTED' => 'Ditolak'
    ];
    
    return $statusMap[$this->creditDetail->credit_status] ?? $this->creditDetail->credit_status;
}
```

Kemudian gunakan di Blade:
```blade
<span class="badge bg-{{ 
    (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery']) ? 'success' : 
    (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment']) ? 'warning' : 
    (in_array($transaction->status, ['ditolak', 'data_tidak_valid']) ? 'danger' : 'info')))
}}">
    {{ $transaction->status_text }}
</span>
```

**Keunggulan pendekatan accessor:**
- Lebih OOP dan mengikuti prinsip Laravel
- Status diproses di tingkat model sehingga bisa digunakan di mana saja
- Kode Blade menjadi sangat bersih
- Lebih mudah untuk menambahkan logika tambahan di masa depan

#### **3. Menggunakan View Composer (Untuk Tampilan Kompleks)**

Jika status perlu ditransformasi dengan logika kompleks atau mengakses data tambahan dari database, View Composer bisa menjadi pilihan:

```php
// Buat file: app/Http/View/Composers/TransactionStatusComposer.php
<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;
use App\Models\Transaction;

class TransactionStatusComposer
{
    public function compose(View $view)
    {
        $transaction = $view->transaction;
        
        $statusText = $this->getStatusText($transaction->status);
        $creditStatusText = $transaction->creditDetail ? $this->getCreditStatusText($transaction->creditDetail->credit_status) : '';
        
        $view->with('statusText', $statusText)
             ->with('creditStatusText', $creditStatusText);
    }
    
    private function getStatusText($status)
    {
        $statusMap = [
            'new_order' => 'Pesanan Baru',
            'waiting_payment' => 'Menunggu Pembayaran',
            'payment_confirmed' => 'Pembayaran Dikonfirmasi',
            'unit_preparation' => 'Persiapan Unit',
            'ready_for_delivery' => 'Siap Dikirim',
            'completed' => 'Selesai',
            'menunggu_persetujuan' => 'Menunggu Persetujuan',
            'data_tidak_valid' => 'Data Tidak Valid',
            'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
            'jadwal_survey' => 'Jadwal Survey',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'PENDING_REVIEW' => 'Menunggu Persetujuan',
            'DATA_INVALID' => 'Data Tidak Valid',
            'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
            'SURVEY_SCHEDULED' => 'Jadwal Survey',
            'APPROVED' => 'Disetujui',
            'REJECTED' => 'Ditolak'
        ];
        
        return $statusMap[$status] ?? $status;
    }
    
    private function getCreditStatusText($status)
    {
        $statusMap = [
            'menunggu_persetujuan' => 'Menunggu Persetujuan',
            'data_tidak_valid' => 'Data Tidak Valid',
            'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
            'jadwal_survey' => 'Jadwal Survey',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'PENDING_REVIEW' => 'Menunggu Persetujuan',
            'DATA_INVALID' => 'Data Tidak Valid',
            'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
            'SURVEY_SCHEDULED' => 'Jadwal Survey',
            'APPROVED' => 'Disetujui',
            'REJECTED' => 'Ditolak'
        ];
        
        return $statusMap[$status] ?? $status;
    }
}
```

Kemudian daftarkan di AppServiceProvider:
```php
use Illuminate\Support\Facades\View;
use App\Http\View\Composers\TransactionStatusComposer;

public function boot()
{
    View::composer(
        'pages.motors.order_confirmation', TransactionStatusComposer::class
    );
}
```

**Keunggulan View Composer:**
- Memisahkan logika tampilan dari template
- Cocok untuk logika yang kompleks dan membutuhkan data tambahan
- Menghindari duplikasi logika di banyak tampilan

#### **Rekomendasi Terbaik**

Untuk aplikasi SRB Motors, saya merekomendasikan menggunakan kombinasi antara **helper function** dan **model accessor**:

1. Gunakan **helper function** untuk status yang digunakan di banyak tempat dan memerlukan logika sederhana
2. Gunakan **model accessor** untuk status yang secara alami bagian dari model dan mungkin memerlukan logika tambahan di masa depan
3. Gunakan **View Composer** hanya jika ada kebutuhan logika kompleks yang perlu digunakan secara menyeluruh dalam beberapa tampilan

Pendekatan ini akan:
- Mengurangi jumlah baris kode di file Blade secara signifikan
- Meningkatkan keterbacaan dan pemeliharaan kode
- Menyediakan fleksibilitas untuk menambahkan fitur di masa depan
- Meningkatkan performa karena mengurangi jumlah pernyataan kondisional di sisi tampilan

---

## **Rancangan Sistem Cetak Invoice untuk Website Dealer Motor SRB Motors**

### **Bagian 1: Gambaran Umum**

#### **1.1 Latar Belakang**
Fitur cetak invoice sangat penting dalam sistem penjualan motor karena merupakan dokumen resmi yang mencatat transaksi pembelian antara dealer dan pelanggan. Invoice ini menjadi bukti pembelian, syarat administrasi kendaraan, dan dasar dalam proses administrasi purna jual.

#### **1.2 Tujuan**
* **Menghasilkan Invoice Digital:** Membuat invoice dalam format PDF yang profesional dan resmi untuk setiap transaksi berhasil
* **Otomatisasi Proses:** Menghasilkan invoice secara otomatis saat transaksi mencapai status tertentu
* **Kemudahan Akses:** Memudahkan admin dan pelanggan untuk mencetak/menyimpan invoice
* **Memenuhi Kebutuhan Administrasi:** Menyediakan dokumen yang memenuhi kebutuhan administrasi dan legalitas bisnis

---

### **Bagian 2: Spesifikasi Fitur**

#### **2.1 Akses dan Trigger**
* **Kapan Invoice Tersedia:** Invoice hanya tersedia untuk transaksi dengan status `payment_confirmed`, `unit_preparation`, `ready_for_delivery`, atau `completed`
* **Akses Admin:** Tombol "Cetak Invoice" muncul di halaman detail transaksi untuk admin
* **Akses Pelanggan:** Pelanggan bisa mengakses invoice di halaman konfirmasi pesanan dan riwayat transaksi setelah pembayaran dikonfirmasi

#### **2.2 Struktur Data Invoice**
Invoice akan mencakup informasi berikut:
* **Header Invoice:**
  * Logo dealer (SRB Motors)
  * Nama dan alamat dealer
  * Nomor invoice (format: INV-YYYYMM-DD-XXXX)
  * Tanggal pembuatan
  * Nama dan alamat pelanggan
  * Informasi kontak pelanggan

* **Detail Transaksi:**
  * Nama motor
  * Spesifikasi utama (tahun, tipe, warna)
  * Harga motor
  * Booking fee (jika ada)
  * Total pembayaran
  * Metode pembayaran
  * Catatan tambahan (jika ada)

* **Footer Invoice:**
  * Tanda tangan digital dealer
  * Kode unik invoice
  * Keterangan legalitas
  * Barcode untuk verifikasi

---

### **Bagian 3: Arsitektur Teknis**

#### **3.1 Dependencies yang Dibutuhkan**
* Package `barryvdh/laravel-dompdf` untuk generasi PDF

#### **3.2 Model dan Relasi**
* Tidak diperlukan model baru, invoice akan di-generate dari data transaksi yang sudah ada
* Relasi: `Transaction` → `User`, `Transaction` → `Motor`, `Transaction` → `CreditDetail` (jika kredit)

#### **3.3 Controller Baru**
* Tambahkan method `generateInvoice` di `TransactionController`
* Method akan menerima ID transaksi dan mengembalikan file PDF

#### **3.4 Route Baru**
* Tambahkan route: `GET /admin/transactions/{id}/invoice` untuk menghasilkan invoice

#### **3.5 View untuk Invoice**
* Buat view Blade khusus yang dioptimalkan untuk cetak (invoice.blade.php)
* Gunakan layout simple tanpa header/footer website

---

### **Bagian 4: Implementasi**

#### **4.1 Instalasi Dependencies**
* Instal dan konfigurasi `barryvdh/laravel-dompdf` untuk pembuatan PDF

#### **4.2 Method di Controller**
* Method `generateInvoice` akan:
  * Mengambil data transaksi beserta relasi yang diperlukan
  * Memvalidasi bahwa transaksi memiliki status yang benar untuk menghasilkan invoice
  * Membangun tampilan invoice menggunakan template Blade
  * Menghasilkan PDF dari template tersebut
  * Mengembalikan file PDF untuk didownload

#### **4.3 Template Invoice**
* Desain template responsif dengan layout khusus untuk cetak
* Termasuk header dealer, informasi pelanggan, detail transaksi, dan footer khusus
* Menggunakan CSS untuk layout cetak (menggunakan ukuran A4)

#### **4.4 Integrasi dengan Admin Panel**
* Tambahkan tombol "Cetak Invoice" di halaman detail transaksi untuk transaksi dengan status yang sesuai
* Tambahkan link download pada halaman konfirmasi pesanan untuk pelanggan (setelah pembayaran dikonfirmasi)

---

### **Bagian 5: Desain UI/UX**

#### **5.1 Desain Tombol**
* Tombol "Cetak Invoice" dengan ikon printer
* Hanya muncul untuk transaksi dengan status yang sesuai
* Warna tombol: biru (primary) untuk konsistensi UI

#### **5.2 Desain Invoice**
* Format A4 (210mm × 297mm)
* Margin konsisten (20mm)
* Penggunaan font profesional dan mudah dibaca
* Logo dan warna konsisten dengan brand SRB Motors
* Tabel untuk detail transaksi yang rapi dan terstruktur
* Footer dengan informasi legalitas

---

### **Bagian 6: Fungsi dan Akses**

#### **6.1 Hak Akses**
* Admin: Penuh - bisa mengakses invoice untuk semua transaksi yang sesuai
* Pelanggan: Terbatas - hanya bisa mengakses invoice untuk transaksi milik mereka sendiri

#### **6.2 Keamanan**
* Validasi bahwa pengguna memiliki hak akses ke transaksi tertentu
* Proteksi dari akses tidak sah ke invoice lain
* File PDF tidak disimpan di direktori publik, diakses melalui route terproteksi

---

### **Bagian 7: Validasi dan Error Handling**

#### **7.1 Validasi Status**
* Hanya transaksi dengan status `payment_confirmed`, `unit_preparation`, `ready_for_delivery`, atau `completed` yang bisa di-generate invoice-nya

#### **7.2 Error Handling**
* Jika transaksi tidak ditemukan, tampilkan error 404
* Jika pengguna tidak punya akses, tampilkan error 403
* Jika transaksi tidak memenuhi syarat untuk invoice, tampilkan pesan penjelasan

---

### **Bagian 8: Deployment dan Testing**

#### **8.1 Testing**
* Uji coba proses generate invoice untuk berbagai skenario dan status transaksi
* Uji coba dengan berbagai browser
* Uji coba tampilan cetak

#### **8.2 Deployment**
* Pastikan server punya dependencies yang cukup untuk proses generate PDF
* Pengujian pada lingkungan produksi sebelum rilis

---

### **Bagian 9: Jadwal Implementasi**

#### **Fase 1 (Hari 1-2):** Setup Dependencies dan Struktur Dasar
* Instalasi dompdf
* Pembuatan route, controller method
* Setup template dasar

#### **Fase 2 (Hari 3-4):** Implementasi Fitur Lengkap
* Implementasi method generateInvoice
* Desain template invoice
* Integrasi dengan admin panel

#### **Fase 3 (Hari 5):** Testing dan Deployment
* Testing fitur
* Validasi tampilan dan fungsionalitas
* Deployment ke production

---

### **Bagian 10: Manfaat dan Dampak**

#### **10.1 Manfaat Bisnis**
* Mempercepat proses administrasi penjualan
* Memberikan profesionalisme dalam pelayanan
* Memudahkan pelanggan dalam administrasi purna jual
* Mengurangi kesalahan pencatatan manual

#### **10.2 Manfaat Teknis**
* Mengotomatisasi proses pembuatan dokumen resmi
* Menyediakan arsip digital untuk setiap transaksi
* Meningkatkan keamanan dan integritas data transaksi


---

## **Rancangan Sistem Laporan (Reporting) untuk Panel Admin Website Dealer Motor SRB Motors**

### **Bagian 1: Gambaran Umum**

#### **1.1 Latar Belakang**
Sistem laporan merupakan komponen penting dalam operasional sebuah dealer motor. Admin perlu memiliki akses ke informasi yang terstruktur dan terperinci tentang penjualan, tren pasar, kinerja produk, dan kinerja proses transaksi. Saat ini, informasi transaksi hanya tersedia dalam bentuk daftar transaksi, tetapi belum ada representasi laporan yang komprehensif yang membantu pengambilan keputusan strategis.

#### **1.2 Tujuan**
* **Menghasilkan Laporan Terstruktur:** Menyediakan berbagai jenis laporan yang dapat membantu admin dalam menganalisis kinerja bisnis
* **Mendukung Pengambilan Keputusan:** Memberikan informasi kuantitatif dan kualitatif yang mendukung pengambilan keputusan strategis
* **Memantau Kinerja:** Memonitor kinerja penjualan, tren permintaan, dan efisiensi proses transaksi
* **Meningkatkan Transparansi:** Memberikan gambaran yang jelas tentang aktivitas penjualan dan proses bisnis

---

### **Bagian 2: Spesifikasi Fitur Laporan**

#### **2.1 Jenis Laporan yang Tersedia**

1. **Laporan Penjualan Harian/Mingguan/Bulanan**
   * Total transaksi dalam periode tertentu
   * Jumlah transaksi tunai vs kredit
   * Pendapatan bruto berdasarkan periode
   * Distribusi transaksi berdasarkan jenis motor

2. **Laporan Motor Terlaris**
   * 10 motor terlaris dalam periode tertentu
   * Persentase kontribusi terhadap total penjualan
   * Tren penjualan per merek (Honda vs Yamaha)

3. **Laporan Status Transaksi**
   * Distribusi status transaksi (baru, menunggu pembayaran, dikonfirmasi, selesai, ditolak)
   * Waktu rata-rata pemrosesan transaksi
   * Tingkat keberhasilan pengajuan kredit vs penolakan

4. **Laporan Customer Demografi**
   * Distribusi pelanggan berdasarkan profesi
   * Analisis demografi pelanggan (dari informasi yang tersedia)

5. **Laporan Performa Kredit**
   * Rasio keberhasilan pengajuan kredit
   * Persentase penolakan berdasarkan alasan
   * Waktu rata-rata proses kredit

#### **2.2 Akses dan Tampilan**
* **Akses Admin:** Hanya admin yang memiliki akses ke sistem laporan
* **Menu Laporan:** Tambahkan submenu "Laporan" di sidebar admin panel
* **Tampilan Dashboard Laporan:** Halaman utama yang menampilkan ringkasan kunci dan grafik penting
* **Detail Laporan:** Setiap jenis laporan memiliki halaman detail dengan filter dan opsi eksport

#### **2.3 Filter dan Parameter**
* **Filter Tanggal:** Rentang tanggal untuk membatasi periode laporan
* **Filter Tipe Transaksi:** Tunai vs Kredit
* **Filter Status Transaksi:** Untuk laporan berdasarkan status
* **Filter Motor/Merek:** Untuk laporan berdasarkan produk

---

### **Bagian 3: Arsitektur Teknis**

#### **3.1 Dependencies dan Tools yang Dibutuhkan**
* Package `consoletvs/charts` atau `unisharp/laravel-chartjs` untuk visualisasi grafik
* PHPExcel/PhpSpreadsheet untuk eksport ke Excel
* Laravel Eloquent untuk query data

#### **3.2 Model dan Relasi**
* Menggunakan model yang sudah ada: `Transaction`, `Motor`, `User`, `CreditDetail`
* Mungkin memerlukan repository baru untuk query kompleks laporan

#### **3.3 Controller Baru**
* Buat `ReportController` untuk menangani semua fungsi laporan
* Method untuk setiap jenis laporan: `dailySalesReport`, `topSellingMotors`, `transactionStatusReport`, dll.

#### **3.4 Route Baru**
* Tambahkan grup route untuk laporan di dalam grup admin:
  * `GET /admin/reports` - Dashboard laporan
  * `GET /admin/reports/sales` - Laporan penjualan
  * `GET /admin/reports/motors` - Laporan motor terlaris
  * `GET /admin/reports/status` - Laporan status transaksi
  * `GET /admin/reports/credit` - Laporan performa kredit
  * `GET /admin/reports/export/{type}` - Eksport laporan ke Excel/PDF

#### **3.5 View untuk Laporan**
* Halaman `reports/index.blade.php` sebagai dasbor laporan
* View terpisah untuk setiap jenis laporan
* Template untuk ekspor laporan ke Excel/PDF

---

### **Bagian 4: Implementasi**

#### **4.1 Instalasi Dependencies**
* Instal dan konfigurasi package chart
* Instal dan konfigurasi package untuk ekspor file

#### **4.2 Pembuatan Repository**
* Buat `ReportRepository` untuk menangani query laporan yang kompleks
* Method di repository: `getDailySales`, `getTopSellingMotors`, `getTransactionStatusStats`, dll.

#### **4.3 Method di Controller**
* Method untuk masing-masing jenis laporan
* Method untuk menangani filter dan parameter pencarian
* Method untuk ekspor laporan ke Excel/PDF

#### **4.4 Desain UI/UX**
* Dashboard laporan dengan ringkasan visual
* Grafik interaktif menggunakan chart library
* Filter dan parameter yang mudah digunakan
* Tampilan responsif untuk berbagai ukuran layar

#### **4.5 Integrasi dengan Admin Panel**
* Tambahkan menu "Laporan" di sidebar admin
* Integrasi dengan sistem navigasi yang sudah ada
* Konsistensi desain dengan tampilan admin lainnya

---

### **Bagian 5: Desain Laporan dan Visualisasi**

#### **5.1 Dasbor Laporan (Dashboard)**
* Ringkasan kunci:
  * Total transaksi hari ini/minggu ini/bulan ini
  * Pendapatan bruto periode terpilih
  * Rasio transaksi tunai vs kredit
  * Motor terlaris bulan ini
* Grafik:
  * Grafik garis tren penjualan harian
  * Grafik batang distribusi transaksi berdasarkan jenis

#### **5.2 Laporan Penjualan**
* Tabel data:
  * No. Transaksi
  * Tanggal
  * Nama Motor
  * Tipe Transaksi (Tunai/Kredit)
  * Status
  * Total Pembayaran
* Grafik:
  * Grafik garis pendapatan harian/mingguan/bulanan
  * Pie chart distribusi tipe transaksi

#### **5.3 Laporan Motor Terlaris**
* Tabel data:
  * Peringkat
  * Nama Motor
  * Jumlah Terjual
  * Pendapatan
  * Persentase dari Total
* Grafik:
  * Grafik batang motor terlaris
  * Pie chart distribusi berdasarkan merek

#### **5.4 Laporan Status Transaksi**
* Tabel data:
  * Status
  * Jumlah Transaksi
  * Persentase
* Grafik:
  * Pie chart distribusi status
  * Grafik garis perubahan status sepanjang waktu

#### **5.5 Laporan Performa Kredit**
* Tabel data:
  * Status Kredit
  * Jumlah Transaksi
  * Persentase
  * Rata-rata Waktu Pemrosesan
* Grafik:
  * Grafik batang perbandingan disetujui vs ditolak
  * Grafik lingkaran distribusi alasan penolakan (jika ada)

---

### **Bagian 6: Fungsi dan Akses**

#### **6.1 Hak Akses**
* Admin: Penuh - bisa mengakses semua jenis laporan dan fitur eksport
* Super Admin: Akses tambahan untuk konfigurasi laporan (jika diperlukan)

#### **6.2 Keamanan**
* Validasi bahwa pengguna memiliki hak akses admin
* Proteksi dari akses tidak sah ke data laporan
* Filter input yang aman untuk mencegah SQL injection

---

### **Bagian 7: Validasi dan Error Handling**

#### **7.1 Validasi Parameter**
* Validasi rentang tanggal yang masuk akal
* Validasi format ekspor yang didukung
* Validasi filter yang dipilih

#### **7.2 Error Handling**
* Jika tidak ada data untuk periode yang dipilih, tampilkan pesan yang tepat
* Jika parameter tidak valid, kembali ke halaman dengan error
* Jika proses ekspor gagal, tampilkan pesan kesalahan

---

### **Bagian 8: Fungsi Eksport**

#### **8.1 Format Eksport**
* Excel (XLSX) - untuk analisis lanjutan
* PDF - untuk laporan resmi
* CSV - untuk impor ke sistem lain

#### **8.2 Implementasi Eksport**
* Method untuk menghasilkan data dalam format yang diminta
* Penamaan file yang dinamis berdasarkan jenis laporan dan periode
* Download langsung ke browser pengguna

---

### **Bagian 9: Deployment dan Testing**

#### **9.1 Testing**
* Uji coba fungsi laporan dengan berbagai kombinasi filter
* Uji coba fungsi ekspor ke berbagai format
* Uji kinerja dengan jumlah data besar
* Uji keamanan akses dan filter input

#### **9.2 Deployment**
* Pastikan server memiliki resource cukup untuk memproses laporan besar
* Konfigurasi cache untuk meningkatkan kinerja laporan
* Backup strategi untuk data laporan

---

### **Bagian 10: Jadwal Implementasi**

#### **Fase 1 (Hari 1-2):** Setup Dependencies dan Struktur Dasar
* Instalasi dan konfigurasi package chart
* Pembuatan route, controller, dan repository
* Setup template dasar untuk laporan

#### **Fase 2 (Hari 3-5):** Implementasi Dasar Laporan
* Implementasi query dasar untuk masing-masing jenis laporan
* Implementasi UI dasar untuk dasbor laporan
* Implementasi filter tanggal dan parameter

#### **Fase 3 (Hari 6-8):** Implementasi Visualisasi
* Implementasi grafik menggunakan chart library
* Peningkatan UI/UX untuk tampilan laporan
* Implementasi responsivitas

#### **Fase 4 (Hari 9-10):** Implementasi Eksport dan Finalisasi
* Implementasi fungsi eksport ke Excel/PDF/CSV
* Testing menyeluruh untuk semua jenis laporan
* Deployment ke lingkungan produksi

---

### **Bagian 11: Manfaat dan Dampak**

#### **11.1 Manfaat Bisnis**
* Meningkatkan efisiensi operasional dengan informasi yang terstruktur
* Mendukung pengambilan keputusan berbasis data
* Memudahkan perencanaan stok dan strategi pemasaran
* Memberikan gambaran kinerja kredit yang lebih jelas

#### **11.2 Manfaat Teknis**
* Mengorganisir data mentah menjadi informasi yang bermanfaat
* Menyediakan antarmuka yang mudah digunakan untuk analisis data
* Meningkatkan kemampuan pelaporan dan dokumentasi bisnis
* Mendukung audit dan pelaporan keuangan