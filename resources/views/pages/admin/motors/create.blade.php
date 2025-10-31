@extends('layouts.admin')

@section('title', 'Create Motor')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Create New Motor</h1>
            <p class="text-muted mb-0 d-md-none d-block">Add a new motorcycle to the system</p>
        </div>
        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-md-auto w-100">
            <i class="fas fa-arrow-left me-2"></i>Back to Motors
        </a>
    </div>
    
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <div class="card shadow-sm">
                <div class="card-body p-3 p-md-4">
                    <form action="{{ route('admin.motors.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="mb-4">
                            <h5 class="card-title">Motor Details</h5>
                            <hr>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="name" class="form-label">Motor Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" required>
                                @error('name')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-12 col-md-6 mb-3">
                                <label for="model" class="form-label">Model</label>
                                <input type="text" class="form-control @error('model') is-invalid @enderror" id="model" name="model" value="{{ old('model') }}">
                                @error('model')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 mb-3">
                                <label for="brand" class="form-label">Brand <span class="text-danger">*</span></label>
                                <select class="form-select @error('brand') is-invalid @enderror" id="brand" name="brand" required>
                                    <option value="">Select Brand</option>
                                    <option value="Honda" {{ old('brand') == 'Honda' ? 'selected' : '' }}>Honda</option>
                                    <option value="Yamaha" {{ old('brand') == 'Yamaha' ? 'selected' : '' }}>Yamaha</option>
                                </select>
                                @error('brand')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-12 col-md-4 mb-3">
                                <label for="type" class="form-label">Type</label>
                                <input type="text" class="form-control @error('type') is-invalid @enderror" id="type" name="type" value="{{ old('type') }}">
                                @error('type')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-12 col-md-4 mb-3">
                                <label for="year" class="form-label">Year</label>
                                <input type="number" class="form-control @error('year') is-invalid @enderror" id="year" name="year" value="{{ old('year') }}" min="1900" max="2100">
                                @error('year')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="price" class="form-label">Price <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text">Rp</span>
                                    <input type="number" class="form-control @error('price') is-invalid @enderror" id="price" name="price" value="{{ old('price') }}" min="0" step="0.01" required>
                                </div>
                                @error('price')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5 class="card-title mt-4">Specifications & Details</h5>
                            <hr>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="engine_type" class="form-label">Engine Type</label>
                                <input type="text" class="form-control @error('engine_type') is-invalid @enderror" id="engine_type" name="specifications[engine_type]" value="{{ old('specifications.engine_type') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="engine_size" class="form-label">Engine Size</label>
                                <input type="text" class="form-control @error('engine_size') is-invalid @enderror" id="engine_size" name="specifications[engine_size]" value="{{ old('specifications.engine_size') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="fuel_system" class="form-label">Fuel System</label>
                                <input type="text" class="form-control @error('fuel_system') is-invalid @enderror" id="fuel_system" name="specifications[fuel_system]" value="{{ old('specifications.fuel_system') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="transmission" class="form-label">Transmission</label>
                                <input type="text" class="form-control @error('transmission') is-invalid @enderror" id="transmission" name="specifications[transmission]" value="{{ old('specifications.transmission') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="max_power" class="form-label">Max Power</label>
                                <input type="text" class="form-control @error('max_power') is-invalid @enderror" id="max_power" name="specifications[max_power]" value="{{ old('specifications.max_power') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="max_torque" class="form-label">Max Torque</label>
                                <input type="text" class="form-control @error('max_torque') is-invalid @enderror" id="max_torque" name="specifications[max_torque]" value="{{ old('specifications.max_torque') }}">
                                @error('specifications')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="additional_specs" class="form-label">Additional Specifications</label>
                            <textarea class="form-control @error('additional_specs') is-invalid @enderror" id="additional_specs" name="specifications[additional_specs]" rows="2">{{ old('specifications.additional_specs') }}</textarea>
                            <div class="form-text">Other specifications not covered above</div>
                            @error('specifications')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="mb-3">
                            <label for="details" class="form-label">Details</label>
                            <textarea class="form-control @error('details') is-invalid @enderror" id="details" name="details" rows="3">{{ old('details') }}</textarea>
                            @error('details')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="mb-4">
                            <h5 class="card-title mt-4">Motor Image</h5>
                            <hr>
                        </div>
                        
                        <div class="mb-3">
                            <label for="image" class="form-label">Motor Image <span class="text-danger">*</span></label>
                            <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" accept="image/*" required>
                            <div class="form-text">Upload a clear image of the motorcycle</div>
                            @error('image')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-5">
                            <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-100 w-md-auto">Cancel</a>
                            <button type="submit" class="btn btn-primary w-100 w-md-auto px-4">
                                <i class="fas fa-save me-2"></i>Create Motor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection