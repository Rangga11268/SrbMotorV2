@php
use Illuminate\Support\Str;
@endphp

@extends('layouts.admin')

@section('title', 'Dasbor')

@section('breadcrumb')
<!-- No additional breadcrumbs for dashboard -->
@endsection

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Dasbor Admin</h1>
            <p class="text-muted mb-0 d-md-none d-block">Selamat datang kembali, {{ Auth::user()->name }}!</p>
        </div>
        <div class="text-md-end text-center w-100 w-md-auto">
            <p class="mb-0">Terakhir diperbarui: <span class="text-muted">{{ now()->format('d M Y H:i') }}</span></p>
        </div>
    </div>

    <!-- Stats -->
    <div class="row mb-4 g-3">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-primary text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Motor</h6>
                            <h3 class="card-title mb-0">{{ $motorsCount }}</h3>
                        </div>
                        <div class="bg-primary bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-motorcycle fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-light btn-sm mt-3">Kelola Motor</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-success text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Pesan</h6>
                            <h3 class="card-title mb-0">{{ $contactMessagesCount }}</h3>
                        </div>
                        <div class="bg-success bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-envelope fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.contact.index') }}" class="btn btn-outline-light btn-sm mt-3">Lihat Pesan</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-info text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Pengguna</h6>
                            <h3 class="card-title mb-0">{{ $usersCount ?? \App\Models\User::count() }}</h3>
                        </div>
                        <div class="bg-info bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-users fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.users.index') }}" class="btn btn-outline-light btn-sm mt-3">Kelola Pengguna</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-warning text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Transaksi</h6>
                            <h3 class="card-title mb-0">{{ $transactionsCount }}</h3>
                        </div>
                        <div class="bg-warning bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-file-invoice fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.transactions.index') }}" class="btn btn-outline-light btn-sm mt-3">Lihat Transaksi</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Transaction Stats -->
    <div class="row mb-4 g-3">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-secondary text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Tunai</h6>
                            <h3 class="card-title mb-0">{{ $cashTransactionsCount }}</h3>
                        </div>
                        <div class="bg-secondary bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-money-bill-wave fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.transactions.index', ['type' => 'CASH']) }}" class="btn btn-outline-light btn-sm mt-3">Lihat</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <div class="card bg-dark text-white h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-1 opacity-75">Kredit</h6>
                            <h3 class="card-title mb-0">{{ $creditTransactionsCount }}</h3>
                        </div>
                        <div class="bg-dark bg-opacity-20 p-3 rounded-circle">
                            <i class="fas fa-credit-card fa-2x"></i>
                        </div>
                    </div>
                    <a href="{{ route('admin.transactions.index', ['type' => 'CREDIT']) }}" class="btn btn-outline-light btn-sm mt-3">Lihat</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Items -->
    <div class="row g-4">
        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-file-invoice me-2 text-warning"></i>Transaksi Terbaru</h5>
                </div>
                <div class="card-body p-0">
                    @if($recentTransactions->count() > 0)
                    <div class="list-group list-group-flush">
                        @foreach($recentTransactions as $transaction)
                        <a href="{{ route('admin.transactions.show', $transaction) }}" class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="shrink-0 me-3">
                                    <div class="bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }} text-white rounded-circle d-flex align-items-center justify-content-center"
                                        style="width: 50px; height: 50px;">
                                        <i class="fas fa-{{ $transaction->transaction_type === 'CASH' ? 'money-bill-wave' : 'credit-card' }} fa-lg"></i>
                                    </div>
                                </div>
                                <div class="grow">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-1">{{ Str::limit($transaction->motor->name, 20) }}</h6>
                                        <small class="text-muted d-md-none d-block">{{ $transaction->created_at->diffForHumans() }}</small>
                                    </div>
                                    <p class="mb-0 text-muted">{{ $transaction->user->name }}</p>
                                    <div class="d-flex justify-content-between align-items-center mt-1">
                                        <span class="badge bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }}">{{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}</span>
                                        <span class="text-end text-muted d-none d-md-block">{{ $transaction->created_at->diffForHumans() }}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        @endforeach
                    </div>
                    @else
                    <div class="p-3 text-center text-muted">Tidak ada transaksi ditemukan</div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-motorcycle me-2 text-primary"></i>Motor Terbaru</h5>
                </div>
                <div class="card-body p-0">
                    @if($recentMotors->count() > 0)
                    <div class="list-group list-group-flush">
                        @foreach($recentMotors as $motor)
                        <a href="{{ route('admin.motors.show', $motor) }}" class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="shrink-0 me-3">
                                    <img src="{{ $motor->image_path ? asset('storage/' . $motor->image_path) : asset('assets/icon/logo trans.png') }}"
                                        alt="{{ $motor->name }}"
                                        class="rounded"
                                        style="width: 50px; height: 50px; object-fit: cover;">
                                </div>
                                <div class="grow">
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
                    <div class="p-3 text-center text-muted">Tidak ada motor ditemukan</div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-file-alt me-2 text-info"></i>Kontak Terbaru</h5>
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
                            <small class="text-muted">{{ Str::limit($message->message, 30) }}</small>
                        </a>
                        @endforeach
                    </div>
                    @else
                    <div class="p-3 text-center text-muted">Tidak ada pesan ditemukan</div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-transparent border-bottom">
                    <h5 class="card-title mb-0"><i class="fas fa-users me-2 text-info"></i>Pengguna Terbaru</h5>
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
                            <span class="badge rounded-pill bg-{{ $user->role === 'admin' ? 'danger' : 'secondary' }}">{{ ucfirst($user->role == 'admin' ? 'Admin' : 'Pengguna') }}</span>
                        </div>
                        @endforeach
                    </div>
                    @else
                    <div class="p-3 text-center text-muted">Tidak ada pengguna ditemukan</div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection