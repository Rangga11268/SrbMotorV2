<!DOCTYPE html>
<html lang="id" data-bs-theme="light">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin SRB Motors - @yield('title', 'Dasbor')</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">

    @vite(['resources/css/admin.css'])

    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset('assets/icon/logo trans.png') }}" type="image/x-icon">

    <!-- Set theme immediately to prevent flash -->
    <script>
        // Apply theme immediately to prevent flash of unstyled content
        (function() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-bs-theme', savedTheme);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
            }
        })();
    </script>

    @yield('styles')
</head>

<body>
    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Sidebar -->
    <div class="admin-sidebar" id="adminSidebar">
        <div class="sidebar-header">
            <img src="{{ asset('assets/icon/logo trans.png') }}" alt="Logo SRB Motors">
            <h4>SRB Admin</h4>
        </div>

        <ul class="nav flex-column sidebar-nav">
            <li class="nav-item">
                <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dasbor</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->routeIs('admin.motors.*') ? 'active' : '' }}" href="{{ route('admin.motors.index') }}">
                    <i class="fas fa-motorcycle"></i>
                    <span>Motor</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->routeIs('admin.transactions.*') ? 'active' : '' }}" href="{{ route('admin.transactions.index') }}">
                    <i class="fas fa-file-invoice"></i>
                    <span>Transaksi</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->routeIs('admin.reports.*') ? 'active' : '' }}" href="{{ route('admin.reports.index') }}">
                    <i class="fas fa-chart-bar"></i>
                    <span>Laporan</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->routeIs('admin.contact.*') ? 'active' : '' }}" href="{{ route('admin.contact.index') }}">
                    <i class="fas fa-envelope"></i>
                    <span>Pesan Kontak</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}" href="{{ route('admin.users.index') }}">
                    <i class="fas fa-users"></i>
                    <span>Pengguna</span>
                </a>
            </li>
        </ul>
    </div>

    <!-- Main Content -->
    <div class="admin-content" id="adminContent">
        <!-- Top Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light admin-navbar">
            <div class="container-fluid">
                <button class="btn btn-outline-secondary me-3 d-lg-none" id="sidebarToggle">
                    <i class="fas fa-bars"></i>
                </button>

                <div class="navbar-nav ms-auto d-flex align-items-center">
                    <div class="nav-item dropdown me-3">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-moon me-2"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#" onclick="setTheme('light')"><i class="fas fa-sun me-2"></i>Light Mode</a></li>
                            <li><a class="dropdown-item" href="#" onclick="setTheme('dark')"><i class="fas fa-moon me-2"></i>Dark Mode</a></li>
                            <li><a class="dropdown-item" href="#" onclick="setTheme('auto')"><i class="fas fa-adjust me-2"></i>Auto Mode</a></li>
                        </ul>
                    </div>
                    <div class="nav-item dropdown navbar-user">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user me-2"></i>{{ Auth::user()->name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="{{ route('admin.profile.show') }}">
                                    <i class="fas fa-user-circle me-2"></i>Profil Saya
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="{{ url('/') }}">
                                    <i class="fas fa-globe me-2"></i>Lihat Website
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <i class="fas fa-sign-out-alt me-2"></i>Keluar
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
            </div>
        </nav>

        <!-- Breadcrumb -->
        <div class="container-fluid px-4">
            <nav class="admin-breadcrumb" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Home</a></li>
                    @yield('breadcrumb')
                    <li class="breadcrumb-item active" aria-current="page">@yield('title', 'Dasbor')</li>
                </ol>
            </nav>
        </div>

        <!-- Page Content -->
        <main class="py-3 py-md-4">
            @yield('content')
        </main>
    </div>

    <!-- Include jQuery and SweetAlert2 from local files -->
    <script src="{{ asset('sweetalert/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('sweetalert/sweetalert2.all.min.js') }}"></script>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

    @vite(['resources/js/app.js'])

    <!-- Admin JavaScript -->
    <script>
        // Theme management
        function setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.documentElement.setAttribute('data-bs-theme', themeName);

            // Update the theme immediately for this page
            document.documentElement.setAttribute('data-bs-theme', themeName);
        }

        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('adminSidebar');
            const content = document.getElementById('adminContent');
            const sidebarToggle = document.getElementById('sidebarToggle');
            const sidebarOverlay = document.getElementById('sidebarOverlay');

            // Toggle sidebar
            function toggleSidebar() {
                sidebar.classList.toggle('collapsed');
                content.classList.toggle('sidebar-collapsed');
            }

            // Mobile sidebar toggle
            function toggleMobileSidebar() {
                sidebar.classList.toggle('open');
                sidebarOverlay.classList.toggle('open');
            }

            // Event listeners for sidebar toggle
            sidebarToggle.addEventListener('click', function(e) {
                e.preventDefault();

                // Check if we're on mobile view
                if (window.innerWidth < 992) {
                    toggleMobileSidebar();
                } else {
                    toggleSidebar();
                }
            });

            // Close sidebar when overlay is clicked on mobile
            sidebarOverlay.addEventListener('click', toggleMobileSidebar);

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(event) {
                if (window.innerWidth < 992 &&
                    !sidebar.contains(event.target) &&
                    !sidebarToggle.contains(event.target) &&
                    sidebar.classList.contains('open')) {
                    toggleMobileSidebar();
                }
            });

            // Handle window resize to adjust sidebar
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 992) {
                    sidebar.classList.remove('open');
                    sidebarOverlay.classList.remove('open');
                }
            });
        });
    </script>

    @yield('scripts')

    <!-- Show success/error messages as SweetAlert2 notifications -->
    @if(session('success'))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                title: 'Berhasil!',
                text: '{{ session('
                success ') }}',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        });
    </script>
    @endif

    @if(session('error'))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                title: 'Kesalahan!',
                text: '{{ session('
                error ') }}',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Tutup'
            });
        });
    </script>
    @endif

    <!-- Show validation errors as SweetAlert2 notifications -->
    @if($errors->any())
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let errorMessages = '';
            @foreach($errors -> all() as $error)
            errorMessages += '{{ $error }}<br>';
            @endforeach

            Swal.fire({
                title: 'Kesalahan Validasi!',
                html: errorMessages,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Tutup'
            });
        });
    </script>
    @endif

    <!-- Global SweetAlert2 Delete Confirmation -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Handle delete confirmations globally
            document.body.addEventListener('click', function(e) {
                // Check if the clicked element or its parent is a delete button
                const deleteBtn = e.target.closest('.delete-btn') || e.target.closest('.delete-user-btn') || e.target.closest('.delete-contact-btn');

                if (deleteBtn) {
                    e.preventDefault();

                    // Find the form
                    const form = deleteBtn.closest('form');

                    if (form) {
                        Swal.fire({
                            title: 'Apakah Anda yakin?',
                            text: "Data ini akan dihapus secara permanen!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ya, hapus!',
                            cancelButtonText: 'Batal'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.submit();
                            }
                        });
                    }
                }
            });
        });
    </script>