import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Bike,
    CheckCircle,
    XCircle,
    Calendar,
    Tag,
    Settings,
    Gauge,
    Fuel,
    Cog,
} from "lucide-react";

export default function Show({ motor }) {
    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route("admin.motors.destroy", motor.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    // Helper to parse specifications if they are an array (from backend)
    const specs = Array.isArray(motor.specifications)
        ? motor.specifications.reduce(
              (acc, spec) => ({ ...acc, [spec.spec_key]: spec.spec_value }),
              {}
          )
        : motor.specifications || {};

    return (
        <AdminLayout title={`Detail Motor: ${motor.name}`}>
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Hapus Motor Permanen?"
                message={`PERINGATAN: Anda akan menghapus "${motor.name}". Tindakan ini tidak dapat dibatalkan dan motor akan hilang dari katalog.`}
                confirmText="Ya, Hapus Permanen"
                cancelText="Batal"
                onConfirm={handleDelete}
                type="danger"
                processing={isDeleting}
            />

            <div className="max-w-7xl mx-auto">
                {/* Navigation Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <Link
                        href={route("admin.motors.index")}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="text-sm">Kembali ke Daftar</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("admin.motors.edit", motor.id)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-100"
                        >
                            <Edit size={16} /> Edit Data
                        </Link>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="px-4 py-2 bg-white text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-colors flex items-center gap-2 border border-gray-200 hover:border-rose-200"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Image & Quick Stats (1/3) */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Main Image Card */}
                        <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-50 rounded-[1.5rem] relative overflow-hidden group">
                                {motor.image_path ? (
                                    <img
                                        src={`/storage/${motor.image_path}`}
                                        alt={motor.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <Bike size={64} opacity={0.5} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span
                                        className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow-sm ${
                                            motor.brand === "Yamaha"
                                                ? "bg-blue-600 text-white"
                                                : motor.brand === "Honda"
                                                ? "bg-red-600 text-white"
                                                : "bg-gray-800 text-white"
                                        }`}
                                    >
                                        {motor.brand}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Status & Harga
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-sm font-bold text-gray-500">
                                        Ketersediaan
                                    </span>
                                    {motor.tersedia ? (
                                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-white px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Stok Tersedia
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-rose-700 bg-white px-3 py-1 rounded-full text-xs font-bold border border-rose-100 shadow-sm">
                                            <XCircle size={12} /> Stok Habis
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                                    <p className="text-xs font-bold text-primary/60 uppercase mb-1">
                                        Harga OTR
                                    </p>
                                    <p className="text-2xl font-black text-primary">
                                        Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            motor.price
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details & Specs (2/3) */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Main Info */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h1 className="text-3xl font-black text-gray-900 mb-2">
                                {motor.name}
                            </h1>
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-6">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                                    <Tag size={14} /> {motor.type || "Standard"}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                                    <Calendar size={14} /> Tahun {motor.year}
                                </span>
                            </div>

                            {motor.details && (
                                <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                    <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2">
                                        <Bike
                                            size={16}
                                            className="text-primary"
                                        />{" "}
                                        Deskripsi Unit
                                    </h4>
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {motor.details}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Technical Specs */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <Settings className="text-primary" size={20} />
                                Spesifikasi Teknis
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <SpecItem
                                    label="Tipe Mesin"
                                    value={specs.engine_type}
                                    icon={<Cog size={18} />}
                                />
                                <SpecItem
                                    label="Kapasitas Mesin"
                                    value={
                                        specs.engine_size
                                            ? `${specs.engine_size} cc`
                                            : null
                                    }
                                    icon={<Gauge size={18} />}
                                />
                                <SpecItem
                                    label="Sistem Bahan Bakar"
                                    value={specs.fuel_system}
                                    icon={<Fuel size={18} />}
                                />
                                <SpecItem
                                    label="Transmisi"
                                    value={specs.transmission}
                                    icon={<Settings size={18} />}
                                />
                                <SpecItem
                                    label="Tenaga Maksimum"
                                    value={
                                        specs.max_power
                                            ? `${specs.max_power} kW`
                                            : null
                                    }
                                    icon={<Gauge size={18} />}
                                />
                                <SpecItem
                                    label="Torsi Maksimum"
                                    value={
                                        specs.max_torque
                                            ? `${specs.max_torque} Nm`
                                            : null
                                    }
                                    icon={<Gauge size={18} />}
                                />
                            </div>

                            {specs.additional_specs && (
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">
                                        Catatan Tambahan
                                    </h4>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        {specs.additional_specs}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Sub-component for Spec Items
function SpecItem({ label, value, icon }) {
    return (
        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">
                    {label}
                </p>
                <p className="text-gray-900 font-bold">
                    {value || (
                        <span className="text-gray-300 italic">
                            Tidak ada data
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}
