import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import { Search, MessageSquare, Trash2, Mail, Clock } from "lucide-react";
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
            title: "Hapus Pesan?",
            message:
                "Apakah anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.",
            onConfirm: () => handleDelete(id),
        });
    };

    const handleDelete = (id) => {
        router.delete(route("admin.contact.destroy", id), {
            onSuccess: () => {
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("Pesan berhasil dihapus");
            },
            onError: () => {
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.error("Gagal menghapus pesan");
            },
        });
    };

    return (
        <AdminLayout title="Pesan Kontak">
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText="Hapus"
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
            />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                        <MessageSquare className="text-primary" /> Pesan Masuk
                    </h2>

                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:w-64"
                    >
                        <input
                            type="text"
                            placeholder="Cari pesan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                            size={18}
                        />
                    </form>
                </div>

                <div className="space-y-4">
                    {contactMessages.data.length > 0 ? (
                        contactMessages.data.map((message) => (
                            <div
                                key={message.id}
                                className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all bg-gray-50/50 dark:bg-gray-700/30"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate">
                                                {message.subject}
                                            </h3>
                                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-600">
                                                <Clock size={10} />{" "}
                                                {new Date(
                                                    message.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            <span className="font-medium text-gray-900 dark:text-gray-300">
                                                {message.name}
                                            </span>
                                            <span className="text-gray-300 dark:text-gray-600">
                                                •
                                            </span>
                                            <a
                                                href={`mailto:${message.email}`}
                                                className="text-primary dark:text-blue-400 hover:underline flex items-center gap-1"
                                            >
                                                <Mail size={12} />{" "}
                                                {message.email}
                                            </a>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                                            {message.message}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            confirmDelete(message.id)
                                        }
                                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors shrink-0"
                                        title="Hapus Pesan"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                            <MessageSquare
                                className="mx-auto mb-2 opacity-20"
                                size={48}
                            />
                            <p>Belum ada pesan masuk.</p>
                        </div>
                    )}
                </div>

                {contactMessages.links && contactMessages.links.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex gap-2">
                            {contactMessages.links.map((link, index) =>
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
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                        }`}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className="px-4 py-2 rounded-lg text-sm font-bold bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
