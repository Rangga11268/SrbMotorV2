@extends('layouts.app')

@section('title', 'Edit Profil')

@section('content')
<div class="profile-container">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="profile-card">
                    <div class="profile-header">
                        <h3><i class="fas fa-user-edit me-2"></i> Edit Profil</h3>
                        <p class="mb-0">Kelola informasi profil dan keamanan akun Anda</p>
                    </div>

                    <div class="profile-body">
                        @if(session('success'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="fas fa-check-circle me-2"></i> {{ session('success') }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                        @endif

                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="profile-tab" data-bs-toggle="tab"
                                    data-bs-target="#profile" type="button" role="tab">
                                    <i class="fas fa-user me-2"></i> Informasi Profil
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="password-tab" data-bs-toggle="tab"
                                    data-bs-target="#password" type="button" role="tab">
                                    <i class="fas fa-lock me-2"></i> Ubah Password
                                </button>
                            </li>
                        </ul>

                        <div class="tab-content mt-4">
                            <!-- Profile Information Tab -->
                            <div class="tab-pane fade show active" id="profile" role="tabpanel">
                                <form method="POST" action="{{ route('profile.update') }}">
                                    @csrf
                                    @method('PUT')

                                    <div class="mb-4">
                                        <label for="name" class="form-label">Nama Lengkap</label>
                                        <input type="text" class="form-control @error('name') is-invalid @enderror"
                                            id="name" name="name" value="{{ old('name', $user->name) }}" required>
                                        @error('name')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="mb-4">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control @error('email') is-invalid @enderror"
                                            id="email" name="email" value="{{ old('email', $user->email) }}" required>
                                        @error('email')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="d-flex gap-2">
                                        <button type="submit" class="btn btn-save">
                                            <i class="fas fa-save me-2"></i> Simpan Perubahan
                                        </button>
                                        <a href="{{ route('profile.show') }}" class="btn btn-cancel">
                                            <i class="fas fa-times me-2"></i> Batal
                                        </a>
                                    </div>
                                </form>
                            </div>

                            <!-- Change Password Tab -->
                            <div class="tab-pane fade" id="password" role="tabpanel">
                                <form method="POST" action="{{ route('profile.password.update') }}">
                                    @csrf
                                    @method('PUT')

                                    <div class="mb-4">
                                        <label for="current_password" class="form-label">Password Saat Ini</label>
                                        <div class="position-relative">
                                            <input type="password" class="form-control @error('current_password') is-invalid @enderror"
                                                id="current_password" name="current_password" required>
                                            <span class="password-toggle" onclick="togglePassword('current_password', 'toggleCurrentIcon')">
                                                <i id="toggleCurrentIcon" class="fas fa-eye"></i>
                                            </span>
                                        </div>
                                        @error('current_password')
                                        <div class="text-danger mt-1"><small>{{ $message }}</small></div>
                                        @enderror
                                    </div>

                                    <div class="mb-4">
                                        <label for="password" class="form-label">Password Baru</label>
                                        <div class="position-relative">
                                            <input type="password" class="form-control @error('password') is-invalid @enderror"
                                                id="password" name="password" required>
                                            <span class="password-toggle" onclick="togglePassword('password', 'toggleNewIcon')">
                                                <i id="toggleNewIcon" class="fas fa-eye"></i>
                                            </span>
                                        </div>
                                        @error('password')
                                        <div class="text-danger mt-1"><small>{{ $message }}</small></div>
                                        @enderror
                                        <small class="text-muted">Minimal 8 karakter</small>
                                    </div>

                                    <div class="mb-4">
                                        <label for="password_confirmation" class="form-label">Konfirmasi Password Baru</label>
                                        <div class="position-relative">
                                            <input type="password" class="form-control"
                                                id="password_confirmation" name="password_confirmation" required>
                                            <span class="password-toggle" onclick="togglePassword('password_confirmation', 'toggleConfirmIcon')">
                                                <i id="toggleConfirmIcon" class="fas fa-eye"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="d-flex gap-2">
                                        <button type="submit" class="btn btn-save">
                                            <i class="fas fa-key me-2"></i> Ubah Password
                                        </button>
                                        <a href="{{ route('profile.show') }}" class="btn btn-cancel">
                                            <i class="fas fa-times me-2"></i> Batal
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
</script>
@endsection