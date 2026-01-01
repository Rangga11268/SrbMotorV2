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
    Users,
    BadgeCheck,
    RotateCcw,
    XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "danger",
        title: "",
        message: "",
        confirmText: "KONFIRMASI",
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

    const resetFilters = () => {
        setSearch("");
        router.get(route("admin.users.index"));
    };

    const confirmDelete = (user) => {
        if (user.id === filters.current_user_id) {
            toast.error("TIDAK IZIN: ANDA TIDAK DAPAT MENGHAPUS AKUN SENDIRI");
            return;
        }

        setModalConfig({
            isOpen: true,
            type: "danger",
            title: "ELIMINASI PERSONALIA",
            message: `PERINGATAN: Akun "${user.name}" akan dihapus permanen dari database. Lanjutkan eksekusi?`,
            confirmText: "MUSNAHKAN",
            onConfirm: () => handleDelete(user.id),
        });
    };

    const handleDelete = (id) => {
        setProcessing(true);
        router.delete(route("admin.users.destroy", id), {
            onSuccess: () => {
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                setProcessing(false);
                toast.success("PERSONALIA DIHAPUS DARI DATABASE");
            },
            onError: () => {
                setProcessing(false);
                toast.error("GAGAL MENGEKSEKUSI PERINTAH");
            },
        });
    };

    const confirmRoleChange = (user, newRole) => {
        const isPromoting = newRole === "admin";
        setModalConfig({
            isOpen: true,
            type: isPromoting ? "info" : "warning",
            title: isPromoting ? "ESKALASI HAK AKSES" : "DE-ESKALASI HAK AKSES",
            message: isPromoting
                ? `Berikan akses ADMINISTRATOR penuh kepada "${user.name}"?`
                : `Cabut akses Administrator dari "${user.name}" dan jadikan USER BIASA?`,
            confirmText: isPromoting ? "BERIKAN AKSES" : "CABUT AKSES",
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
                    toast.success(
                        `HAK AKSES DIPERBARUI: ${newRole.toUpperCase()}`
                    );
                },
                onError: () => {
                    setProcessing(false);
                    toast.error("GAGAL MENGUBAH AKSES");
                },
            }
        );
    };

    const getInitials = (name) => {
        return name
            ? name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()
            : "??";
    };

    const getGradient = (name) => {
        const charCode = name.charCodeAt(0);
        if (charCode % 5 === 0)
            return "bg-gradient-to-br from-blue-500 to-indigo-600";
        if (charCode % 5 === 1)
            return "bg-gradient-to-br from-emerald-500 to-teal-600";
        if (charCode % 5 === 2)
            return "bg-gradient-to-br from-indigo-500 to-purple-600";
        if (charCode % 5 === 3)
            return "bg-gradient-to-br from-rose-500 to-red-600";
        return "bg-gradient-to-br from-amber-500 to-orange-600";
    };

    return (
        <AdminLayout title="MANAJEMEN PERSONALIA">
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

            <div className="space-y-8">
                {/* Header Control Panel */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-white/50 font-mono uppercase tracking-widest text-xs mb-2">
                            DATABASE SISTEM
                        </h2>
                        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wide flex items-center gap-3">
                            <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                            DIREKTORI PENGGUNA
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                            <Users size={16} className="text-blue-400" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                TOTAL ENTITAS:
                            </span>
                            <span className="text-lg font-bold text-white font-mono">
                                {users.total}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Glassmorphic Filter Bar */}
                <div className="bg-zinc-900/50 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:w-96 group"
                    >
                        <input
                            type="text"
                            placeholder="CARI ID / NAMA / EMAIL..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-white/20 font-mono text-sm transition-all"
                        />
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-blue-400 transition-colors"
                            size={18}
                        />
                    </form>

                    {search && (
                        <button
                            onClick={resetFilters}
                            className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold font-mono text-xs uppercase flex items-center gap-2"
                        >
                            <RotateCcw size={16} />
                            RESET FILTER
                        </button>
                    )}
                </div>

                {/* Data Grid */}
                <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-white/40 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                                    <th className="p-6">IDENTITAS</th>
                                    <th className="p-6">KONTAK DIGITAL</th>
                                    <th className="p-6">PROTOKOL AKSES</th>
                                    <th className="p-6 text-right">
                                        TERDAFTAR
                                    </th>
                                    <th className="p-6 text-center">
                                        TINDAKAN
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg text-white shadow-lg ${getGradient(
                                                            user.name
                                                        )}`}
                                                    >
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm font-display uppercase tracking-wide group-hover:text-blue-400 transition-colors">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-[10px] font-mono text-white/30 mt-1 uppercase tracking-wider flex items-center gap-2">
                                                            ID: #
                                                            {user.id
                                                                .toString()
                                                                .padStart(
                                                                    6,
                                                                    "0"
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center gap-3 group/mail p-2 rounded-lg hover:bg-white/5 w-fit transition-colors">
                                                    <Mail
                                                        size={14}
                                                        className="text-white/30 group-hover/mail:text-blue-400 transition-colors"
                                                    />
                                                    <span className="font-mono text-xs text-white/60 group-hover/mail:text-white transition-colors">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                {user.role === "admin" ? (
                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)] text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                                                        <BadgeCheck size={14} />{" "}
                                                        // Ganti Shield dengan
                                                        BadgeCheck ADMINISTRATOR
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-wider">
                                                        <User size={14} />
                                                        PENGGUNA STANDAR
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-6 text-right">
                                                <div className="text-[10px] font-mono text-white/40">
                                                    <div className="flex items-center justify-end gap-1.5 mb-1">
                                                        <Calendar size={10} />
                                                        {new Date(
                                                            user.created_at
                                                        )
                                                            .toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )
                                                            .toUpperCase()}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    {user.role === "admin" ? (
                                                        <button
                                                            onClick={() =>
                                                                confirmRoleChange(
                                                                    user,
                                                                    "user"
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all group/btn"
                                                            title="Turunkan ke Pengguna Biasa"
                                                        >
                                                            <ShieldAlert
                                                                size={16}
                                                            />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                confirmRoleChange(
                                                                    user,
                                                                    "admin"
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-white/5 text-white/40 border border-white/10 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all group/btn"
                                                            title="Promosikan ke Administrator"
                                                        >
                                                            <Shield size={16} />
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(user)
                                                        }
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                                                        title="Hapus Pengguna"
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
                                            <div className="flex flex-col items-center justify-center text-white/20">
                                                <div className="bg-white/5 p-4 rounded-full mb-4">
                                                    <User
                                                        size={48}
                                                        strokeWidth={1}
                                                    />
                                                </div>
                                                <p className="text-lg font-bold font-display uppercase tracking-widest text-white/40">
                                                    DATA NIHIL
                                                </p>
                                                <p className="text-xs font-mono text-white/20 mt-2">
                                                    TIDAK DITEMUKAN ENTITAS YANG
                                                    COCOK
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
                        <div className="p-6 border-t border-white/5 flex justify-center bg-black/20">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {users.links.map((link, index) => {
                                    if (!link.url && !link.label) return null;
                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                                                link.active
                                                    ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                                    : "bg-white/5 text-white/50 border-white/5 hover:border-white/20 hover:text-white"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-white/5 text-white/20 border border-transparent cursor-not-allowed"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
