@extends('layouts.admin')

@section('title', 'Laporan')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Laporan Transaksi</h3>
                </div>
                <div class="card-body">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="card bg-primary text-white h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Laporan Penjualan</h5>
                                    <p class="card-text">Laporan penjualan motor berdasarkan merek, tipe, dan jumlah unit terjual.</p>
                                    <a href="{{ route('admin.reports.create') }}?type=sales" class="btn btn-light text-primary">Buat Laporan</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card bg-info text-white h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Laporan Pendapatan</h5>
                                    <p class="card-text">Laporan pendapatan berdasarkan transaksi tunai dan kredit.</p>
                                    <a href="{{ route('admin.reports.create') }}?type=income" class="btn btn-light text-info">Buat Laporan</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card bg-success text-white h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Laporan Pelanggan</h5>
                                    <p class="card-text">Laporan tentang data pelanggan dan transaksi pelanggan teratas.</p>
                                    <a href="{{ route('admin.reports.create') }}?type=customer" class="btn btn-light text-success">Buat Laporan</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card bg-warning text-white h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Laporan Status</h5>
                                    <p class="card-text">Laporan status transaksi, jumlah penjualan dan pendapatan berdasarkan status.</p>
                                    <a href="{{ route('admin.reports.create') }}?type=status" class="btn btn-light text-warning">Buat Laporan</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection