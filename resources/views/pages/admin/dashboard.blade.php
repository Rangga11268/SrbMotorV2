@php
use Illuminate\Support\Str;
@endphp

@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="mb-0" style="color: #043680;">Admin Dashboard</h1>
        <div class="text-muted">Welcome back, {{ Auth::user()->name }}!</div>
    </div>
    
    <!-- Stats -->
    <div class="row mb-4">
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card border-0 shadow-sm h-100" style="background-color: #f8f9fa;">
                <div class="card-body text-center">
                    <div class="d-flex align-items-center mb-2" style="color: #043680;">
                        <i class="fas fa-motorcycle fa-2x me-2"></i>
                        <h5 class="card-title mb-0">Motors</h5>
                    </div>
                    <h2 class="text-primary mb-0">{{ $motorsCount }}</h2>
                    <a href="{{ route('admin.motors.index') }}" class="btn btn-sm mt-2" style="background-color: #d6eaf8; color: #043680; border: none;">Manage</a>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card border-0 shadow-sm h-100" style="background-color: #f8f9fa;">
                <div class="card-body text-center">
                    <div class="d-flex align-items-center mb-2" style="color: #043680;">
                        <i class="fas fa-envelope fa-2x me-2"></i>
                        <h5 class="card-title mb-0">Messages</h5>
                    </div>
                    <h2 class="text-primary mb-0">{{ $contactMessagesCount }}</h2>
                    <a href="{{ route('admin.contact.index') }}" class="btn btn-sm mt-2" style="background-color: #d6eaf8; color: #043680; border: none;">View</a>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card border-0 shadow-sm h-100" style="background-color: #f8f9fa;">
                <div class="card-body text-center">
                    <div class="d-flex align-items-center mb-2" style="color: #043680;">
                        <i class="fas fa-users fa-2x me-2"></i>
                        <h5 class="card-title mb-0">Users</h5>
                    </div>
                    <h2 class="text-primary mb-0">{{ $usersCount ?? \App\Models\User::count() }}</h2>
                    <a href="{{ route('admin.users.index') }}" class="btn btn-sm mt-2" style="background-color: #d6eaf8; color: #043680; border: none;">Manage</a>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card border-0 shadow-sm h-100" style="background-color: #f8f9fa;">
                <div class="card-body text-center">
                    <div class="d-flex align-items-center mb-2" style="color: #043680;">
                        <i class="fas fa-user-shield fa-2x me-2"></i>
                        <h5 class="card-title mb-0">Admins</h5>
                    </div>
                    <h2 class="text-primary mb-0">{{ \App\Models\User::where('role', 'admin')->count() }}</h2>
                    <a href="{{ route('admin.users.index') }}" class="btn btn-sm mt-2" style="background-color: #d6eaf8; color: #043680; border: none;">Manage</a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Items -->
    <div class="row">
        <div class="col-lg-4 mb-4">
            <div class="card border-0 shadow-sm">
                <div class="card-header" style="background: #043680; color: white; border: none;">
                    <h5 class="card-title mb-0"><i class="fas fa-motorcycle me-2"></i>Recent Motors</h5>
                </div>
                <div class="card-body p-0">
                    @if($recentMotors->count() > 0)
                        <div class="list-group list-group-flush">
                            @foreach($recentMotors as $motor)
                                <a href="{{ route('admin.motors.show', $motor) }}" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">{{ Str::limit($motor->name, 20) }}</h6>
                                        <small class="text-muted">{{ $motor->created_at->diffForHumans() }}</small>
                                    </div>
                                    <p class="mb-1 text-muted">Rp {{ number_format($motor->price, 0, ',', '.') }}</p>
                                </a>
                            @endforeach
                        </div>
                    @else
                        <div class="p-3 text-center text-muted">No motors found</div>
                    @endif
                </div>
            </div>
        </div>
        
        <div class="col-lg-4 mb-4">
            <div class="card border-0 shadow-sm">
                <div class="card-header" style="background: #043680; color: white; border: none;">
                    <h5 class="card-title mb-0"><i class="fas fa-envelope me-2"></i>Recent Messages</h5>
                </div>
                <div class="card-body p-0">
                    @if($recentContactMessages->count() > 0)
                        <div class="list-group list-group-flush">
                            @foreach($recentContactMessages as $message)
                                <a href="{{ route('admin.contact.show', $message) }}" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">{{ Str::limit($message->name, 15) }}</h6>
                                        <small class="text-muted">{{ $message->created_at->diffForHumans() }}</small>
                                    </div>
                                    <p class="mb-1 text-muted">{{ Str::limit($message->subject, 25) }}</p>
                                </a>
                            @endforeach
                        </div>
                    @else
                        <div class="p-3 text-center text-muted">No messages found</div>
                    @endif
                </div>
            </div>
        </div>
        
        <div class="col-lg-4 mb-4">
            <div class="card border-0 shadow-sm">
                <div class="card-header" style="background: #043680; color: white; border: none;">
                    <h5 class="card-title mb-0"><i class="fas fa-users me-2"></i>Recent Users</h5>
                </div>
                <div class="card-body p-0">
                    @if($recentUsers->count() > 0)
                        <div class="list-group list-group-flush">
                            @foreach($recentUsers as $user)
                                <div class="list-group-item">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">{{ $user->name }}</h6>
                                        <small class="text-muted">{{ $user->created_at->diffForHumans() }}</small>
                                    </div>
                                    <p class="mb-1 text-muted">{{ $user->email }}</p>
                                    <span class="badge rounded-pill bg-{{ $user->role === 'admin' ? 'danger' : 'secondary' }}">{{ ucfirst($user->role) }}</span>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="p-3 text-center text-muted">No users found</div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection