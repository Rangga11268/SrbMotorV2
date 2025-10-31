@extends('layouts.admin')

@section('title', 'Contact Messages')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-5">Contact Messages</h1>
    
    <form method="GET" class="mb-4">
        <div class="input-group">
            <input type="text" name="search" class="form-control" placeholder="Search messages..." value="{{ request('search') }}">
            <button type="submit" class="btn btn-outline-secondary">Search</button>
        </div>
    </form>
    
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($contactMessages as $message)
                <tr>
                    <td>{{ $message->id }}</td>
                    <td>{{ $message->name }}</td>
                    <td>{{ $message->email }}</td>
                    <td>{{ $message->subject ?: 'No Subject' }}</td>
                    <td>{{ $message->created_at ? $message->created_at->format('M d, Y H:i') : 'N/A' }}</td>
                    <td>
                        <a href="{{ route('admin.contact.show', $message) }}" class="btn btn-sm btn-info">View</a>
                        <form action="{{ route('admin.contact.destroy', ['contact' => $message->id]) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this message?')">Delete</button>
                        </form>
                    </td>
                </tr>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="text-center">No contact messages found.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection