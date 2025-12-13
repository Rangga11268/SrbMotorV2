import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    Search,
    User,
    Trash2,
    Shield,
    ShieldAlert,
    CheckCircle,
    MoreHorizontal,
    Mail,
    Calendar,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "danger",
        title: "",
        message: "",
        confirmText: "Confirm",
        onConfirm: () => {},
    });
    const [processing, setProcessing] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.users.index"),
            { search },
            { preserveState: true, replace: true }
        );
    };

    const confirmDelete = (user) => {
        if (user.id === filters.current_user_id) {
            toast.error("Anda tidak dapat menghapus akun sendiri!");
            return;
        }

        setModalConfig({
            isOpen: true,
            type: "danger",
            title: "Hapus Pengguna?",
            message: `Anda akan menghapus pengguna "${user.name}". Tindakan ini tidak dapat dibatalkan.`,
            confirmText: "Hapus Permanen",
            onConfirm: () => handleDelete(user.id),
        });
    };

    const handleDelete = (id) => {
        setProcessing(true);
        router.delete(route("admin.users.destroy", id), {
            onSuccess: () => {
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                setProcessing(false);
                toast.success("Pengguna berhasil dihapus.");
            },
            onError: () => {
                setProcessing(false);
                toast.error("Gagal menghapus pengguna.");
            },
        });
    };

    const confirmRoleChange = (user, newRole) => {
        setModalConfig({
            isOpen: true,
            type: "warning",
            title: "Ubah Role Pengguna?",
            message: `Apakah anda yakin ingin mengubah akses "${
                user.name
            }" menjadi ${
                newRole === "admin" ? "ADMINISTRATOR" : "USER BIASA"
            }?`,
            confirmText: "Ya, Ubah Role",
            onConfirm: () => handleRoleChange(user.id, newRole),
        });
    };

    const handleRoleChange = (id, newRole) => {
        setProcessing(true);
        router.put(
            route("admin.users.update", id),
            { role: newRole },
            {
                onSuccess: () => {
                    setModalConfig((prev) => ({ ...prev, isOpen: false }));
                    setProcessing(false);
                    toast.success(`Role berhasil diubah menjadi ${newRole}`);
                },
                onError: () => {
                    setProcessing(false);
                    toast.error("Gagal mengubah role.");
                },
            }
        );
    };

    // Helper to generate initials
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    // Helper for random gradient based on name
    const getGradient = (name) => {
        const colors = [
            "from-blue-400 to-indigo-500",
            "from-emerald-400 to-teal-500",
            "from-orange-400 to-rose-500",
            "from-purple-400 to-fuchsia-500",
            "from-pink-400 to-rose-500",
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    return (
        <AdminLayout title="Manajemen User">
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText={modalConfig.confirmText}
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
                processing={processing}
            />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">
                            Daftar Pengguna
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola akses dan data pengguna aplikasi
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:w-80 group"
                    >
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-gray-600 transition-all font-medium text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 group-hover:bg-gray-50/80 dark:group-hover:bg-gray-700/80"
                        />
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors"
                            size={20}
                        />
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                    <th className="p-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        Pengguna
                                    </th>
                                    <th className="p-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        Kontak
                                    </th>
                                    <th className="p-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        Role Access
                                    </th>
                                    <th className="p-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        Bergabung
                                    </th>
                                    <th className="p-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getGradient(
                                                            user.name
                                                        )} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform`}
                                                    >
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white text-base">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                                                            ID: #{user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
                                                    <Mail
                                                        size={16}
                                                        className="text-gray-300 dark:text-gray-500"
                                                    />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {user.role === "admin" ? (
                                                    <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                                        <Shield
                                                            size={12}
                                                            className="fill-blue-700 dark:fill-blue-300"
                                                        />{" "}
                                                        Administrator
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 px-3 py-1.5 rounded-full text-xs font-bold">
                                                        <User size={12} /> User
                                                        Regular
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                    <Calendar
                                                        size={16}
                                                        className="text-gray-300 dark:text-gray-500"
                                                    />
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-2 opacity-100">
                                                    <button
                                                        onClick={() =>
                                                            confirmRoleChange(
                                                                user,
                                                                user.role ===
                                                                    "admin"
                                                                    ? "user"
                                                                    : "admin"
                                                            )
                                                        }
                                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm border ${
                                                            user.role ===
                                                            "admin"
                                                                ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                                                                : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                                                        }`}
                                                        title={
                                                            user.role ===
                                                            "admin"
                                                                ? "Turunkan ke User"
                                                                : "Jadikan Admin"
                                                        }
                                                    >
                                                        {user.role ===
                                                        "admin" ? (
                                                            <ShieldAlert
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <Shield size={16} />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(user)
                                                        }
                                                        className="w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800 flex items-center justify-center hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-sm"
                                                        title="Hapus User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="p-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-300 dark:text-gray-600">
                                                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-full mb-4 transition-colors">
                                                    <User
                                                        size={48}
                                                        className="opacity-50"
                                                    />
                                                </div>
                                                <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                                                    Tidak ada pengguna
                                                    ditemukan.
                                                </p>
                                                <p className="text-sm">
                                                    Coba kata kunci pencarian
                                                    lain.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links.length > 3 && (
                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-center bg-gray-50/30 dark:bg-gray-900/30 transition-colors">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {users.links.map((link, index) =>
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                                                link.active
                                                    ? "bg-primary text-white shadow-primary/30 scale-105"
                                                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-transparent"
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
