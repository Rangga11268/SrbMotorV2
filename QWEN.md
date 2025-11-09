# SRB Motors Laravel Implementation

## NEXT

Role owner / admin / user biasa  
Middleware atau aturan masuk dll juga harus di pastikan sudah benar
Fitur forgot password (notes untuk development jadi tidak menggunakan third party) dan profil management
tambah crud lagi di admin yaitu data penjualan motor dan ini pasti datanya dari luar atau di luar webiste misal ada yang datang ke dealer langsung  
dan tambahkan sweetalert 2 di admin
spek dapat di tambah input nya jadi user bisa milih misah awal tampilkan 1 input spek lalu ada opsi plus tambah spek nanti muncul input baru lagi



MEMISAHKAN HALAMAN HALAMAN DAN
HALAMAN GALERI MOTOR NANTI BAKAL ADA FILTER DAN SEARCH UNTUK USER DAN BERBAGAI FITUR LAGI
SERTA ADA HALAMAN BERITA JUGA
DI admin saya ingin gambar motor ada default nya nanti saya kasih gambar default nya jadi gambar itu tidak harus ada
halaman Simulasi Kredit: Ini adalah fitur wajib untuk dealer. Buat kalkulator sederhana di mana pengguna bisa memasukkan harga motor, jumlah DP (Uang Muka), dan tenor (misal 12, 24, 36 bulan). Website Anda lalu menghitung estimasi cicilan per bulan.
Blog / Artikel: Buat sistem blog sederhana (ini juga CRUD, tapi untuk artikel) di mana admin bisa memposting tips perawatan motor, berita otomotif, atau info promo terbaru.
Fitur Perbandingan Motor:
Memungkinkan pengguna membandingkan spesifikasi dua atau lebih motor secara berdampingan, sangat berguna dalam proses pengambilan 
keputusan pembelian.
Perkecil Footer
Custom Loading
Manajemen Pemesanan (Bisa dari luar web di catat di web nya)
Efisiensi Table


SIAPKAN SISTEM SEMI BELI ONLINE JADI MISAL ADA USER YANG MEMESAN BAKAL BISA ADMIN ATUR DI ADMIN PANEL BERHUNGAN DENGAN UPDATE  Manajemen Pemesanan (Order Management) - V0.05 NAH POKOE SIAPKAN SISTEM TERBAIK TAPI TIDAK TERLALU RIBET

ORDER HISTORY DAN PROFILE MANAGEMENT

BUAT NAMA NAMA TABEL PAKAI BAHASA INDONESIA SERTA MERGE FILE MIGRASI AGAR FILE NYA TAK TERLALU BANYAK

## Recent Progress

-   Fixed navbar height issue making it less tall and more proportionally sized
-   Organized frontend assets by moving CSS, JS, and image files to proper Laravel directories
-   Integrated custom CSS with Tailwind CSS through Vite build process
-   Fixed login button size in navbar to match other navbar elements
-   Fixed responsive navbar mobile menu where login button icon wasn't clickable
-   Fixed login and register form logo positioning to prevent it from being cut off
-   Improved password toggle icon positioning in login and register forms
-   Made navbar height consistent across all pages (homepage, login, register)
-   Translated login and register pages to Indonesian
-   Completely redesigned admin dashboard with improved styling
-   Added dropdown menu for "View Website" and "Logout" options in admin navbar
-   Improved styling for all CRUD sections in the admin panel
-   Enhanced responsive design for all admin pages, especially for mobile and tablet devices
-   Replaced JSON specifications input with user-friendly form fields for motor specifications
-   Translated entire admin panel to Indonesian
-   Fixed Swiper.js duplication issue when there are only 1-2 items in sliders
-   Improved styling of motor gallery cards for better visual appeal
-   Enhanced specification display in modal with structured format
-   Implemented separate specifications table with proper relationships
-   Added full rollback capability for database migrations

## Overview

The SRB Motors website has been successfully converted from a static HTML/CSS/JS site to a dynamic Laravel application. The implementation maintains the original design and user experience while adding powerful backend functionality through Laravel.

## Features Implemented

### 1. Frontend Features (Preserving Original Design)

-   Responsive design with navigation menu
-   Home section with parallax effect
-   "Our Advantages" section
-   Popular motors slider with motor details
-   About Us section
-   Motors gallery (divided by brand: Yamaha, Honda)
-   Tips & Tricks section
-   Contact form with backend processing
-   Footer with contact information
-   Modal for showing detailed motor specifications

### 2. Backend Features

-   Complete user authentication system (login/register)
-   Role-based access control (admin/user roles)
-   Motor management CRUD operations
-   Image upload functionality for motor images
-   Contact form with database storage
-   User management in admin panel
-   Search functionality in admin panels
-   Dashboard with statistics
-   Separated motor specifications into dedicated table for better organization

### 3. Database Schema

-   Motors Table:

    -   id (primary key)
    -   name (string)
    -   brand (string) - Honda, Yamaha
    -   model (string)
    -   price (decimal)
    -   year (integer)
    -   type (string) - Metic, Automatic, Sport, etc.
    -   image_path (string) - path to the motor image
    -   details (text) - brief details about the motor
    -   created_at
    -   updated_at

-   Motor Specifications Table (newly added):

    -   id (primary key)
    -   motor_id (foreign key) - references motors table
    -   spec_key (string) - the specification name (e.g., engine_type, engine_size)
    -   spec_value (text) - the specification value (e.g., "4 tak", "155cc")
    -   created_at
    -   updated_at

-   Contact Messages Table:

    -   id (primary key)
    -   name (string)
    -   email (string)
    -   subject (string)
    -   message (text)
    -   created_at
    -   updated_at

-   Users Table (with role-based access):
    -   id (primary key)
    -   name (string)
    -   email (string) - unique
    -   password (string)
    -   role (string) - admin, user
    -   created_at
    -   updated_at

### 4. Controllers

-   HomeController - Handles the main page display
-   MotorController - Handles CRUD operations for motors
-   ContactController - Handles contact form processing
-   AdminController - Handles admin panel dashboard
-   ContactMessageController - Manages contact messages
-   UserController - Manages user accounts and roles
-   AuthController - Handles authentication (login/register)

### 5. Admin Panel Features

-   Dashboard with statistics (motors, messages, users)
-   Motor management (CRUD operations with image uploads)
-   Contact message management
-   User management (role assignment, deletion)
-   Search functionality across all admin sections
-   Recent items panels for quick overview
-   Separate specifications management in motor forms

### 6. Security Measures

-   CSRF protection for all forms
-   Input validation
-   Authentication for admin area
-   Role-based middleware (admin/user)
-   Image upload validation
-   User access control

### 7. Frontend Technologies

-   Bootstrap 5.3.0-alpha1 (maintaining current styling)
-   Swiper.js for sliders (same as original site)
-   Font Awesome for icons (same as original site)
-   Custom CSS (style.css) adapted from original site
-   JavaScript functionality adapted from original site

## Key Improvements Over Original Site

1. **Dynamic Content Management**: Motors can now be added, edited, and deleted through an admin panel
2. **User Authentication**: Secure login system with role-based access
3. **Contact Message Storage**: All contact form submissions are stored in the database
4. **Image Upload**: Easy way to add images for new motorcycles
5. **User Management**: Admin can manage user roles and accounts
6. **Search Functionality**: Search across motors, messages, and users in admin panel
7. **Dashboard**: Overview of all system activity
8. **Proper Specifications Management**: Separated specifications into a dedicated table for better organization and retrieval
9. **Clean Specification Display**: Specifications now display properly formatted in modals without horizontal scrolling

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── HomeController.php
│   │   ├── MotorController.php
│   │   ├── ContactController.php
│   │   ├── AdminController.php
│   │   ├── ContactMessageController.php
│   │   ├── UserController.php
│   │   └── AuthController.php
│   └── Middleware/
│       └── AdminMiddleware.php
├── Models/
│   ├── Motor.php
│   ├── MotorSpecification.php
│   ├── ContactMessage.php
│   └── User.php
config/
└── app.php (with middleware registration)
database/
├── migrations/
├── seeders/
│   ├── DatabaseSeeder.php
│   └── UserSeeder.php
resources/
└── views/
    ├── layouts/
    │   ├── app.blade.php
    │   └── admin.blade.php
    ├── partials/
    │   ├── header.blade.php
    │   └── footer.blade.php
    ├── pages/
    │   ├── home.blade.php
    │   └── admin/
    │       ├── dashboard.blade.php
    │       ├── motors/
    │       ├── contact/
    │       └── users/
    └── auth/
        ├── login.blade.php
        └── register.blade.php
routes/
└── web.php
```

## Usage

1. **Public Site**: Visit the homepage to browse motors just like the original site
2. **Admin Panel**: Access `/admin` (requires admin login)
3. **Login**: Use `/login` to access the authentication system
4. **Registration**: New users can register at `/register`

## Default Admin User

After seeding the database, you can log in with:

-   Email: admin@srbmotors.com
-   Password: password

## Bug Fixes Implemented

1. **Motor Duplication Fix**: Fixed issue where motors appeared 3 times in sliders by disabling Swiper.js loop functionality (`loop: false`) to prevent slide duplication.

2. **Navbar Dropdown Fix**: Updated the navbar authentication element ID from `login-btn` to `auth-btn` to prevent conflicts with original JavaScript that was opening the login modal. Now authenticated users get a proper dropdown menu with user name, admin panel access (for admins), and logout option, while unauthenticated users get a link to the login page.

3. **Specifications Display Fix**: Fixed issue where specifications were displaying horizontally by implementing a proper structured format with vertical layout.

## Key Features & Enhancements

1. **Complete Authentication System**:

    - User registration and login
    - Role-based access (admin/user)
    - Secure password hashing

2. **Enhanced Admin Panel**:

    - Dashboard with statistics
    - Motor management (CRUD operations)
    - Contact message management
    - User management with role assignment
    - Image upload for motors
    - Search functionality across all sections
    - Proper specifications management

3. **Preserved Original Design**:

    - Same layout and styling as original site
    - Responsive design maintained
    - All original sections preserved (home, advantages, motors, about us, etc.)

4. **Added Functionality**:
    - Dynamic content management
    - Backend processing for contact form
    - Image upload for motor listings
    - User role management
    - Proper specifications storage and retrieval
    - Migration with full rollback capability

## Project Architecture

The application follows Laravel best practices with:

-   MVC architecture
-   Resource controllers for CRUD operations
-   Blade templating system
-   Eloquent ORM models
-   Middleware for authentication and authorization
-   Proper separation of concerns

## Recent Enhancements

5. **Improved Authentication Pages**:

    - Enhanced design for login and registration pages
    - Added proper spacing to prevent navbar overlap
    - Improved logo positioning to avoid being cut off
    - Better visual styling with gradients and animations
    - Consistent with the SRB Motors brand

6. **Enhanced Navbar Functionality**:

    - Implemented navbar shrinking effect when scrolling
    - Improved dropdown menu styling and functionality
    - Better mobile responsiveness
    - Enhanced visual feedback for interactive elements

7. **Fixed Error Handling**:

    - Resolved model binding issues in routes
    - Fixed URL generation errors
    - Improved null value handling in views
    - Better controller parameter matching

8. **UI/UX Improvements**:
    - Enhanced form validation and error display
    - Improved auto-capitalization settings in forms
    - Better visual feedback for user interactions
    - Refined styling throughout the application

9. **Database Normalization**:
    - Separated specifications into a dedicated table
    - Maintained referential integrity with foreign keys
    - Improved query performance and data organization
    - Added full migration rollback capability







#### CONTOH EFISENSI
Update ini menjelaskan proses optimasi struktur database pada proyek Tunggal Jaya Transport dengan mengkonsolidasikan migrasi-migrasi yang redundan menjadi migrasi-migrasi yang lebih efisien. Tujuan utama dari update ini adalah untuk mengurangi kompleksitas manajemen database dan mempermudah proses implementasi di lingkungan produksi.

## Migration Consolidation Process

### A. Analisis Migrasi Awal

1. **Jumlah Migrasi Awal**: 43 file migrasi
2. **Migrasi Inti Laravel**: 3 file (users, cache, jobs)
3. **Migrasi Fitur Aplikasi**: 40 file migrasi terkait fitur transportasi
4. **Migrasi Redundan**: Banyak migrasi yang membuat perubahan kecil pada tabel yang sama

### B. Identifikasi Migrasi untuk Konsolidasi

#### 1. Migrasi Terkait Tabel Bookings (9 menjadi 1)
- `2025_09_14_051954_create_bookings_table.php`
- `2025_09_16_093356_add_seat_number_to_bookings_table.php`
- `2025_09_16_094335_make_user_id_nullable_in_bookings_table.php`
- `2025_09_16_094550_rename_seat_number_to_seat_numbers_in_bookings_table.php`
- `2025_09_16_094642_ensure_seat_numbers_is_nullable_in_bookings_table.php`
- `2025_09_16_094808_remove_duplicate_seat_number_column_in_bookings_table.php`
- `2025_09_16_095137_add_number_of_seats_to_bookings_table.php`
- `2025_09_19_113037_fix_bookings_table_structure.php`
- `2025_09_26_120000_add_booking_date_to_bookings_table.php`
- **Konsolidasi ke**: `2025_09_14_051954_create_complete_bookings_table.php`

#### 2. Migrasi Terkait Tabel Schedules (6 menjadi 1)
- `2025_09_14_051948_create_schedules_table.php`
- `2025_09_18_125822_add_weekly_schedule_fields_to_schedules_table.php`
- `2025_09_19_120433_fix_schedule_time_fields_to_datetime.php`
- `2025_09_19_221142_add_is_daily_to_schedules_table.php`
- `2025_09_29_000000_remove_weekly_schedule_fields_from_schedules_table.php`
- `2025_10_03_153354_fix_buses_table_add_year_column.php` (terkait jadwal)
- **Konsolidasi ke**: `2025_09_14_051948_create_complete_schedules_table.php`

#### 3. Migrasi Terkait Tabel Buses (3 menjadi 1)
- `2025_09_14_051939_create_buses_table.php`
- `2025_09_28_184944_add_year_and_fuel_type_to_buses_table.php`
- `2025_10_03_153719_fix_year_column_in_buses_table.php`
- **Konsolidasi ke**: `2025_09_14_051939_create_complete_buses_table.php`

#### 4. Migrasi Terkait Tabel Drivers (3 menjadi 1)
- `2025_09_14_052015_create_drivers_table.php`
- `2025_09_15_132741_add_employee_id_to_drivers_table.php`
- `2025_09_17_084715_ensure_unique_constraints_for_drivers.php`
- **Konsolidasi ke**: `2025_09_14_052015_create_complete_drivers_table.php`

#### 5. Migrasi Pivot dan Terkait Lainnya
- `2025_09_14_052414_create_bus_driver_table.php` & `2025_09_17_084044_add_unique_constraint_to_bus_driver_pivot_table.php` → `2025_09_14_052414_create_complete_bus_driver_table.php`
- `2025_09_15_130957_create_bus_conductor_table.php` & `2025_09_17_084047_add_unique_constraint_to_bus_conductor_pivot_table.php` → `2025_09_15_130957_create_complete_bus_conductor_table.php`
- `2025_09_18_132224_add_coordinates_to_routes_table.php` digabung ke `2025_09_14_051942_create_complete_routes_table.php`
- `2025_01_01_000001_add_phone_verification_to_users_table.php` digabung ke struktur users awal

### C. Hasil Konsolidasi

- **Total Migrasi Sebelum**: 43 file
- **Total Migrasi Sesudah**: 19 file
- **Pengurangan**: 24 file migrasi
- **Peningkatan**: Struktur database yang lebih konsisten dan logis

## Implementasi di Proyek Utama

### A. Prompt untuk Implementasi di Proyek Produksi

Untuk mengimplementasikan perubahan ini di proyek utama Tunggal Jaya Transport, ikuti langkah-langkah berikut:

```
1. Lakukan backup database production sebelum melanjutkan
2. Salin semua file migrasi yang dikonsolidasi dari proyek testing ke proyek production
3. Hapus semua file migrasi lama yang telah digantikan oleh migrasi konsolidasi
4. Pastikan urutan timestamp migrasi tetap logis dan konsisten
5. Jalankan perintah:
   php artisan migrate:status
