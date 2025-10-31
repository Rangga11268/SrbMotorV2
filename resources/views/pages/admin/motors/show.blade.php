@extends('layouts.admin')

@section('title', 'Motor Details')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-5">Motor Details</h1>
    
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3>{{ $motor->name }}</h3>
                </div>
                <div class="card-body">
                    <div class="text-center mb-3">
                        <img src="{{ asset('storage/' . $motor->image_path) }}" alt="{{ $motor->name }}" class="img-fluid" style="max-height: 300px;">
                    </div>
                    
                    <table class="table table-borderless">
                        <tr>
                            <td><strong>Brand:</strong></td>
                            <td>{{ $motor->brand }}</td>
                        </tr>
                        <tr>
                            <td><strong>Model:</strong></td>
                            <td>{{ $motor->model }}</td>
                        </tr>
                        <tr>
                            <td><strong>Price:</strong></td>
                            <td>Rp {{ number_format($motor->price, 0, ',', '.') }}</td>
                        </tr>
                        <tr>
                            <td><strong>Year:</strong></td>
                            <td>{{ $motor->year }}</td>
                        </tr>
                        <tr>
                            <td><strong>Type:</strong></td>
                            <td>{{ $motor->type }}</td>
                        </tr>
                        <tr>
                            <td><strong>Details:</strong></td>
                            <td>{{ $motor->details }}</td>
                        </tr>
                        <tr>
                            <td><strong>Specifications:</strong></td>
                            <td>
                                @if($motor->specifications)
                                    @if(is_array($motor->specifications))
                                        <ul>
                                            @foreach($motor->specifications as $key => $value)
                                                <li><strong>{{ ucfirst(str_replace('_', ' ', $key)) }}:</strong> {{ $value }}</li>
                                            @endforeach
                                        </ul>
                                    @else
                                        {{ $motor->specifications }}
                                    @endif
                                @else
                                    No specifications available
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Created At:</strong></td>
                            <td>{{ $motor->created_at ? $motor->created_at->format('M d, Y H:i') : 'N/A' }}</td>
                        </tr>
                    </table>
                    
                    <div class="d-flex justify-content-between mt-4">
                        <a href="{{ route('admin.motors.index') }}" class="btn btn-secondary">Back to List</a>
                        <div>
                            <a href="{{ route('admin.motors.edit', $motor) }}" class="btn btn-warning">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection