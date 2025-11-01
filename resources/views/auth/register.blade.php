@extends('layouts.app')

@section('title', 'Register')

@section('styles')
<style>
    /* Add space for fixed navbar */
    body {
        padding-top: 120px; /* Adjusted to better match the homepage navbar height */
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
    }
    
    .auth-container {
        min-height: calc(100vh - 120px); /* Adjust based on navbar height */
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        position: relative;
        overflow: hidden;
    }
    
    .auth-container::before {
        content: "";
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(74, 144, 226, 0.1) 0%, transparent 70%);
        z-index: 0;
    }
    
    .auth-card {
        border: none;
        border-radius: 1.5rem;
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);
        overflow: hidden;
        width: 100%;
        max-width: 450px;
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transform: translateY(0);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    
    .auth-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
    }
    
    .auth-header {
        background: linear-gradient(135deg, var(--dark-blue) 0%, var(--primary) 100%);
        color: white;
        padding: 3rem 1.5rem 2.5rem; /* Increased padding to accommodate logo */
        text-align: center;
        position: relative;
        overflow: visible; /* Allow logo to overflow */
    }
    
    .auth-header::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
        top: -50%;
        left: -50%;
        z-index: 0;
    }
    
    .logo-container {
        position: absolute;
        top: 10px; /* Positioned closer to the top */
        left: 50%;
        transform: translateX(-50%);
        width: 90px;
        height: 90px;
        background: white;
        border-radius: 50%;
        padding: 8px;
        box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.3);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }
    
    .logo-container:hover {
        transform: translateX(-50%) scale(1.05);
    }
    
    .logo {
        width: 74px;
        height: 74px;
        object-fit: contain;
        border-radius: 50%;
    }
    
    .auth-header {
        background: linear-gradient(135deg, var(--dark-blue) 0%, var(--primary) 100%);
        color: white;
        padding: 80px 1.5rem 2.5rem; /* Increased top padding to create more space */
        text-align: center;
        position: relative;
        overflow: visible;
    }
    
    .auth-header h3 {
        font-weight: 600;
        margin: 20px 0 8px 0; /* Increased margin to create more space from logo */
        font-size: 1.8rem;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .auth-header p {
        margin-bottom: 0;
        opacity: 0.9;
        position: relative;
        z-index: 1;
        font-size: 1.05rem;
    }
    
    .auth-body {
        padding: 2.5rem;
    }
    
    .form-label {
        font-weight: 500;
        color: var(--dark-blue);
        margin-bottom: 0.5rem;
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .form-label::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 20px;
        background: linear-gradient(to bottom, var(--primary), var(--dark-blue));
        border-radius: 2px;
    }
    
    .form-control {
        border: 1px solid #e1e5eb;
        border-radius: 0.75rem;
        padding: 0.85rem 1.1rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
        position: relative;
        z-index: 1;
    }
    
    .form-control:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
    }
    
    .form-control::placeholder {
        color: #a0aec0;
        opacity: 0.8;
    }
    
    .btn-auth {
        background: linear-gradient(135deg, var(--dark-blue) 0%, var(--primary) 100%);
        border: none;
        color: white;
        padding: 0.9rem;
        font-weight: 500;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
        font-size: 1.1rem;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    
    .btn-auth::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: 0.5s;
        z-index: -1;
    }
    
    .btn-auth:hover::before {
        left: 100%;
    }
    
    .btn-auth:hover {
        background: linear-gradient(135deg, #032a60 0%, #3a7bc8 100%);
        transform: translateY(-3px);
        box-shadow: 0 0.6rem 1.5rem rgba(4, 54, 128, 0.3);
    }
    
    .btn-auth:active {
        transform: translateY(-1px);
    }
    
    .auth-footer {
        text-align: center;
        padding-top: 1.8rem;
        border-top: 1px solid rgba(74, 144, 226, 0.15);
        margin-top: 1.5rem;
        position: relative;
    }
    
    .auth-footer::before {
        content: "";
        position: absolute;
        top: -1px;
        left: 30%;
        right: 30%;
        height: 1px;
        background: linear-gradient(to right, transparent, var(--primary), transparent);
    }
    
    .btn-link {
        color: var(--primary);
        font-weight: 500;
        position: relative;
        transition: all 0.3s ease;
    }
    
    .btn-link::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary);
        transition: width 0.3s ease;
    }
    
    .btn-link:hover {
        color: var(--dark-blue);
        text-decoration: none;
        transform: translateX(5px);
    }
    
    .btn-link:hover::after {
        width: 100%;
    }
    
    .input-group {
        position: relative;
    }
    
    .password-toggle {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #6c757d;
        z-index: 5;
        background: transparent;
        padding: 0.3rem;
        border-radius: 0.25rem;
        transition: all 0.3s ease;
    }
    
    .password-toggle:hover {
        color: var(--primary);
        transform: translateY(-50%) scale(1.1);
        background: rgba(255, 255, 255, 0.8);
    }
    
    .error-message {
        color: #e53e3e;
        font-size: 0.875em;
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
        padding: 0.4rem 0.8rem;
        background: rgba(229, 62, 62, 0.1);
        border-radius: 0.375rem;
        border-left: 3px solid #e53e3e;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% {transform: translateX(0);}
        20%, 60% {transform: translateX(-3px);}
        40%, 80% {transform: translateX(3px);}
    }
    
    .error-message i {
        margin-right: 0.4rem;
        font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
        body {
            padding-top: 100px; /* Adjusted mobile padding to match desktop ratio */
        }
        
        .auth-container {
            min-height: calc(100vh - 100px);
            padding: 1rem;
        }
        
        .logo-container {
            width: 80px;
            height: 80px;
            top: 5px; /* Positioned closer to the top for mobile */
        }
        
        .logo {
            width: 64px;
            height: 64px;
        }
        
        .auth-header {
            padding: 75px 1.5rem 2.5rem; /* Increased padding for mobile to create space */
        }
        
        .auth-header h3 {
            font-size: 1.6rem;
            margin: 15px 0 8px 0; /* Increased margin for mobile */
        }
        
        .auth-body {
            padding: 2rem;
        }
    }
</style>
@endsection

@section('content')
<div class="auth-container">
    <div class="auth-card">
        <div class="auth-header">
            <div class="logo-container">
                <img src="{{ asset('assets/icon/logo trans.png') }}" alt="Logo SRB Motors" class="logo">
            </div>
            <h3>Buat Akun</h3>
            <p class="mb-0">Bergabunglah dengan kami hari ini untuk pengalaman sepeda motor terbaik</p>
        </div>
        
        <div class="auth-body">
            <form method="POST" action="{{ route('register') }}" id="registrationForm">
                @csrf

                <div class="mb-4">
                    <label for="name" class="form-label">Nama Lengkap</label>
                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" 
                           name="name" value="{{ old('name') }}" required autocomplete="name" autofocus
                           autocapitalize="none" placeholder="Masukkan nama lengkap Anda">
                    
                    @error('name')
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i> {{ $message }}
                        </div>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="email" class="form-label">Alamat Email</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" 
                           name="email" value="{{ old('email') }}" required autocomplete="email"
                           autocapitalize="none" placeholder="Masukkan alamat email Anda">
                    
                    @error('email')
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i> {{ $message }}
                        </div>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="password" class="form-label">Kata Sandi</label>
                    <div class="input-group">
                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" 
                               name="password" required autocomplete="new-password"
                               autocapitalize="none" placeholder="Buat kata sandi">
                        <span class="password-toggle" onclick="togglePassword('password', 'togglePasswordIcon')">
                            <i id="togglePasswordIcon" class="fas fa-eye"></i>
                        </span>
                    </div>
                    
                    @error('password')
                        <div class="error-message mt-1">
                            <i class="fas fa-exclamation-circle"></i> {{ $message }}
                        </div>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="password-confirm" class="form-label">Konfirmasi Kata Sandi</label>
                    <div class="input-group">
                        <input id="password-confirm" type="password" class="form-control" 
                               name="password_confirmation" required autocomplete="new-password"
                               autocapitalize="none" placeholder="Konfirmasi kata sandi Anda">
                        <span class="password-toggle" onclick="togglePassword('password-confirm', 'toggleConfirmPasswordIcon')">
                            <i id="toggleConfirmPasswordIcon" class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>

                <div class="d-grid mb-3">
                    <button type="submit" class="btn btn-auth btn-lg">
                        Buat Akun
                    </button>
                </div>
                
                <div class="auth-footer">
                    <p class="mb-0">Sudah punya akun? <a href="{{ route('login') }}" class="btn-link">Masuk di sini</a></p>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    function togglePassword(fieldId, iconId) {
        const passwordField = document.getElementById(fieldId);
        const icon = document.getElementById(iconId);
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Add focus effects to form controls
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Show error messages with SweetAlert2 if any
    @if($errors->any())
        Swal.fire({
            title: 'Kesalahan!',
            text: 'Mohon periksa kembali inputan Anda. Ada {{ $errors->count() }} masalah yang ditemukan.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545'
        });
    @endif
</script>
@endsection