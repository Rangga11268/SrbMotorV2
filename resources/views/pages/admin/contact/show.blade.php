@extends('layouts.admin')

@section('title', 'Contact Message')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Contact Message Details</h1>
            <p class="text-muted mb-0 d-md-none d-block">Message from {{ $contact->name }}</p>
        </div>
        <a href="{{ route('admin.contact.index') }}" class="btn btn-outline-secondary w-md-auto w-100">
            <i class="fas fa-arrow-left me-2"></i>Back to Messages
        </a>
    </div>
    
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <div class="card shadow-sm">
                <div class="card-body p-3 p-md-4">
                    <div class="d-flex flex-column flex-md-row align-items-center mb-4 gap-3">
                        <div class="avatar bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-md-3 mx-auto mx-md-0" style="width: 60px; height: 60px;">
                            <i class="fas fa-user fa-lg"></i>
                        </div>
                        <div class="text-center text-md-start">
                            <h4 class="mb-1">{{ $contact->name }}</h4>
                            <p class="text-muted mb-0">
                                <i class="fas fa-envelope me-2"></i>{{ $contact->email }}
                            </p>
                        </div>
                    </div>
                    
                    <div class="border-start border-4 border-primary ps-3 py-1 mb-4">
                        <h5 class="mb-2">Subject: {{ $contact->subject ?: 'No Subject' }}</h5>
                        <p class="mb-0">{{ $contact->message }}</p>
                    </div>
                    
                    <div class="row g-4">
                        <div class="col-12 col-md-6">
                            <div class="card bg-light h-100">
                                <div class="card-body">
                                    <h6 class="card-title text-muted">Message Information</h6>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <i class="fas fa-calendar-alt text-primary me-2"></i>
                                            <strong>Date:</strong> {{ $contact->created_at ? $contact->created_at->format('M d, Y H:i') : 'N/A' }}
                                        </li>
                                        <li>
                                            <i class="fas fa-id-card text-primary me-2"></i>
                                            <strong>ID:</strong> {{ $contact->id }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card bg-light h-100">
                                <div class="card-body">
                                    <h6 class="card-title text-muted">Actions</h6>
                                    <div class="d-flex flex-column gap-2">
                                        <a href="mailto:{{ $contact->email }}" class="btn btn-primary">
                                            <i class="fas fa-reply me-2"></i>Reply
                                        </a>
                                        <form action="{{ route('admin.contact.destroy', ['contact' => $contact->id]) }}" method="POST" class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-outline-danger" onclick="return confirm('Are you sure you want to delete this message?')">
                                                <i class="fas fa-trash me-2"></i>Delete Message
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-end mt-4">
                        <a href="{{ route('admin.contact.index') }}" class="btn btn-outline-secondary">
                            <i class="fas fa-arrow-left me-2"></i>Back to Messages
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection