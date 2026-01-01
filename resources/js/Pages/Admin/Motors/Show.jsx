import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Bike,
    Calendar,
    Tag,
    Gauge,
    Fuel,
    Cog,
    Layers,
    Activity,
    Zap,
    Settings,
} from "lucide-react";

export default function Show({ motor }) {
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

    const specs = Array.isArray(motor.specifications)
        ? motor.specifications.reduce(
              (acc, spec) => ({ ...acc, [spec.spec_key]: spec.spec_value }),
              {}
          )
        : motor.specifications || {};

    return (
        <AdminLayout title={`DATA UNIT: ${motor.name}`}>
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="INISIASI PROTOKOL PENGHAPUSAN"
                message={`PERINGATAN: KEHILANGAN DATA PERMANEN AKAN TERJADI. KONFIRMASI PENGHAPUSAN UNIT "${motor.name.toUpperCase()}"?`}
                confirmText="KONFIRMASI HAPUS"
                cancelText="BATAL"
                onConfirm={handleDelete}
                type="danger"
                processing={isDeleting}
            />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        href={route("admin.motors.index")}
                        className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-mono text-sm tracking-wider uppercase">
                            Kembali ke Armada
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("admin.motors.edit", motor.id)}
                            className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl font-bold font-display uppercase tracking-wider hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2 group"
                        >
                            <Edit
                                size={16}
                                className="group-hover:scale-110 transition-transform"
                            />
                            Edit Data Unit
                        </Link>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold font-display uppercase tracking-wider hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center gap-2 group"
                        >
                            <Trash2
                                size={16}
                                className="group-hover:scale-110 transition-transform"
                            />
                            Hapus
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Visual & Status Module */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Image Container */}
                        <div className="bg-zinc-900/50 backdrop-blur-md p-2 rounded-3xl border border-white/5 overflow-hidden group">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                                <div className="absolute inset-0 bg-[url('/assets/img/noise.png')] opacity-10 pointer-events-none z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>

                                {motor.image_path ? (
                                    <img
                                        src={`/storage/${motor.image_path}`}
                                        alt={motor.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                        <Bike size={64} strokeWidth={1} />
                                        <span className="text-[10px] font-mono mt-4 uppercase tracking-widest">
                                            Tidak Ada Visual
                                        </span>
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 z-20">
                                    <span
                                        className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                                            motor.brand === "Yamaha"
                                                ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                                : "bg-red-500/20 text-red-400 border-red-500/50"
                                        }`}
                                    >
                                        {motor.brand}
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-1">
                                            ID Unit
                                        </p>
                                        <p className="font-mono text-white text-xs">
                                            #
                                            {motor.id
                                                .toString()
                                                .padStart(6, "0")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                                <Activity size={14} className="text-accent" />
                                Status Unit
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-black/20 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                                        Ketersediaan
                                    </span>
                                    {motor.tersedia ? (
                                        <span className="flex items-center gap-2 text-[10px] font-bold text-green-400 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Tersedia
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            Kosong
                                        </span>
                                    )}
                                </div>
                                <div className="p-5 bg-accent/5 rounded-xl border border-accent/20 text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                        <Tag
                                            size={48}
                                            className="text-accent"
                                        />
                                    </div>
                                    <p className="text-[10px] font-bold text-accent/60 uppercase tracking-[0.2em] mb-1">
                                        Nilai Aset Saat Ini
                                    </p>
                                    <p className="text-3xl font-black text-accent text-glow font-mono">
                                        Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            motor.price
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Module */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h1 className="text-4xl font-black text-white mb-2 font-display uppercase italic tracking-wide">
                                        {motor.name}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60">
                                            {motor.type || "KELAS STANDAR"}
                                        </span>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60">
                                            MDL {motor.year}
                                        </span>
                                    </div>
                                </div>
                                <Bike
                                    size={48}
                                    className="text-white/10"
                                    strokeWidth={1}
                                />
                            </div>

                            {/* Technical Specs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <SpecItem
                                    label="Tipe Mesin"
                                    value={specs.engine_type}
                                    icon={<Cog size={16} />}
                                />
                                <SpecItem
                                    label="Kapasitas Mesin"
                                    value={
                                        specs.engine_size
                                            ? `${specs.engine_size} cc`
                                            : null
                                    }
                                    icon={<Layers size={16} />}
                                />
                                <SpecItem
                                    label="Sistem Bahan Bakar"
                                    value={specs.fuel_system}
                                    icon={<Fuel size={16} />}
                                />
                                <SpecItem
                                    label="Transmisi"
                                    value={specs.transmission}
                                    icon={<Settings size={16} />}
                                />
                                <SpecItem
                                    label="Tenaga Maksimum"
                                    value={
                                        specs.max_power
                                            ? `${specs.max_power} kW`
                                            : null
                                    }
                                    icon={<Zap size={16} />}
                                />
                                <SpecItem
                                    label="Torsi Maksimum"
                                    value={
                                        specs.max_torque
                                            ? `${specs.max_torque} Nm`
                                            : null
                                    }
                                    icon={<Gauge size={16} />}
                                />
                            </div>

                            {motor.details && (
                                <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                                        <Activity size={12} />
                                        Deskripsi Sistem
                                    </h4>
                                    <p className="text-sm text-white/70 leading-relaxed font-mono whitespace-pre-line">
                                        {motor.details}
                                    </p>
                                </div>
                            )}

                            {specs.additional_specs && (
                                <div className="mt-6 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                                    <h4 className="text-xs font-bold text-blue-400/60 uppercase tracking-widest mb-4 font-mono">
                                        Catatan Tambahan
                                    </h4>
                                    <p className="text-sm text-blue-100/70 leading-relaxed font-mono">
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

function SpecItem({ label, value, icon }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:text-accent transition-colors text-white/50">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1 font-mono">
                    {label}
                </p>
                <p className="text-white font-bold font-display uppercase tracking-wide text-sm">
                    {value || <span className="text-white/10 italic">-</span>}
                </p>
            </div>
        </div>
    );
}
