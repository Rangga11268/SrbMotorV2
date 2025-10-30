@extends('layouts.admin')

@section('title', 'Motors')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-5">Motor Management</h1>
    
    <div class="d-flex justify-content-between align-items-center mb-4">
        <a href="{{ route('admin.motors.create') }}" class="btn btn-primary">Add New Motor</a>
        
        <form method="GET" class="d-flex">
            <input type="text" name="search" class="form-control me-2" placeholder="Search motors..." value="{{ request('search') }}">
            <button type="submit" class="btn btn-outline-secondary">Search</button>
        </form>
    </div>
    
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($motors as $motor)
                <tr>
                    <td>{{ $motor->id }}</td>
                    <td>{{ $motor->name }}</td>
                    <td>{{ $motor->brand }}</td>
                    <td>Rp {{ number_format($motor->price, 0, ',', '.') }}</td>
                    <td>{{ $motor->year }}</td>
                    <td>{{ $motor->type }}</td>
                    <td>
                        <a href="{{ route('admin.motors.show', $motor) }}" class="btn btn-sm btn-info">View</a>
                        <a href="{{ route('admin.motors.edit', $motor) }}" class="btn btn-sm btn-warning">Edit</a>
                        <form action="{{ route('admin.motors.destroy', $motor) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this motor?')">Delete</button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="7" class="text-center">No motors found.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection