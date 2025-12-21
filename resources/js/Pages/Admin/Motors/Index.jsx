import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Bike,
    CheckCircle,
    XCircle,
    Filter,
    ChevronDown,
    ArrowRight,
    TriangleAlert,
    Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Index({ motors, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.motors.index"),
            { search },
            { preserveState: true, replace: true }
        );
    };

    const confirmDelete = (motor) => {
        setSelectedMotor(motor);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!selectedMotor) return;
        setProcessing(true);
        router.delete(route("admin.motors.destroy", selectedMotor.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setProcessing(false);
                setSelectedMotor(null);
                toast.success("Data motor berhasil dihapus.");
            },
            onError: () => {
                setProcessing(false);
                toast.error("Gagal menghapus data motor.");
            },
        });
    };

    return (
        <AdminLayout title="Manajemen Motor">
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Hapus Motor?"
                message={`Apakah anda yakin ingin menghapus data motor "${selectedMotor?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Ya, Hapus"
                cancelText="Batal"
                onConfirm={handleDelete}
                type="danger"
                processing={processing}
            />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Kelola katalog unit motor yang tersedia.
                        </p>
                    </div>

                    <Link
                        href={route("admin.motors.create")}
                        className="group inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
                    >
                        <Plus
                            size={20}
                            className="group-hover:rotate-90 transition-transform duration-300"
                        />
                        <span>Tambah Motor</span>
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:max-w-md group"
                    >
                        <input
                            type="text"
                            placeholder="Cari unit motor..."
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

                <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-6">Unit Motor</th>
                                    <th className="p-6">Brand</th>
                                    <th className="p-6">Harga OTR</th>
                                    <th className="p-6">Tahun</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                {motors.data.length > 0 ? (
                                    motors.data.map((motor) => (
                                        <tr
                                            key={motor.id}
                                            className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                        <img
                                                            src={`/storage/${motor.image_path}`}
                                                            alt={motor.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white text-base">
                                                            {motor.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                                                            {motor.type ||
                                                                "Standard"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                                        motor.brand === "Yamaha"
                                                            ? "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                                                            : "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                                                    }`}
                                                >
                                                    {motor.brand}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(motor.price)}
                                                </div>
                                            </td>
                                            <td className="p-6 text-gray-600 dark:text-gray-300 font-medium">
                                                {motor.year}
                                            </td>
                                            <td className="p-6">
                                                {motor.tersedia ? (
                                                    <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 dark:border-emerald-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Tersedia
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-3 py-1 rounded-full text-xs font-bold border border-rose-100 dark:border-rose-800">
                                                        <XCircle size={10} />{" "}
                                                        Stok Habis
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={route(
                                                            "admin.motors.show",
                                                            motor.id
                                                        )}
                                                        className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-sm"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye size={14} />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "admin.motors.edit",
                                                            motor.id
                                                        )}
                                                        className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 flex items-center justify-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm"
                                                        title="Edit Motor"
                                                    >
                                                        <Edit size={14} />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(motor)
                                                        }
                                                        className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800 flex items-center justify-center hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-sm"
                                                        title="Hapus Motor"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-300 dark:text-gray-600">
                                                <Bike
                                                    size={48}
                                                    className="mb-4 opacity-50"
                                                />
                                                <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                                                    Tidak ada motor ditemukan.
                                                </p>
                                                <p className="text-sm">
                                                    Mulai dengan menambahkan
                                                    unit motor baru.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {motors.links.length > 3 && (
                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-center bg-gray-50/30 dark:bg-gray-900/30">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {motors.links.map((link, index) =>
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
                                                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500 cursor-not-allowed border border-transparent"
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
