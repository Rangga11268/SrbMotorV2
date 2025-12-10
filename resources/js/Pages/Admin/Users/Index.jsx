import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    Search,
    User as UserIcon,
    Trash2,
    Shield,
    ShieldAlert,
    CheckCircle,
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
            confirmText: "Hapus",
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
            message: `Apakah anda yakin ingin mengubah role "${
                user.name
            }" menjadi ${newRole === "admin" ? "Admin" : "User"}?`,
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

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserIcon className="text-primary" /> Daftar Pengguna
                    </h2>

                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:w-auto"
                    >
                        <input
                            type="text"
                            placeholder="Cari user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full md:w-64"
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                        />
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="p-4 rounded-tl-xl">Nama</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Bergabung</th>
                                <th className="p-4 rounded-tr-xl text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                                        user.role === "admin"
                                                            ? "bg-primary"
                                                            : "bg-gray-400"
                                                    }`}
                                                >
                                                    {user.name.charAt(0)}
                                                </div>
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            {user.role === "admin" ? (
                                                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                                    <Shield size={14} /> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Role Toggle */}
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
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        user.role === "admin"
                                                            ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                                            : "bg-green-50 text-green-600 hover:bg-green-100"
                                                    }`}
                                                    title={
                                                        user.role === "admin"
                                                            ? "Ubah ke User"
                                                            : "Jadikan Admin"
                                                    }
                                                >
                                                    {user.role === "admin" ? (
                                                        <ShieldAlert
                                                            size={18}
                                                        />
                                                    ) : (
                                                        <Shield size={18} />
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        confirmDelete(user)
                                                    }
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Hapus User"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Data user tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <div className="flex gap-2">
                        {users.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                                        link.active
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className="px-4 py-2 rounded-lg text-sm font-bold bg-gray-50 text-gray-300 cursor-not-allowed"
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
