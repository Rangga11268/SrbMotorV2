@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-5">Admin Dashboard</h1>
    
    <!-- Stats -->
    <div class="row mb-5">
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <h5 class="card-title">Total Motors</h5>
                    <h2>{{ $motorsCount }}</h2>
                    <a href="{{ route('admin.motors.index') }}" class="text-white">Manage Motors &rarr;</a>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-success">
                <div class="card-body">
                    <h5 class="card-title">Contact Messages</h5>
                    <h2>{{ $contactMessagesCount }}</h2>
                    <a href="{{ route('admin.contact.index') }}" class="text-white">View Messages &rarr;</a>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-info">
                <div class="card-body">
                    <h5 class="card-title">Total Users</h5>
                    <h2>{{ $usersCount ?? \App\Models\User::count() }}</h2>
                    <a href="{{ route('admin.users.index') }}" class="text-white">Manage Users &rarr;</a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Items -->
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5>Recent Motors</h5>
                </div>
                <div class="card-body">
                    @if($recentMotors->count() > 0)
                        <ul class="list-group">
                            @foreach($recentMotors as $motor)
                                <li class="list-group-item">
                                    <a href="{{ route('admin.motors.show', $motor) }}">{{ $motor->name }}</a>
                                    <small class="text-muted float-end">{{ $motor->created_at->format('M d, Y') }}</small>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <p>No motors found.</p>
                    @endif
                </div>
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5>Recent Contact Messages</h5>
                </div>
                <div class="card-body">
                    @if($recentContactMessages->count() > 0)
                        <ul class="list-group">
                            @foreach($recentContactMessages as $message)
                                <li class="list-group-item">
                                    <strong>{{ $message->name }}</strong> - {{ $message->subject }}
                                    <small class="text-muted float-end">{{ $message->created_at->format('M d, Y') }}</small>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <p>No contact messages found.</p>
                    @endif
                </div>
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5>Recent Users</h5>
                </div>
                <div class="card-body">
                    @if($recentUsers->count() > 0)
                        <ul class="list-group">
                            @foreach($recentUsers as $user)
                                <li class="list-group-item">
                                    {{ $user->name }} ({{ $user->email }})
                                    <span class="badge bg-{{ $user->role === 'admin' ? 'danger' : 'secondary' }}">{{ ucfirst($user->role) }}</span>
                                    <small class="text-muted float-end">{{ $user->created_at->format('M d, Y') }}</small>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <p>No users found.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection