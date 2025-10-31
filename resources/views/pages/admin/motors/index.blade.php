@extends('layouts.admin')

@section('title', 'Motors')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Motor Management</h1>
            <p class="text-muted mb-0 d-md-none d-block">Manage all motors in the system</p>
        </div>
        <a href="{{ route('admin.motors.create') }}" class="btn btn-primary w-md-auto w-100">
            <i class="fas fa-plus me-2"></i>Add New Motor
        </a>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-12 col-md-6">
                    <label for="search" class="form-label">Search Motors</label>
                    <input type="text" name="search" class="form-control" placeholder="Search by name, brand or type..." value="{{ request('search') }}">
                </div>
                <div class="col-6 col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                </div>
                <div class="col-6 col-md-3 d-flex align-items-end">
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
                            <th class="border-top-0" style="width: 10%" class="d-none d-lg-table-cell">Brand</th>
                            <th class="border-top-0" style="width: 10%" class="d-none d-xl-table-cell">Price</th>
                            <th class="border-top-0" style="width: 8%" class="d-none d-lg-table-cell">Year</th>
                            <th class="border-top-0" style="width: 12%" class="d-none d-xl-table-cell">Type</th>
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
                                         class="rounded me-2 me-md-3" 
                                         style="width: 40px; height: 40px; object-fit: cover;">
                                    <div>
                                        <span class="fw-medium d-block d-md-inline">{{ $motor->name }}</span>
                                        <span class="d-md-none d-block text-muted small">Rp {{ number_format($motor->price, 0, ',', '.') }}</span>
                                        <span class="d-md-none d-block text-muted small">{{ $motor->brand }} | {{ $motor->type }} | {{ $motor->year }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="d-none d-lg-table-cell">
                                <span class="badge bg-primary bg-opacity-10 text-primary">{{ $motor->brand }}</span>
                            </td>
                            <td class="d-none d-xl-table-cell">Rp {{ number_format($motor->price, 0, ',', '.') }}</td>
                            <td class="d-none d-lg-table-cell">{{ $motor->year }}</td>
                            <td class="d-none d-xl-table-cell">
                                <span class="badge bg-success bg-opacity-10 text-success">{{ $motor->type }}</span>
                            </td>
                            <td>
                                <div class="d-flex flex-md-row flex-column gap-md-2 gap-2">
                                    <a href="{{ route('admin.motors.show', $motor) }}" class="btn btn-sm btn-outline-info flex-fill" title="View">
                                        <i class="fas fa-eye d-none d-md-inline me-1"></i><span class="d-md-none d-inline">View</span>
                                    </a>
                                    <a href="{{ route('admin.motors.edit', $motor) }}" class="btn btn-sm btn-outline-warning flex-fill" title="Edit">
                                        <i class="fas fa-edit d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Edit</span>
                                    </a>
                                    <form action="{{ route('admin.motors.destroy', ['motor' => $motor->id]) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger flex-fill" title="Delete" onclick="return confirm('Are you sure you want to delete this motor?')">
                                            <i class="fas fa-trash d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Delete</span>
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
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="mb-2 mb-md-0">
                        Showing {{ $motors->firstItem() ? $motors->firstItem() : 0 }} to {{ $motors->lastItem() }} of {{ $motors->total() }} results
                    </div>
                    {{ $motors->appends(['search' => request('search')])->links() }}
                </div>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection