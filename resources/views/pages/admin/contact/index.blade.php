@extends('layouts.admin')

@section('title', 'Contact Messages')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Contact Messages</h1>
            <p class="text-muted mb-0 d-md-none d-block">Manage all contact messages received</p>
        </div>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-12 col-md-8">
                    <label for="search" class="form-label">Search Messages</label>
                    <input type="text" name="search" class="form-control" placeholder="Search by name, email or subject..." value="{{ request('search') }}">
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
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
                            <th class="border-top-0" style="width: 20%" class="d-none d-lg-table-cell">Email</th>
                            <th class="border-top-0" style="width: 25%">Subject</th>
                            <th class="border-top-0" style="width: 20%" class="d-none d-xl-table-cell">Date</th>
                            <th class="border-top-0" style="width: 15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($contactMessages as $message)
                        <tr>
                            <td>{{ $message->id }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="avatar bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style="width: 35px; height: 35px;">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div>
                                        <span class="fw-medium d-block d-md-inline">{{ $message->name }}</span>
                                        <a href="mailto:{{ $message->email }}" class="d-block d-md-none text-muted small">{{ $message->email }}</a>
                                        <span class="d-md-none d-block text-muted small">{{ $message->created_at ? $message->created_at->format('M d, Y') : 'N/A' }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="d-none d-lg-table-cell">
                                <a href="mailto:{{ $message->email }}">{{ $message->email }}</a>
                            </td>
                            <td>
                                <span class="fw-medium d-block d-md-inline">{{ Str::limit($message->subject ?: 'No Subject', 30) }}</span>
                                <div class="text-muted small d-none d-md-block">{{ Str::limit(strip_tags($message->message), 50) }}</div>
                                <div class="text-muted small d-block d-md-none">{{ Str::limit(strip_tags($message->message), 30) }}</div>
                            </td>
                            <td class="d-none d-xl-table-cell">{{ $message->created_at ? $message->created_at->format('M d, Y H:i') : 'N/A' }}</td>
                            <td>
                                <div class="d-flex flex-md-row flex-column gap-md-2 gap-2">
                                    <a href="{{ route('admin.contact.show', $message) }}" class="btn btn-sm btn-outline-info flex-fill" title="View">
                                        <i class="fas fa-eye d-none d-md-inline me-1"></i><span class="d-md-none d-inline">View</span>
                                    </a>
                                    <form action="{{ route('admin.contact.destroy', ['contact' => $message->id]) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger flex-fill" title="Delete" onclick="return confirm('Are you sure you want to delete this message?')">
                                            <i class="fas fa-trash d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Delete</span>
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
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="mb-2 mb-md-0">
                        Showing {{ $contactMessages->firstItem() ? $contactMessages->firstItem() : 0 }} to {{ $contactMessages->lastItem() }} of {{ $contactMessages->total() }} results
                    </div>
                    {{ $contactMessages->appends(['search' => request('search')])->links() }}
                </div>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection