@php
use Illuminate\Support\Str;
@endphp

@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Admin Dashboard</h1>
            <p class="text-muted mb-0 d-md-none d-block">Welcome back, {{ Auth::user()->name }}!</p>
        </div>
        <div class="text-md-end text-center w-100 w-md-auto">
            <p class="mb-0">Last updated: <span class="text-muted">{{ now()->format('M d, Y H:i') }}</span></p>
        </div>
    </div>
    
    <!-- Stats -->
    <div class="row mb-4 g-3">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-primary text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Motors</h6>
                            <h3 class="card-title mb-0">{{ $motorsCount }}</h3>
                        </div>
                        <div class="bg-primary bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-motorcycle fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-light btn-sm mt-3">Manage Motors</a>
                </div>
            </div>
        </div>
        
        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-success text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Messages</h6>
                            <h3 class="card-title mb-0">{{ $contactMessagesCount }}</h3>
                        </div>
                        <div class="bg-success bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-envelope fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.contact.index') }}" class="btn btn-outline-light btn-sm mt-3">View Messages</a>
                </div>
            </div>
        </div>
        
        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-info text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Users</h6>
                            <h3 class="card-title mb-0">{{ $usersCount ?? \App\Models\User::count() }}</h3>
                        </div>
                        <div class="bg-info bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-users fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.users.index') }}" class="btn btn-outline-light btn-sm mt-3">Manage Users</a>
                </div>
            </div>
        </div>
        
        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-warning text-dark h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Admins</h6>
                            <h3 class="card-title mb-0">{{ \App\Models\User::where('role', 'admin')->count() }}</h3>
                        </div>
                        <div class="bg-warning bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-user-shield fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.users.index') }}" class="btn btn-outline-dark btn-sm mt-3">Manage Admins</a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Items -->
    <div class="row g-4">
        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-motorcycle me-2 text-primary"></i>Recent Motors</h5>
                </div>
                <div class="card-body p-0">
                    @if($recentMotors->count() > 0)
                        <div class="list-group list-group-flush">
                            @foreach($recentMotors as $motor)
                                <a href="{{ route('admin.motors.show', $motor) }}" class="list-group-item list-group-item-action">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-shrink-0 me-3">
                                            <img src="{{ $motor->image_path ? asset('storage/' . $motor->image_path) : asset('assets/icon/logo trans.png') }}" 
                                                 alt="{{ $motor->name }}" 
                                                 class="rounded" 
                                                 style="width: 50px; height: 50px; object-fit: cover;">
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex justify-content-between">
                                                <h6 class="mb-1">{{ Str::limit($motor->name, 20) }}</h6>
                                                <small class="text-muted d-md-none d-block">{{ $motor->created_at->diffForHumans() }}</small>
                                            </div>
                                            <p class="mb-0 text-muted">Rp {{ number_format($motor->price, 0, ',', '.') }}</p>
                                            <small class="text-muted d-none d-md-block">{{ $motor->created_at->diffForHumans() }}</small>
                                        </div>
                                    </div>
                                </a>
                            @endforeach
                        </div>
                    @else
                        <div class="p-3 text-center text-muted">No motors found</div>
                    @endif
                </div>
            </div>
        </div>
        
        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-envelope me-2 text-success"></i>Recent Messages</h5>
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
        
        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-users me-2 text-info"></i>Recent Users</h5>
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