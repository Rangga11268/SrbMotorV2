@extends('layouts.admin')

@section('title', 'Contact Message')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-5">Contact Message Details</h1>
    
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3>Contact from: {{ $contact->name }}</h3>
                </div>
                <div class="card-body">
                    <table class="table table-borderless">
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{{ $contact->name }}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{{ $contact->email }}</td>
                        </tr>
                        <tr>
                            <td><strong>Subject:</strong></td>
                            <td>{{ $contact->subject ?: 'No Subject' }}</td>
                        </tr>
                        <tr>
                            <td><strong>Message:</strong></td>
                            <td>{{ $contact->message }}</td>
                        </tr>
                        <tr>
                            <td><strong>Sent At:</strong></td>
                            <td>{{ $contact->created_at ? $contact->created_at->format('M d, Y H:i') : 'N/A' }}</td>
                        </tr>
                    </table>
                    
                    <div class="d-flex justify-content-between mt-4">
                        <a href="{{ route('admin.contact.index') }}" class="btn btn-secondary">Back to List</a>
                        @if($contact && $contact->id)
                        <form action="{{ route('admin.contact.destroy', ['contact' => $contact->id]) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this message?')">Delete Message</button>
                        </form>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection