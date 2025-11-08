@extends('layouts.admin')

@section('title', 'Buat Laporan Baru')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Buat Laporan Baru</h3>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.reports.generate') }}" method="GET">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="type">Jenis Laporan</label>
                                    <select name="type" id="type" class="form-control @error('type') is-invalid @enderror" required>
                                        <option value="">Pilih Jenis Laporan</option>
                                        <option value="sales" {{ request('type') == 'sales' ? 'selected' : '' }}>Laporan Penjualan</option>
                                        <option value="income" {{ request('type') == 'income' ? 'selected' : '' }}>Laporan Pendapatan</option>
                                        <option value="customer" {{ request('type') == 'customer' ? 'selected' : '' }}>Laporan Pelanggan</option>
                                        <option value="status" {{ request('type') == 'status' ? 'selected' : '' }}>Laporan Status Transaksi</option>
                                    </select>
                                    @error('type')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="start_date">Tanggal Mulai</label>
                                    <input type="date" name="start_date" id="start_date" class="form-control @error('start_date') is-invalid @enderror" value="{{ old('start_date') ?: date('Y-m-d', strtotime('-7 days')) }}" required>
                                    @error('start_date')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="end_date">Tanggal Akhir</label>
                                    <input type="date" name="end_date" id="end_date" class="form-control @error('end_date') is-invalid @enderror" value="{{ old('end_date') ?: date('Y-m-d') }}" required>
                                    @error('end_date')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group d-flex gap-2">
                            <button type="submit" class="btn btn-primary">Generate Laporan</button>
                            <a href="{{ route('admin.reports.index') }}" class="btn btn-secondary">Batal</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection