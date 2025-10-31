@extends('layouts.admin')

@section('title', 'Motor Details')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Motor Details</h1>
            <p class="text-muted mb-0 d-md-none d-block">View information for {{ $motor->name }}</p>
        </div>
        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-md-auto w-100">
            <i class="fas fa-arrow-left me-2"></i>Back to Motors
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
                            <h5 class="mb-3 pb-2 border-bottom d-md-none">Motor Information</h5>
                            <div class="row">
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Brand</p>
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
                                    <p class="text-muted mb-0">Type</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->type }}</p>
                                </div>
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Year</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->year }}</p>
                                </div>
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Price</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-bold">Rp {{ number_format($motor->price, 0, ',', '.') }}</p>
                                </div>
                                
                                @if($motor->details)
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Details</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ Str::limit($motor->details, 50) }}</p>
                                </div>
                                @endif
                                
                                <div class="col-6 mb-2">
                                    <p class="text-muted mb-0">Created At</p>
                                </div>
                                <div class="col-6 mb-2">
                                    <p class="mb-0 fw-medium">{{ $motor->created_at ? $motor->created_at->format('M d, Y') : 'N/A' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    @if($motor->specifications)
                    <div class="mt-4 pt-4 border-top">
                        <h5 class="mb-3">Specifications</h5>
                        <div class="row">
                            @if(is_array($motor->specifications))
                                @if(!empty($motor->specifications['engine_type']))
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">Engine Type:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['engine_type'] }}</span>
                                </div>
                                @endif
                                @if(!empty($motor->specifications['engine_size']))
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">Engine Size:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['engine_size'] }}</span>
                                </div>
                                @endif
                                @if(!empty($motor->specifications['fuel_system']))
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">Fuel System:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['fuel_system'] }}</span>
                                </div>
                                @endif
                                @if(!empty($motor->specifications['transmission']))
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">Transmission:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['transmission'] }}</span>
                                </div>
                                @endif
                                @if(!empty($motor->specifications['max_power']))
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">Max Power:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['max_power'] }}</span>
                                </div>
                                @endif
                                @if(!empty($motor->specifications['max_torque']))
                                <div class="col-12 col-md-6 mb-2">
                                    <span class="text-muted">Max Torque:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['max_torque'] }}</span>
                                </div>
                                @endif
                                @if(!empty($motor->specifications['additional_specs']))
                                <div class="col-12 mb-2">
                                    <span class="text-muted">Additional Specs:</span> 
                                    <span class="fw-medium">{{ $motor->specifications['additional_specs'] }}</span>
                                </div>
                                @endif
                            @else
                                <div class="col-12">
                                    <pre class="bg-light p-3 rounded">{{ $motor->specifications }}</pre>
                                </div>
                            @endif
                        </div>
                    </div>
                    @endif
                    
                    <div class="d-flex flex-column flex-md-row justify-content-end gap-2 mt-5">
                        <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-100 w-md-auto">
                            <i class="fas fa-arrow-left me-2"></i>Back to List
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