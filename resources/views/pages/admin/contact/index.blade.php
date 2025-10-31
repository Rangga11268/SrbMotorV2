@extends('layouts.admin')

@section('title', 'Contact Messages')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="h3 mb-0">Contact Messages</h1>
            <p class="text-muted mb-0">Manage all contact messages received</p>
        </div>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-md-8">
                    <label for="search" class="form-label">Search Messages</label>
                    <input type="text" name="search" class="form-control" placeholder="Search by name, email or subject..." value="{{ request('search') }}">
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <a href="{{ route('admin.contact.index') }}" class="btn btn-outline-secondary w-100">
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
                            <th class="border-top-0" style="width: 15%">Name</th>
                            <th class="border-top-0" style="width: 20%">Email</th>
                            <th class="border-top-0" style="width: 25%">Subject</th>
                            <th class="border-top-0" style="width: 20%">Date</th>
                            <th class="border-top-0" style="width: 15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($contactMessages as $message)
                        <tr>
                            <td>{{ $message->id }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="avatar bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <span class="fw-medium">{{ $message->name }}</span>
                                </div>
                            </td>
                            <td>
                                <a href="mailto:{{ $message->email }}">{{ $message->email }}</a>
                            </td>
                            <td>
                                <span class="fw-medium">{{ Str::limit($message->subject ?: 'No Subject', 30) }}</span>
                                <div class="text-muted small">{{ Str::limit(strip_tags($message->message), 50) }}</div>
                            </td>
                            <td>{{ $message->created_at ? $message->created_at->format('M d, Y H:i') : 'N/A' }}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="{{ route('admin.contact.show', $message) }}" class="btn btn-sm btn-outline-info" title="View">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <form action="{{ route('admin.contact.destroy', ['contact' => $message->id]) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger" title="Delete" onclick="return confirm('Are you sure you want to delete this message?')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="6" class="text-center py-4">
                                <div class="empty-state">
                                    <i class="fas fa-envelope-open-text fa-3x text-muted mb-3"></i>
                                    <h5 class="text-muted">No contact messages found</h5>
                                    <p class="text-muted mb-0">No messages have been received yet</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            
            @if(method_exists($contactMessages, 'hasPages') && $contactMessages->hasPages())
            <div class="card-footer bg-white">
                {{ $contactMessages->appends(['search' => request('search')])->links() }}
            </div>
            @endif
        </div>
    </div>
</div>
@endsection