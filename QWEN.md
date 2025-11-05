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