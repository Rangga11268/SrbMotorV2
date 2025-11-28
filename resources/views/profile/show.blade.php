@extends('layouts.app')

@section('title', 'Profil Saya')

@section('content')
<div class="profile-container">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="profile-card">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <h3>{{ $user->name }}</h3>
                        <p>{{ $user->email }}</p>
                    </div>

                    <div class="profile-body">
                        <div class="info-group">
                            <div class="info-label">
                                <i class="fas fa-user-circle"></i> Nama Lengkap
                            </div>
                            <div class="info-value">{{ $user->name }}</div>
                        </div>

                        <div class="info-group">
                            <div class="info-label">
                                <i class="fas fa-envelope"></i> Email
                            </div>
                            <div class="info-value">{{ $user->email }}</div>
                        </div>

                        <div class="info-group">
                            <div class="info-label">
                                <i class="fas fa-shield-alt"></i> Role
                            </div>
                            <div class="info-value">
                                <span class="badge-role {{ $user->isAdmin() ? 'badge-admin' : 'badge-user' }}">
                                    {{ $user->isAdmin() ? 'Administrator' : 'Pengguna' }}
                                </span>
                            </div>
                        </div>

                        <div class="info-group">
                            <div class="info-label">
                                <i class="fas fa-calendar-alt"></i> Bergabung Sejak
                            </div>
                            <div class="info-value">{{ $user->created_at->format('d F Y') }}</div>
                        </div>

                        <div class="text-center mt-4">
                            <a href="{{ route('profile.edit') }}" class="btn btn-edit">
                                <i class="fas fa-edit me-2"></i> Edit Profil
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection