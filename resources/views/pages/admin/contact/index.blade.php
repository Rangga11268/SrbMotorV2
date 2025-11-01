@extends('layouts.admin')

@section('title', 'Pesan Kontak')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 mb-0">Pesan Kontak</h1>
            <p class="text-muted mb-0 d-md-none d-block">Kelola semua pesan kontak yang diterima</p>
        </div>
    </div>
    
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-12 col-md-8">
                    <label for="search" class="form-label">Cari Pesan</label>
                    <input type="text" name="search" class="form-control" placeholder="Cari berdasarkan nama, email atau subjek..." value="{{ request('search') }}">
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="fas fa-search me-1"></i> Cari
                    </button>
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <a href="{{ route('admin.contact.index') }}" class="btn btn-outline-secondary w-100">
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
                            <th class="border-top-0" style="width: 15%">Nama</th>
                            <th class="border-top-0" style="width: 20%" class="d-none d-lg-table-cell">Email</th>
                            <th class="border-top-0" style="width: 25%">Subjek</th>
                            <th class="border-top-0" style="width: 20%" class="d-none d-xl-table-cell">Tanggal</th>
                            <th class="border-top-0" style="width: 15%">Aksi</th>
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
                                        <span class="d-md-none d-block text-muted small">{{ $message->created_at ? $message->created_at->format('d M Y') : 'Tidak Tersedia' }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="d-none d-lg-table-cell">
                                <a href="mailto:{{ $message->email }}">{{ $message->email }}</a>
                            </td>
                            <td>
                                <span class="fw-medium d-block d-md-inline">{{ Str::limit($message->subject ?: 'Tanpa Subjek', 30) }}</span>
                                <div class="text-muted small d-none d-md-block">{{ Str::limit(strip_tags($message->message), 50) }}</div>
                                <div class="text-muted small d-block d-md-none">{{ Str::limit(strip_tags($message->message), 30) }}</div>
                            </td>
                            <td class="d-none d-xl-table-cell">{{ $message->created_at ? $message->created_at->format('d M Y H:i') : 'Tidak Tersedia' }}</td>
                            <td>
                                <div class="d-flex flex-md-row flex-column gap-md-2 gap-2">
                                    <a href="{{ route('admin.contact.show', $message) }}" class="btn btn-sm btn-outline-info flex-fill" title="Lihat">
                                        <i class="fas fa-eye d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Lihat</span>
                                    </a>
                                    <form action="{{ route('admin.contact.destroy', ['contact' => $message->id]) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger flex-fill" title="Hapus" onclick="return confirm('Apakah Anda yakin ingin menghapus pesan ini?')">
                                            <i class="fas fa-trash d-none d-md-inline me-1"></i><span class="d-md-none d-inline">Hapus</span>
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
                                    <h5 class="text-muted">Tidak ada pesan kontak ditemukan</h5>
                                    <p class="text-muted mb-0">Belum ada pesan yang diterima</p>
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
                        Menampilkan {{ $contactMessages->firstItem() ? $contactMessages->firstItem() : 0 }} hingga {{ $contactMessages->lastItem() }} dari {{ $contactMessages->total() }} hasil
                    </div>
                    {{ $contactMessages->appends(['search' => request('search')])->links() }}
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
    // Handle delete confirmations with SweetAlert2
    document.querySelectorAll('form[method="POST"][class*="d-inline"]').forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn && submitBtn.getAttribute('onclick')) {
            submitBtn.removeAttribute('onclick');
            
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the item name for the confirmation message
                const row = form.closest('tr');
                const itemName = row ? row.querySelector('td:nth-child(2) .fw-medium').textContent.trim() || 'pesan' : 'pesan';
                
                Swal.fire({
                    title: 'Apakah Anda yakin?',
                    text: `Pesan "${itemName}" akan dihapus secara permanen.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#043680',
                    cancelButtonColor: '#dc3545',
                    confirmButtonText: 'Ya, hapus!',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        form.submit();
                    }
                });
            });
        }
    });

    // Show success message if exists
    @if(session('success'))
        // Check if SweetAlert2 is loaded before using it
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Berhasil!',
                text: '{{ e(session('success')) }}',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#043680'
            });
        } else {
            console.error('SweetAlert2 is not loaded');
        }
    @endif

    @if(session('error'))
        // Check if SweetAlert2 is loaded before using it
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Kesalahan!',
                text: '{{ e(session('error')) }}',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
            });
        } else {
            console.error('SweetAlert2 is not loaded');
        }
    @endif
});
</script>
@endpush