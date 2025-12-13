import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react"; // Added router
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal"; // Added Modal
import {
    ArrowLeft,
    Save,
    Upload,
    Bike,
    FileText,
    Settings,
    Info,
    Box,
    Trash2,
    AlertTriangle,
} from "lucide-react";

export default function Edit({ motor }) {
    // Helper to parse specifications array into object
    const parseSpecs = (specsArray) => {
        if (!Array.isArray(specsArray)) return {};
        return specsArray.reduce((acc, spec) => {
            acc[spec.spec_key] = spec.spec_value;
            return acc;
        }, {});
    };

    const initialSpecs = parseSpecs(motor.specifications);

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: motor.name || "",
        brand: motor.brand || "Yamaha",
        model: motor.model || "",
        price: motor.price || "",
        year: motor.year || new Date().getFullYear(),
        type: motor.type || "",
        tersedia: motor.tersedia ? 1 : 0,
        image: null,
        details: motor.details || "",
        specifications: {
            engine_type: initialSpecs.engine_type || "",
            engine_size: initialSpecs.engine_size || "",
            fuel_system: initialSpecs.fuel_system || "",
            transmission: initialSpecs.transmission || "",
            max_power: initialSpecs.max_power || "",
            max_torque: initialSpecs.max_torque || "",
            additional_specs: initialSpecs.additional_specs || "",
        },
    });

    const [previewUrl, setPreviewUrl] = useState(
        motor.image_path ? `/storage/${motor.image_path}` : null
    );

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.motors.update", motor.id));
    };

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

    const handleSpecChange = (key, value) => {
        setData("specifications", {
            ...data.specifications,
            [key]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <AdminLayout title={`Edit Motor: ${motor.name}`}>
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
                <Link
                    href={route("admin.motors.index")}
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 font-bold transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-sm">Kembali ke Daftar</span>
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: FORM (2/3) */}
                    <div className="xl:col-span-2 space-y-8">
                        <form onSubmit={handleSubmit} id="edit-motor-form">
                            {/* Basic Info Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Info className="text-primary" size={20} />
                                    Informasi Dasar
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Nama Unit Motor
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-900 dark:text-white text-lg placeholder-gray-300 dark:placeholder-gray-600"
                                        />
                                        {errors.name && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Brand */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Brand / Merek
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.brand}
                                                onChange={(e) =>
                                                    setData(
                                                        "brand",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer font-bold text-gray-700 dark:text-white"
                                            >
                                                <option value="Yamaha">
                                                    Yamaha
                                                </option>
                                                <option value="Honda">
                                                    Honda
                                                </option>
                                                <option value="Kawasaki">
                                                    Kawasaki
                                                </option>
                                                <option value="Suzuki">
                                                    Suzuki
                                                </option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Kategori / Tipe
                                        </label>
                                        <input
                                            type="text"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Harga OTR (Rp)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                                                Rp
                                            </span>
                                            <input
                                                type="number"
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Year */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Tahun Pembuatan
                                        </label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Status Ketersediaan
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("tersedia", 1)
                                                }
                                                className={`py-3 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                                                    data.tersedia == 1
                                                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 shadow-sm"
                                                        : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                }`}
                                            >
                                                Tersedia
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("tersedia", 0)
                                                }
                                                className={`py-3 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                                                    data.tersedia == 0
                                                        ? "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800 shadow-sm"
                                                        : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                }`}
                                            >
                                                Habis
                                            </button>
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Ubah Foto Unit (Opsional)
                                        </label>
                                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-primary/50 hover:bg-blue-50/10 dark:hover:bg-blue-900/10 transition-colors text-center cursor-pointer relative bg-gray-50 dark:bg-gray-700/50 group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                                                <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm group-hover:shadow-md transition-all">
                                                    <Upload
                                                        size={24}
                                                        className="text-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300 block text-sm">
                                                        Klik untuk ganti foto
                                                        unit
                                                    </span>
                                                    <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">
                                                        Biarkan kosong jika
                                                        tidak ingin mengubah
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.image && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.image}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Specifications Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Settings
                                        className="text-gray-400"
                                        size={20}
                                    />
                                    Spesifikasi Teknis
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            key: "engine_type",
                                            label: "Tipe Mesin",
                                            placeholder: "4-Stroke, SOHC",
                                        },
                                        {
                                            key: "engine_size",
                                            label: "Kapasitas Mesin",
                                            suffix: "cc",
                                            placeholder: "155",
                                        },
                                        {
                                            key: "fuel_system",
                                            label: "Sistem Bahan Bakar",
                                            placeholder: "Fuel Injection",
                                        },
                                        {
                                            key: "transmission",
                                            label: "Transmisi",
                                            placeholder: "Otomatis",
                                        },
                                        {
                                            key: "max_power",
                                            label: "Tenaga Maksimum",
                                            suffix: "kW",
                                            placeholder: "11.3",
                                        },
                                        {
                                            key: "max_torque",
                                            label: "Torsi Maksimum",
                                            suffix: "Nm",
                                            placeholder: "13.9",
                                        },
                                    ].map((spec) => (
                                        <div key={spec.key}>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                                {spec.label}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={
                                                        data.specifications[
                                                            spec.key
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        handleSpecChange(
                                                            spec.key,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full pl-4 ${
                                                        spec.suffix
                                                            ? "pr-12"
                                                            : "pr-4"
                                                    } py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm text-gray-900 dark:text-white`}
                                                    placeholder={
                                                        spec.placeholder
                                                    }
                                                />
                                                {spec.suffix && (
                                                    <div className="absolute right-0 top-0 bottom-0 px-4 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 rounded-r-xl flex items-center text-gray-500 dark:text-gray-400 font-bold text-xs pointer-events-none">
                                                        {spec.suffix}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            value={
                                                data.specifications
                                                    .additional_specs
                                            }
                                            onChange={(e) =>
                                                handleSpecChange(
                                                    "additional_specs",
                                                    e.target.value
                                                )
                                            }
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm text-gray-900 dark:text-white"
                                            placeholder="Tuliskan spesifikasi unggulan lainnya..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Danger Zone */}
                        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/50 transition-colors">
                            <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 mb-2 flex items-center gap-2">
                                <AlertTriangle size={20} />
                                Danger Zone
                            </h3>
                            <p className="text-sm text-rose-600 dark:text-rose-300 mb-4">
                                Tindakan ini akan menghapus motor ini secara
                                permanen dari database. Data yang sudah dihapus
                                tidak dapat dikembalikan.
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-6 py-2.5 bg-white dark:bg-red-900/30 border border-rose-200 dark:border-red-800 text-rose-600 dark:text-rose-400 rounded-xl font-bold hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-sm text-sm"
                            >
                                <Trash2 size={16} className="inline mr-2" />
                                Hapus Motor Ini
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PREVIEW (1/3) */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Main Action Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Box size={18} className="text-primary" />
                                    Live Preview
                                </h3>

                                {/* Card Preview */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 transition-colors">
                                    <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-300 dark:text-gray-500">
                                                <Bike size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                                                    data.brand === "Yamaha"
                                                        ? "bg-blue-600 text-white"
                                                        : data.brand === "Honda"
                                                        ? "bg-red-600 text-white"
                                                        : "bg-gray-800 text-white"
                                                }`}
                                            >
                                                {data.brand}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-black text-gray-900 dark:text-white text-lg leading-tight mb-1">
                                            {data.name || "Nama Motor"}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-3 uppercase">
                                            {data.type || "Tipe"} &bull;{" "}
                                            {data.year}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">
                                                    Harga OTR
                                                </p>
                                                <p className="text-primary font-black text-lg">
                                                    Rp{" "}
                                                    {data.price
                                                        ? new Intl.NumberFormat(
                                                              "id-ID"
                                                          ).format(data.price)
                                                        : "0"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                {data.tersedia == 1 ? (
                                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md border border-emerald-100 dark:border-emerald-800">
                                                        Stok Tersedia
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded-md border border-rose-100 dark:border-rose-800">
                                                        Stok Habis
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Save size={18} />
                                        )}
                                        Simpan Perubahan
                                    </button>
                                    <Link
                                        href={route("admin.motors.index")}
                                        className="w-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