6. Verifikasi bahwa semua migrasi lama tercatat sebagai "Ran" di tabel migrations
7. Jika tidak, lakukan penyesuaian manual di tabel migrations atau jalankan:
   php artisan migrate
8. Periksa kembali struktur tabel di database untuk memastikan integritas
9. Jalankan seeding untuk role, bus, rute, fasilitas, dan driver (jangan seed user admin)
   php artisan db:seed --class=RoleSeeder
   php artisan db:seed --class=BusSeeder
   php artisan db:seed --class=RouteSeeder
   php artisan db:seed --class=FacilitySeeder
   php artisan db:seed --class=DriverSeeder
10. Lakukan testing menyeluruh pada semua fitur aplikasi
```

### B. Validasi Setelah Implementasi

1. **Verifikasi Struktur Tabel**:
   - Tabel bookings: Harus memiliki semua kolom yang diperlukan termasuk booking_date, seat_numbers, number_of_seats, payment_started_at
   - Tabel schedules: Harus memiliki departure_time dan arrival_time sebagai datetime, serta is_daily field
   - Tabel buses: Harus memiliki year field
   - Tabel drivers: Harus memiliki employee_id field
   - Tabel routes: Harus memiliki kolom koordinat (origin_lat, origin_lng, destination_lat, destination_lng, waypoints)

2. **Uji Fungsi Aplikasi**:
   - Booking tiket
   - Login/logout pengguna
   - Pengecekan jadwal dan rute
   - Akses admin panel

3. **Verifikasi Session Handler**:
   - Cek apakah tabel sessions ada dan bisa diakses
   - Uji proses login untuk memastikan tidak muncul error session

### C. Troubleshooting Umum

Jika menemukan error `SQLSTATE[42S02]: Base table or view not found: 1146 Table 'database_name.sessions' doesn't exist`, lakukan:

```
php artisan migrate:fresh
```

Dan jalankan seeding sesuai kebutuhan (tanpa AdminUserSeeder).

### D. Rollback Plan untuk Konsolidasi Migrasi

Jika implementasi konsolidasi migrasi bermasalah:

1. **Kembalikan File Migrasi**:
   - Kembalikan semua file migrasi lama yang telah dihapus
   - Hapus file-file migrasi konsolidasi

2. **Perbaiki Tabel Migrations**:
   - Kembalikan catatan migrasi ke status sebelum konsolidasi
   - Jalankan `php artisan migrate:status` untuk verifikasi

3. **Uji Kembali Sistem**:
   - Pastikan semua fungsi aplikasi bekerja seperti sebelumnya
   - Jalankan migrasi secara normal jika diperlukan

## Manfaat dari Konsolidasi Migrasi

1. **Pemeliharaan Lebih Mudah**: Jumlah file migrasi berkurang signifikan
2. **Kurangi Konflik**: Mengurangi potensi konflik saat pengembangan tim
3. **Peningkatan Kinerja**: Proses migrasi lebih cepat karena jumlah file yang lebih sedikit
4. **Konsistensi Struktur**: Database memiliki struktur yang lebih konsisten sejak awal
5. **Proses Deployment Lebih Cepat**: Migrasi awal di lingkungan baru lebih cepat

## Integrasi dengan Fitur yang Ada

Konsolidasi migrasi ini tidak mengubah struktur data atau fitur yang ada, hanya menggabungkan perubahan-perubahan kecil yang terpisah menjadi satu migrasi utuh per tabel. Semua model dan fitur aplikasi tetap sama:

- Model Booking, Schedule, Bus, Driver, Route tetap memiliki struktur yang sama
- Relasi antar model tetap terjaga
- Fungsi-fungsi business logic tetap berjalan dengan normal
- API dan antarmuka pengguna tidak terpengaruh

## Evaluasi dan Pengembangan Berkelanjutan

Implementasi konsolidasi migrasi ini akan memudahkan pengembangan fitur-fitur baru karena struktur database yang lebih terorganisasi. Evaluasi harus dilakukan untuk memastikan:

1. Semua fitur aplikasi berjalan dengan normal
2. Tidak ada konflik data atau integritas database
3. Kinerja aplikasi tidak menurun
4. Proses deployment ke berbagai lingkungan (development, staging, production) berjalan lancar

## Catatan Khusus

- Konsolidasi ini seharusnya dilakukan sekali saja pada awal proyek untuk menghindari masalah dengan data produksi
- Jika proyek sudah memiliki data produksi penting, konsultasikan dengan tim sebelum melanjutkan
- Simpan backup database sebelum dan sesudah implementasi
- Uji secara menyeluruh sebelum menerapkan ke lingkungan produksi

## Qwen Added Memories
- Successfully implemented customer information fields (name, phone number, and occupation) to both cash and credit transaction forms. Added database migration, updated models, controllers, views, and added manual transaction creation capability in the admin panel.
- Added customer_name, customer_phone, and customer_occupation fields to the transactions table via migration
- Updated Transaction model to include new fields in fillable array
- Modified cash_order_form.blade.php and credit_order_form.blade.php to include required customer information fields
- Updated MotorGalleryController to process the new customer information fields during transaction creation
- Enhanced admin panel views (index, show, create, edit) to display, create and edit customer information
- Added "Buat Transaksi Baru" button in admin transactions index page for manual transaction creation
- Updated order confirmation and user transactions pages to display customer information
- These changes ensure complete customer information is available for both cash and credit transactions in the admin panel
- Soon there will be updates to the PDF reports as well, in addition to the invoice improvements

