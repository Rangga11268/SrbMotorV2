@extends('layouts.admin')

@section('title', 'Edit Motor')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Edit Motor</h1>
            <p class="text-muted mb-0 d-md-none d-block">Perbarui detail untuk {{ $motor->name }}</p>
        </div>
        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-md-auto w-100">
            <i class="fas fa-arrow-left me-2"></i>Kembali ke Motor
        </a>
    </div>
    
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <div class="card shadow-sm">
                <div class="card-body p-3 p-md-4">
                    <form action="{{ route('admin.motors.update', $motor) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        
                        <div class="mb-4">
                            <h5 class="card-title">Detail Motor</h5>
                            <hr>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="name" class="form-label">Nama Motor <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $motor->name) }}" required>
                                @error('name')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-12 col-md-6 mb-3">
                                <label for="model" class="form-label">Model</label>
                                <input type="text" class="form-control @error('model') is-invalid @enderror" id="model" name="model" value="{{ old('model', $motor->model) }}">
                                @error('model')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 mb-3">
                                <label for="brand" class="form-label">Merek <span class="text-danger">*</span></label>
                                <select class="form-select @error('brand') is-invalid @enderror" id="brand" name="brand" required>
                                    <option value="">Pilih Merek</option>
                                    <option value="Honda" {{ old('brand', $motor->brand) == 'Honda' ? 'selected' : '' }}>Honda</option>
                                    <option value="Yamaha" {{ old('brand', $motor->brand) == 'Yamaha' ? 'selected' : '' }}>Yamaha</option>
                                </select>
                                @error('brand')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-12 col-md-4 mb-3">
                                <label for="type" class="form-label">Tipe</label>
                                <input type="text" class="form-control @error('type') is-invalid @enderror" id="type" name="type" value="{{ old('type', $motor->type) }}">
                                @error('type')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-12 col-md-4 mb-3">
                                <label for="year" class="form-label">Tahun</label>
                                <input type="number" class="form-control @error('year') is-invalid @enderror" id="year" name="year" value="{{ old('year', $motor->year) }}" min="1900" max="2100">
                                @error('year')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="price" class="form-label">Harga <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text">Rp</span>
                                    <input type="number" class="form-control @error('price') is-invalid @enderror" id="price" name="price" value="{{ old('price', $motor->price) }}" min="0" step="0.01" required>
                                </div>
                                @error('price')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5 class="card-title mt-4">Spesifikasi & Detail</h5>
                            <hr>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="engine_type" class="form-label">Tipe Mesin</label>
                                <input type="text" class="form-control @error('engine_type') is-invalid @enderror" id="engine_type" name="specifications[engine_type]" value="{{ old('specifications.engine_type', $motor->getSpecificationsArrayAttribute()['engine_type'] ?? '') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="engine_size" class="form-label">Ukuran Mesin</label>
                                <input type="text" class="form-control @error('engine_size') is-invalid @enderror" id="engine_size" name="specifications[engine_size]" value="{{ old('specifications.engine_size', $motor->getSpecificationsArrayAttribute()['engine_size'] ?? '') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="fuel_system" class="form-label">Sistem Bahan Bakar</label>
                                <input type="text" class="form-control @error('fuel_system') is-invalid @enderror" id="fuel_system" name="specifications[fuel_system]" value="{{ old('specifications.fuel_system', $motor->getSpecificationsArrayAttribute()['fuel_system'] ?? '') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="transmission" class="form-label">Transmisi</label>
                                <input type="text" class="form-control @error('transmission') is-invalid @enderror" id="transmission" name="specifications[transmission]" value="{{ old('specifications.transmission', $motor->getSpecificationsArrayAttribute()['transmission'] ?? '') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="max_power" class="form-label">Daya Maksimal</label>
                                <input type="text" class="form-control @error('max_power') is-invalid @enderror" id="max_power" name="specifications[max_power]" value="{{ old('specifications.max_power', $motor->getSpecificationsArrayAttribute()['max_power'] ?? '') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="max_torque" class="form-label">Torsi Maksimal</label>
                                <input type="text" class="form-control @error('max_torque') is-invalid @enderror" id="max_torque" name="specifications[max_torque]" value="{{ old('specifications.max_torque', $motor->getSpecificationsArrayAttribute()['max_torque'] ?? '') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="additional_specs" class="form-label">Spesifikasi Tambahan</label>
                            <textarea class="form-control @error('additional_specs') is-invalid @enderror" id="additional_specs" name="specifications[additional_specs]" rows="2">{{ old('specifications.additional_specs', $motor->getSpecificationsArrayAttribute()['additional_specs'] ?? '') }}</textarea>
                            <div class="form-text">Spesifikasi lain yang tidak tercantum di atas</div>
                            @error('specifications')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="mb-3">
                            <label for="details" class="form-label">Detail</label>
                            <textarea class="form-control @error('details') is-invalid @enderror" id="details" name="details" rows="3">{{ old('details', $motor->details) }}</textarea>
                            @error('details')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="mb-4">
                            <h5 class="card-title mt-4">Gambar Motor</h5>
                            <hr>
                        </div>
                        
                        <div class="mb-3">
                            <label for="image" class="form-label">Gambar Motor</label>
                            <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" accept="image/*">
                            <div class="form-text">Unggah gambar baru atau pertahankan gambar saat ini</div>
                            @error('image')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        @if($motor->image_path)
                        <div class="mb-4">
                            <label class="form-label">Gambar Saat Ini</label>
                            <div class="border rounded p-2 bg-light">
                                <img src="{{ asset('storage/' . $motor->image_path) }}" alt="Current" class="img-fluid rounded" style="max-height: 200px;">
                            </div>
                        </div>
                        @endif
                        
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-5">
                            <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-100 w-md-auto">Batal</a>
                            <button type="submit" class="btn btn-primary w-100 w-md-auto px-4">
                                <i class="fas fa-save me-2"></i>Perbarui Motor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Show error message if exists
    @if(session('error'))
        // Check if SweetAlert2 is loaded before using it
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Kesalahan!',
                text: '{{ e(session('error')) }}',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
            });
        } else {
            console.error('SweetAlert2 is not loaded');
        }
    @endif
});
</script>
@endpush