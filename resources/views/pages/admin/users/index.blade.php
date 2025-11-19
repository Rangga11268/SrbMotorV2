@extends('layouts.admin')

@section('title', 'Pengguna')

@section('breadcrumb')
    <li class="breadcrumb-item active" aria-current="page">Pengguna</li>
@endsection

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
                            <th class="border-top-0" style="width: 5%">No.</th>
                            <th class="border-top-0" style="width: 20%">Nama</th>
                            <th class="border-top-0" style="width: 25%" class="d-none d-lg-table-cell">Email</th>
                            <th class="border-top-0" style="width: 15%">Peran</th>
                            <th class="border-top-0" style="width: 20%" class="d-none d-xl-table-cell">Dibuat</th>
                            <th class="border-top-0" style="width: 15%">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($users as $index => $user)
                        <tr>
                            <td>{{ $users->firstItem() + $index }}</td>
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
                                <span class="badge
                                    @if($user->role === 'admin')
                                        bg-warning text-dark
                                    @else
                                        bg-secondary
                                    @endif">
                                    {{ $user->role === 'admin' ? 'Admin' : 'Pengguna' }}
                                </span>
                            </td>
                            <td class="d-none d-xl-table-cell">{{ $user->created_at ? $user->created_at->format('d M Y') : 'Tidak Tersedia' }}</td>
                            <td>
                                <div class="d-flex flex-md-row flex-column gap-md-2 gap-2">
                                    <button type="button" class="btn btn-sm btn-outline-primary flex-fill edit-role-btn"
                                        data-user-id="{{ $user->id }}"
                                        data-user-name="{{ $user->name }}"
                                        data-user-role="{{ $user->role }}">
                                        <i class="fas fa-edit d-none d-md-inline me-1"></i>Ubah
                                    </button>
                                    @if($user->id !== auth()->id())
                                    <form action="{{ route('admin.users.destroy', ['user' => $user->id]) }}" method="POST" class="d-inline w-100 delete-user-form">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger flex-fill delete-user-btn" title="Hapus">
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

<!-- Modal for editing user role -->
<div class="modal fade" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editRoleModalLabel">Ubah Peran Pengguna</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Apakah Anda yakin ingin mengubah peran pengguna <strong id="userNameDisplay"></strong>?</p>
                <form id="editRoleForm" method="POST" action="">
                    @csrf
                    @method('PUT')
                    <div class="mb-3">
                        <label for="roleSelect" class="form-label">Pilih Peran Baru</label>
                        <select class="form-select" id="roleSelect" name="role">
                            <option value="user">Pengguna</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-primary" id="saveRoleBtn">Simpan Perubahan</button>
            </div>
        </div>
    </div>
</div>

<!-- Inline script to ensure functionality works -->
<script type="text/javascript">
    // Additional script to ensure edit role functionality works
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOMContentLoaded event fired for inline script");

        // Function to handle role updates
        function updateRole(userId, newRole) {
            // Create a temporary form and submit it
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '{{ route("admin.users.update", ":id") }}'.replace(':id', userId);

            // Add CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]');
            if (csrfToken) {
                const hiddenToken = document.createElement('input');
                hiddenToken.type = 'hidden';
                hiddenToken.name = '_token';
                hiddenToken.value = csrfToken.getAttribute('content');
                form.appendChild(hiddenToken);
            }

            // Add method spoofing for PUT request
            const hiddenMethod = document.createElement('input');
            hiddenMethod.type = 'hidden';
            hiddenMethod.name = '_method';
            hiddenMethod.value = 'PUT';
            form.appendChild(hiddenMethod);

            // Add role field
            const roleField = document.createElement('input');
            roleField.type = 'hidden';
            roleField.name = 'role';
            roleField.value = newRole;
            form.appendChild(roleField);

            // Append to body and submit
            document.body.appendChild(form);
            form.submit();
        }

        // Add click event listeners to edit buttons
        const editButtons = document.querySelectorAll('.edit-role-btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                const userName = this.getAttribute('data-user-name');
                const userRole = this.getAttribute('data-user-role');

                console.log("Edit role button clicked for user ID:", userId);

                // Set the values in the modal
                document.getElementById('userNameDisplay').textContent = userName;
                document.getElementById('roleSelect').value = userRole;

                // Store the userId in the save button for later use
                document.getElementById('saveRoleBtn').setAttribute('data-user-id', userId);

                // Show the modal using Bootstrap's JS API
                const modalElement = document.getElementById('editRoleModal');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            });
        });

        // Add click event listener to save button
        document.getElementById('saveRoleBtn').addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            const newRole = document.getElementById('roleSelect').value;
            const userName = document.getElementById('userNameDisplay').textContent;

            // Show SweetAlert confirmation
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: 'Peran pengguna ' + userName + ' akan diubah menjadi ' + (newRole === 'admin' ? 'Admin' : 'Pengguna'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, ubah!',
                cancelButtonText: 'Batal'
            }).then(function(result) {
                if (result.isConfirmed) {
                    updateRole(userId, newRole);
                }
            });
        });
    });
</script>
@endsection

@push('scripts')
<script type="text/javascript">
    // Scripts that need to go through the Vite pipeline can be placed here
    // Currently using the inline script above for role update functionality
    console.log("Additional scripts loaded via Vite");
</script>
@endpush