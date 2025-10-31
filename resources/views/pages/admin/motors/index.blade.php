@extends('layouts.admin')

@section('title', 'Motors')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="h3 mb-0">Motor Management</h1>
            <p class="text-muted mb-0">Manage all motors in the system</p>
        </div>
        <a href="{{ route('admin.motors.create') }}" class="btn btn-primary">
            <i class="fas fa-plus me-2"></i>Add New Motor
        </a>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-md-6">
                    <label for="search" class="form-label">Search Motors</label>
                    <input type="text" name="search" class="form-control" placeholder="Search by name, brand or type..." value="{{ request('search') }}">
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <a href="{{ route('admin.motors.index') }}" class="btn btn-outline-secondary w-100">
                        <i class="fas fa-sync-alt me-1"></i> Reset
                    </a>
                </div>
            </form>
        </div>
    </div>
    
    <div class="card shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="border-top-0" style="width: 5%">ID</th>
                            <th class="border-top-0" style="width: 20%">Name</th>
                            <th class="border-top-0" style="width: 10%">Brand</th>
                            <th class="border-top-0" style="width: 10%">Price</th>
                            <th class="border-top-0" style="width: 8%">Year</th>
                            <th class="border-top-0" style="width: 12%">Type</th>
                            <th class="border-top-0" style="width: 35%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($motors as $motor)
                        <tr>
                            <td>{{ $motor->id }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="{{ $motor->image_path ? asset('storage/' . $motor->image_path) : asset('assets/icon/logo trans.png') }}" 
                                         alt="{{ $motor->name }}" 
                                         class="rounded me-3" 
                                         style="width: 50px; height: 50px; object-fit: cover;">
                                    <span class="fw-medium">{{ $motor->name }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="badge bg-primary bg-opacity-10 text-primary">{{ $motor->brand }}</span>
                            </td>
                            <td>Rp {{ number_format($motor->price, 0, ',', '.') }}</td>
                            <td>{{ $motor->year }}</td>
                            <td>
                                <span class="badge bg-success bg-opacity-10 text-success">{{ $motor->type }}</span>
                            </td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="{{ route('admin.motors.show', $motor) }}" class="btn btn-sm btn-outline-info" title="View">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.motors.edit', $motor) }}" class="btn btn-sm btn-outline-warning" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <form action="{{ route('admin.motors.destroy', ['motor' => $motor->id]) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger" title="Delete" onclick="return confirm('Are you sure you want to delete this motor?')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="7" class="text-center py-4">
                                <div class="empty-state">
                                    <i class="fas fa-motorcycle fa-3x text-muted mb-3"></i>
                                    <h5 class="text-muted">No motors found</h5>
                                    <p class="text-muted mb-0">Try changing your search or add a new motor</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            
            @if(method_exists($motors, 'hasPages') && $motors->hasPages())
            <div class="card-footer bg-white">
                {{ $motors->appends(['search' => request('search')])->links() }}
            </div>
            @endif
        </div>
    </div>
</div>
@endsection