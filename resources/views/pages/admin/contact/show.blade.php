@extends('layouts.admin')

@section('title', 'Contact Message')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-5">Contact Message Details</h1>
    
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3>Contact from: {{ $contactMessage->name }}</h3>
                </div>
                <div class="card-body">
                    <table class="table table-borderless">
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{{ $contactMessage->name }}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{{ $contactMessage->email }}</td>
                        </tr>
                        <tr>
                            <td><strong>Subject:</strong></td>
                            <td>{{ $contactMessage->subject ?: 'No Subject' }}</td>
                        </tr>
                        <tr>
                            <td><strong>Message:</strong></td>
                            <td>{{ $contactMessage->message }}</td>
                        </tr>
                        <tr>
                            <td><strong>Sent At:</strong></td>
                            <td>{{ $contactMessage->created_at->format('M d, Y H:i') }}</td>
                        </tr>
                    </table>
                    
                    <div class="d-flex justify-content-between mt-4">
                        <a href="{{ route('admin.contact.index') }}" class="btn btn-secondary">Back to List</a>
                        <form action="{{ route('admin.contact.destroy', $contactMessage) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this message?')">Delete Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection