@extends('layouts.admin')

@section('title', 'Create Motor')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="h3 mb-0">Create New Motor</h1>
            <p class="text-muted mb-0">Add a new motorcycle to the system</p>
        </div>
        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary">
            <i class="fas fa-arrow-left me-2"></i>Back to Motors
        </a>
    </div>
    
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-sm">
                <div class="card-body p-4">
                    <form action="{{ route('admin.motors.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="mb-4">
                            <h5 class="card-title">Motor Details</h5>
                            <hr>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-6 mb-3">
                                <label for="name" class="form-label">Motor Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" required>
                                @error('name')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-md-6 mb-3">
                                <label for="model" class="form-label">Model</label>
                                <input type="text" class="form-control @error('model') is-invalid @enderror" id="model" name="model" value="{{ old('model') }}">
                                @error('model')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-4 mb-3">
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
                            
                            <div class="col-md-4 mb-3">
                                <label for="type" class="form-label">Type</label>
                                <input type="text" class="form-control @error('type') is-invalid @enderror" id="type" name="type" value="{{ old('type') }}">
                                @error('type')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-md-4 mb-3">
                                <label for="year" class="form-label">Year</label>
                                <input type="number" class="form-control @error('year') is-invalid @enderror" id="year" name="year" value="{{ old('year') }}" min="1900" max="2100">
                                @error('year')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-6 mb-3">
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
                        
                        <div class="mb-3">
                            <label for="specifications" class="form-label">Specifications (JSON format)</label>
                            <textarea class="form-control @error('specifications') is-invalid @enderror" id="specifications" name="specifications" rows="4">{{ old('specifications') }}</textarea>
                            <div class="form-text">Enter specifications in JSON format, e.g., {"engine_type": "4-Stroke", "engine_size": "109.5cc", "fuel_system": "PGM-Fi"}</div>
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
                        
                        <div class="d-flex justify-content-between mt-5">
                            <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary">Cancel</a>
                            <button type="submit" class="btn btn-primary px-4">
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