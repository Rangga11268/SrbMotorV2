import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    Search,
    MessageSquare,
    Trash2,
    Mail,
    Clock,
    ShieldAlert,
    CheckCircle,
    ChevronRight,
    Inbox,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Index({ contactMessages, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "danger",
        title: "",
        message: "",
        onConfirm: () => {},
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.contact.index"),
            { search },
            { preserveState: true }
        );
    };

    const confirmDelete = (id) => {
        setModalConfig({
            isOpen: true,
            type: "danger",
            title: "HAPUS PESAN?",
            message:
                "Apakah anda yakin ingin memusnahkan pesan ini dari database? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.",
            onConfirm: () => handleDelete(id),
        });
    };

    const handleDelete = (id) => {
        router.delete(route("admin.contact.destroy", id), {
            onSuccess: () => {
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("PESAN BERHASIL DIHAPUS");
            },
            onError: () => {
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.error("GAGAL MENGHAPUS PESAN");
            },
        });
    };

    return (
        <AdminLayout title="PUSAT KOMUNIKASI">
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText="MUSNAHKAN"
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
            />

            <div className="space-y-8">
                {/* Header Control Panel */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-white/50 font-mono uppercase tracking-widest text-xs mb-2">
                            MODUL KOMUNIKASI EKSTERNAL
                        </h2>
                        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wide flex items-center gap-3">
                            <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                            INBOX PESAN
                        </h1>
                    </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden relative">
                    <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <Inbox size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg font-display uppercase tracking-wide">
                                    PESAN MASUK
                                </h3>
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                    {contactMessages.total} PESAN TERENKRIPSI
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="relative w-full md:w-80 group"
                        >
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-white/40 group-focus-within:text-blue-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="CARI KATA KUNCI..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-white placeholder-white/20 transition-all"
                            />
                        </form>
                    </div>

                    <div className="p-6 grid grid-cols-1 gap-4">
                        {contactMessages.data.length > 0 ? (
                            contactMessages.data.map((message) => (
                                <div
                                    key={message.id}
                                    className="group relative bg-black/40 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 transition-all hover:bg-white/5"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Avatar / Identity */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-lg font-bold text-white font-display">
                                                {message.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h3 className="text-lg font-bold text-white font-display tracking-wide truncate pr-4">
                                                    {message.subject}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                                        <Clock size={10} />
                                                        {new Date(
                                                            message.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-mono text-white/50">
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    {message.name}
                                                </span>
                                                <span className="text-white/20">
                                                    |
                                                </span>
                                                <a
                                                    href={`mailto:${message.email}`}
                                                    className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                                                >
                                                    <Mail size={12} />
                                                    {message.email}
                                                </a>
                                            </div>

                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-white/80 leading-relaxed font-sans">
                                                {message.message}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex md:flex-col gap-2 justify-end sm:justify-start">
                                            <a
                                                href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                                                className="p-3 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl border border-blue-500/20 hover:border-blue-500 transition-all group/btn"
                                                title="Balas Pesan"
                                            >
                                                <ChevronRight
                                                    size={18}
                                                    className="group-hover/btn:translate-x-1 transition-transform"
                                                />
                                            </a>
                                            <button
                                                onClick={() =>
                                                    confirmDelete(message.id)
                                                }
                                                className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 hover:border-red-500 transition-all"
                                                title="Hapus Pesan"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-inner">
                                    <Inbox
                                        className="text-white/20"
                                        size={32}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide mb-2">
                                    KOTAK MASUK KOSONG
                                </h3>
                                <p className="text-white/40 text-sm font-mono max-w-sm mx-auto">
                                    TIDAK ADA DATA PESAN YANG DITEMUKAN DALAM
                                    SISTEM SAAT INI.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {contactMessages.links &&
                        contactMessages.links.length > 3 && (
                            <div className="p-6 border-t border-white/5 flex justify-center">
                                <div className="flex gap-2">
                                    {contactMessages.links.map((link, index) =>
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                                className={`h-10 px-4 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all ${
                                                    link.active
                                                        ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500"
                                                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5"
                                                }`}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                                className="h-10 px-4 flex items-center justify-center rounded-lg text-xs font-mono font-bold bg-black/20 text-white/20 border border-white/5 cursor-not-allowed"
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
