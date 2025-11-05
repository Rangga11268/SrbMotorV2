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