## ERD (Entity Relationship Diagram) Summary

### Database Tables and Attributes

#### 1. users table
- **Primary Key**: id (integer, auto-increment)
- **Attributes**:
  - name (string)
  - email (string, unique)
  - email_verified_at (timestamp, nullable)
  - password (string)
  - remember_token (string, nullable)
  - role (string, default: 'user') - values: 'user', 'admin'
  - created_at (timestamp)
  - updated_at (timestamp)

#### 2. motors table
- **Primary Key**: id (integer, auto-increment)
- **Attributes**:
  - name (string)
  - brand (string) - values: 'Honda', 'Yamaha'
  - model (string, nullable)
  - price (decimal, 10,2)
  - year (integer, nullable)
  - type (string, nullable) - values: 'Metic', 'Automatic', 'Sport', etc.
  - image_path (string)
  - details (text, nullable)
  - tersedia (boolean, default: true)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 3. motor_specifications table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Key**: motor_id (references motors.id with cascade delete)
- **Attributes**:
  - spec_key (string)
  - spec_value (text, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 4. contact_messages table
- **Primary Key**: id (integer, auto-increment)
- **Attributes**:
  - name (string)
  - email (string)
  - subject (string)
  - message (text)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 5. transactions table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Keys**:
  - user_id (references users.id with cascade delete)
  - motor_id (references motors.id with cascade delete)
- **Attributes**:
  - transaction_type (enum) - values: 'CASH', 'CREDIT'
  - status (enum) - values: 'new_order', 'waiting_payment', 'payment_confirmed', 'unit_preparation', 'ready_for_delivery', 'completed', 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak'
  - notes (text, nullable)
  - booking_fee (decimal, 10,2, nullable) - for cash transactions
  - total_amount (decimal, 10,2)
  - payment_method (string, nullable)
  - payment_status (enum) - values: 'pending', 'confirmed', 'failed' (default: 'pending')
  - customer_name (string, nullable)
  - customer_phone (string, nullable)
  - customer_occupation (string, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 6. credit_details table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Key**: transaction_id (references transactions.id with cascade delete, unique)
- **Attributes**:
  - down_payment (decimal, 10,2)
  - tenor (integer) - in months
  - monthly_installment (decimal, 10,2)
  - credit_status (enum) - values: 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak' (default: 'menunggu_persetujuan')
  - approved_amount (decimal, 10,2, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 7. documents table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Key**: credit_detail_id (references credit_details.id with cascade delete)
- **Attributes**:
  - document_type (enum) - values: 'KTP', 'KK', 'SLIP_GAJI', 'BPKB', 'STNK', 'FAKTUR', 'LAINNYA'
  - file_path (string)
  - original_name (string)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 8. notifications table
- **Primary Key**: id (uuid)
- **Attributes**:
  - type (string)
  - notifiable_type (morphs - polymorphic relation)
  - notifiable_id (morphs - polymorphic relation)
  - data (text)
  - read_at (timestamp, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

### Relationships

#### 1. One-to-Many Relationships
- **User has many Transactions**: users.id → transactions.user_id
- **Motor has many Transactions**: motors.id → transactions.motor_id
- **Motor has many Motor Specifications**: motors.id → motor_specifications.motor_id
- **Credit Detail has many Documents**: credit_details.id → documents.credit_detail_id

#### 2. One-to-One Relationship
- **Transaction has one Credit Detail**: transactions.id → credit_details.transaction_id (with unique constraint)

#### 3. Polymorphic Relationship
- **Notifications**: The notifications table has a polymorphic relationship with multiple models using notifiable_type and notifiable_id columns

### ERD Diagram Description

```
[users] 1------N [transactions] 1------1 [credit_details] 1------N [documents]
  |                                        |
  |                                        |
  1------N [motor_specifications]    1------N [motors] 1------N [transactions]
  
[contact_messages] (independent table)
[notifications] (polymorphic relationship)
```

The database structure supports a complete motorcycle sales system with both cash and credit (installment) transactions, with proper user authentication and motor management capabilities.
