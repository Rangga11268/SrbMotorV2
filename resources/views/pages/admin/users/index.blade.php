@extends('layouts.admin')

@section('title', 'Users')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="h3 mb-0">User Management</h1>
            <p class="text-muted mb-0">Manage all system users and their roles</p>
        </div>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-md-8">
                    <label for="search" class="form-label">Search Users</label>
                    <input type="text" name="search" class="form-control" placeholder="Search by name or email..." value="{{ request('search') }}">
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <a href="{{ route('admin.users.index') }}" class="btn btn-outline-secondary w-100">
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
                            <th class="border-top-0" style="width: 25%">Email</th>
                            <th class="border-top-0" style="width: 15%">Role</th>
                            <th class="border-top-0" style="width: 20%">Created</th>
                            <th class="border-top-0" style="width: 15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($users as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="avatar bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div>
                                        <span class="fw-medium">{{ $user->name }}</span>
                                        @if($user->id === auth()->id())
                                        <span class="badge bg-info bg-opacity-10 text-info ms-2">You</span>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="mailto:{{ $user->email }}">{{ $user->email }}</a>
                            </td>
                            <td>
                                <form action="{{ route('admin.users.update', $user) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('PUT')
                                    <select name="role" class="form-select form-select-sm bg-white" onchange="if(confirm('Are you sure you want to change the role?')) this.form.submit(); else return false;">
                                        <option value="user" {{ $user->role === 'user' ? 'selected' : '' }}>User</option>
                                        <option value="admin" {{ $user->role === 'admin' ? 'selected' : '' }}>Admin</option>
                                    </select>
                                </form>
                            </td>
                            <td>{{ $user->created_at ? $user->created_at->format('M d, Y') : 'N/A' }}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    @if($user->id !== auth()->id())
                                    <form action="{{ route('admin.users.destroy', ['user' => $user->id]) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger" title="Delete" onclick="return confirm('Are you sure you want to delete this user? All their data will be removed.')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                    @else
                                    <!-- For current user, show disabled button -->
                                    <button class="btn btn-sm btn-outline-secondary" disabled title="Cannot delete own account">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    @endif
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="6" class="text-center py-4">
                                <div class="empty-state">
                                    <i class="fas fa-users fa-3x text-muted mb-3"></i>
                                    <h5 class="text-muted">No users found</h5>
                                    <p class="text-muted mb-0">No users have been registered yet</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            
            @if(method_exists($users, 'hasPages') && $users->hasPages())
            <div class="card-footer bg-white">
                {{ $users->appends(['search' => request('search')])->links() }}
            </div>
            @endif
        </div>
    </div>
</div>
@endsection