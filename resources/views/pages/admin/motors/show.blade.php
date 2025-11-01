@extends('layouts.admin')

@section('title', 'Detail Motor')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Detail Motor</h1>
            <p class="text-muted mb-0 d-md-none d-block">Lihat informasi untuk {{ $motor->name }}</p>
        </div>
        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-md-auto w-100">
            <i class="fas fa-arrow-left me-2"></i>Kembali ke Motor
        </a>
    </div>
    
    <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
            <div class="card shadow-sm">
                <div class="card-body p-3 p-md-4">
                    <div class="row">
                        <div class="col-12 col-md-5 mb-4 mb-md-0">
                            <div class="d-flex flex-column align-items-center">
                                <img src="{{ asset('storage/' . $motor->image_path) }}" 
                                     alt="{{ $motor->name }}" 
                                     class="img-fluid rounded shadow-sm" 
                                     style="max-height: 300px; object-fit: cover;">
                                
                                <div class="mt-3 text-center w-100">
                                    <h4 class="mb-1">{{ $motor->name }}</h4>
                                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                                        <span class="badge bg-primary bg-opacity-10 text-primary">{{ $motor->brand }}</span>
                                        <span class="badge bg-success bg-opacity-10 text-success">{{ $motor->type }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-12 col-md-7">
                            <h5 class="mb-3 pb-2 border-bottom d-md-none">Informasi Motor</h5>
                            <div class="row">
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Merek</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->brand }}</p>
                                </div>
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Model</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->model }}</p>
                                </div>
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Tipe</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->type }}</p>
                                </div>
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Tahun</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->year }}</p>
                                </div>
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Harga</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-bold">Rp {{ number_format($motor->price, 0, ',', '.') }}</p>
                                </div>
                                
                                @if($motor->details)
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Detail</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ Str::limit($motor->details, 50) }}</p>
                                </div>
                                @endif
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Dibuat Pada</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->created_at ? $motor->created_at->format('d M Y') : 'Tidak Tersedia' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    @if($motor->specifications && $motor->specifications->count() > 0)
                    <div class="mt-4 pt-4 border-top">
                        <h5 class="mb-3">Spesifikasi</h5>
                        <div class="row">
                            @foreach($motor->specifications as $spec)
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">
                                        @switch($spec->spec_key)
                                            @case('engine_type')
                                                {{ __('Tipe Mesin:') }}
                                                @break
                                            @case('engine_size')
                                                {{ __('Ukuran Mesin:') }}
                                                @break
                                            @case('fuel_system')
                                                {{ __('Sistem Bahan Bakar:') }}
                                                @break
                                            @case('transmission')
                                                {{ __('Transmisi:') }}
                                                @break
                                            @case('max_power')
                                                {{ __('Daya Maksimal:') }}
                                                @break
                                            @case('max_torque')
                                                {{ __('Torsi Maksimal:') }}
                                                @break
                                            @case('additional_specs')
                                                {{ __('Spesifikasi Tambahan:') }}
                                                @break
                                            @default
                                                {{ __($spec->spec_key . ':') }}
                                        @endswitch
                                    </span> 
                                    <span class="fw-medium">{{ $spec->spec_value }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    @endif
                    
                    <div class="d-flex flex-column flex-md-row justify-content-end gap-2 mt-5">
                        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-100 w-md-auto">
                            <i class="fas fa-arrow-left me-2"></i>Kembali ke Daftar
                        </a>
                        <a href="{{ route('admin.motors.edit', $motor) }}" class="btn btn-primary w-100 w-md-auto">
                            <i class="fas fa-edit me-2"></i>Edit Motor
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection