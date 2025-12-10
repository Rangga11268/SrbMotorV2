import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
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
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Index({ motors, filters }) {
    const { auth } = usePage().props;

    // Search handling
    const [search, setSearch] = useState(filters.search || "");

    // Modal State
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

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Bike className="text-primary" /> Daftar Motor
                    </h2>

                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Cari unit motor..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full md:w-64"
                            />
                            <Search
                                className="absolute left-3 top-2.5 text-gray-400"
                                size={18}
                            />
                        </form>

                        <Link
                            href={route("admin.motors.create")}
                            className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-dark-blue transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> Tambah Motor
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="p-4 rounded-tl-xl">Gambar</th>
                                <th className="p-4">Nama Motor</th>
                                <th className="p-4">Brand</th>
                                <th className="p-4">Tahun</th>
                                <th className="p-4">Harga</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 rounded-tr-xl text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {motors.data.length > 0 ? (
                                motors.data.map((motor) => (
                                    <tr
                                        key={motor.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                                                <img
                                                    src={`/storage/${motor.image_path}`}
                                                    alt={motor.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-gray-800">
                                            {motor.name}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    motor.brand === "Yamaha"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {motor.brand}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {motor.year}
                                        </td>
                                        <td className="p-4 font-bold text-dark-blue">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor.price)}
                                        </td>
                                        <td className="p-4">
                                            {motor.tersedia ? (
                                                <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                                                    <CheckCircle size={14} />{" "}
                                                    Tersedia
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                                                    <XCircle size={14} /> Stok
                                                    Habis
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={route(
                                                        "admin.motors.edit",
                                                        motor.id
                                                    )}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(motor)
                                                    }
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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
                                        colSpan="7"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Data motor tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <div className="flex gap-2">
                        {motors.links.map((link, index) =>
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
