@extends('layouts.admin')

@section('title', 'Laporan')

@section('breadcrumb')
    <li class="breadcrumb-item active" aria-current="page">Laporan</li>
@endsection

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 admin-page-title">Laporan Transaksi</h1>
            <p class="text-muted admin-page-subtitle d-md-none d-block">Pilih jenis laporan yang ingin dibuat</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card stats-card bg-primary text-white h-100">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="stats-icon bg-primary bg-opacity-20 text-white">
                            <i class="fas fa-chart-line fa-2x"></i>
                        </div>
                    </div>
                    <h5 class="card-title text-white">Laporan Penjualan</h5>
                    <p class="card-text flex-grow-1">Laporan penjualan motor berdasarkan merek, tipe, dan jumlah unit terjual.</p>
                    <a href="{{ route('admin.reports.create') }}?type=sales" class="btn btn-light text-primary admin-btn mt-auto">Buat Laporan</a>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card stats-card bg-info text-white h-100">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="stats-icon bg-info bg-opacity-20 text-white">
                            <i class="fas fa-money-bill-wave fa-2x"></i>
                        </div>
                    </div>
                    <h5 class="card-title text-white">Laporan Pendapatan</h5>
                    <p class="card-text flex-grow-1">Laporan pendapatan berdasarkan transaksi tunai dan kredit.</p>
                    <a href="{{ route('admin.reports.create') }}?type=income" class="btn btn-light text-info admin-btn mt-auto">Buat Laporan</a>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card stats-card bg-success text-white h-100">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="stats-icon bg-success bg-opacity-20 text-white">
                            <i class="fas fa-users fa-2x"></i>
                        </div>
                    </div>
                    <h5 class="card-title text-white">Laporan Pelanggan</h5>
                    <p class="card-text flex-grow-1">Laporan tentang data pelanggan dan transaksi pelanggan teratas.</p>
                    <a href="{{ route('admin.reports.create') }}?type=customer" class="btn btn-light text-success admin-btn mt-auto">Buat Laporan</a>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card stats-card bg-warning text-white h-100">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="stats-icon bg-warning bg-opacity-20 text-dark">
                            <i class="fas fa-file-alt fa-2x"></i>
                        </div>
                    </div>
                    <h5 class="card-title text-white">Laporan Status</h5>
                    <p class="card-text flex-grow-1">Laporan status transaksi, jumlah penjualan dan pendapatan berdasarkan status.</p>
                    <a href="{{ route('admin.reports.create') }}?type=status" class="btn btn-dark text-warning admin-btn mt-auto">Buat Laporan</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection