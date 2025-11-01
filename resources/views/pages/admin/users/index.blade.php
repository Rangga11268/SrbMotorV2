@extends('layouts.admin')

@section('title', 'Pengguna')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Manajemen Pengguna</h1>
            <p class="text-muted mb-0 d-md-none d-block">Kelola semua pengguna sistem dan peran mereka</p>
        </div>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-12 col-md-8">
                    <label for="search" class="form-label">Cari Pengguna</label>
                    <input type="text" name="search" class="form-control" placeholder="Cari berdasarkan nama atau email..." value="{{ request('search') }}">
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Cari
                    </button>
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <a href="{{ route('admin.users.index') }}" class="btn btn-outline-secondary w-100">
                        <i class="fas fa-sync-alt me-1"></i> Atur Ulang
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
                            <th class="border-top-0" style="width: 20%">Nama</th>
                            <th class="border-top-0" style="width: 25%" class="d-none d-lg-table-cell">Email</th>
                            <th class="border-top-0" style="width: 15%">Peran</th>
                            <th class="border-top-0" style="width: 20%" class="d-none d-xl-table-cell">Dibuat</th>
                            <th class="border-top-0" style="width: 15%">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($users as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="avatar bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style="width: 35px; height: 35px;">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div>
                                        <span class="fw-medium d-block d-md-inline">{{ $user->name }}</span>
                                        @if($user->id === auth()->id())
                                        <span class="badge bg-info bg-opacity-10 text-info ms-2 d-block d-md-inline">Anda</span>
                                        @else
                                        <span class="d-block d-md-none text-muted small">{{ $user->email }}</span>
                                        @endif
                                        <span class="d-md-none d-block text-muted small">{{ $user->created_at ? $user->created_at->format('d M Y') : 'Tidak Tersedia' }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="d-none d-lg-table-cell">
                                <a href="mailto:{{ $user->email }}">{{ $user->email }}</a>
                            </td>
                            <td>
                                <form action="{{ route('admin.users.update', $user) }}" method="POST" class="d-inline role-form">
                                    @csrf
                                    @method('PUT')
                                    <select name="role" class="form-select form-select-sm bg-white role-select">
                                        <option value="user" {{ $user->role === 'user' ? 'selected' : '' }}>Pengguna</option>
                                        <option value="admin" {{ $user->role === 'admin' ? 'selected' : '' }}>Admin</option>
                                    </select>
                                </form>
                            </td>
                            <td class="d-none d-xl-table-cell">{{ $user->created_at ? $user->created_at->format('d M Y') : 'Tidak Tersedia' }}</td>
                            <td>
                                <div class="d-flex flex-md-row flex-column gap-md-2 gap-2">
                                    @if($user->id !== auth()->id())
                                    <form action="{{ route('admin.users.destroy', ['user' => $user->id]) }}" method="POST" class="d-inline w-100">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger flex-fill" title="Hapus" onclick="return confirm('Apakah Anda yakin ingin menghapus pengguna ini? Semua data mereka akan dihapus.')">
                                            <i class="fas fa-trash d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Hapus</span>
                                        </button>
                                    </form>
                                    @else
                                    <!-- For current user, show disabled button -->
                                    <button class="btn btn-sm btn-outline-secondary flex-fill" disabled title="Tidak dapat menghapus akun sendiri">
                                        <i class="fas fa-trash d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Hapus</span>
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
                                    <h5 class="text-muted">Tidak ada pengguna ditemukan</h5>
                                    <p class="text-muted mb-0">Belum ada pengguna yang terdaftar</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            
            @if(method_exists($users, 'hasPages') && $users->hasPages())
            <div class="card-footer bg-white">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="mb-2 mb-md-0">
                        Menampilkan {{ $users->firstItem() ? $users->firstItem() : 0 }} hingga {{ $users->lastItem() }} dari {{ $users->total() }} hasil
                    </div>
                    {{ $users->appends(['search' => request('search')])->links() }}
                </div>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Handle role change confirmations
    document.querySelectorAll('select[name="role"]').forEach(select => {
        select.addEventListener('change', function() {
            if (confirm('Apakah Anda yakin ingin mengubah peran pengguna ini?')) {
                this.form.submit();
            } else {
                // Reset to original value if user cancels
                this.form.reset(); 
            }
        });
    });
});
</script>
@endpush