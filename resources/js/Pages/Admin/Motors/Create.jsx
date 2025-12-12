import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Save,
    Upload,
    Bike,
    FileText,
    Settings,
    Info,
    Box,
} from "lucide-react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        brand: "Yamaha", // Default
        model: "",
        price: "",
        year: new Date().getFullYear(),
        type: "",
        tersedia: 1,
        image: null,
        details: "",
        // Specifications
        specifications: {
            engine_type: "",
            engine_size: "",
            fuel_system: "",
            transmission: "",
            max_power: "",
            max_torque: "",
            additional_specs: "",
        },
    });

    // Preview URL for image
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.motors.store"));
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
        <AdminLayout title="Tambah Motor Baru">
            <div className="max-w-7xl mx-auto">
                <Link
                    href={route("admin.motors.index")}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 font-bold transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-sm">Kembali ke Daftar</span>
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: FORM (2/3) */}
                    <div className="xl:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit}>
                            {/* Basic Info Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Info className="text-primary" size={20} />
                                    Informasi Dasar
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Nama Unit Motor
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-900 text-lg placeholder-gray-300"
                                            placeholder="Contoh: Yamaha NMAX 155 Connected"
                                        />
                                        {errors.name && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Brand */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
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
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white appearance-none cursor-pointer font-bold text-gray-700"
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
                                        {errors.brand && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.brand}
                                            </div>
                                        )}
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Kategori / Tipe
                                        </label>
                                        <input
                                            type="text"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                            placeholder="Matic, Sport, Cub..."
                                        />
                                        {errors.type && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.type}
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
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
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-900"
                                                placeholder="0"
                                            />
                                        </div>
                                        {errors.price && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.price}
                                            </div>
                                        )}
                                    </div>

                                    {/* Year */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Tahun Pembuatan
                                        </label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold"
                                        />
                                        {errors.year && (
                                            <div className="text-rose-500 text-xs mt-1 font-bold">
                                                {errors.year}
                                            </div>
                                        )}
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
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
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
                                                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
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
                                                        ? "bg-rose-50 text-rose-700 border-rose-200 shadow-sm"
                                                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                Habis
                                            </button>
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Foto Utama Unit
                                        </label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-primary/50 hover:bg-blue-50/10 transition-colors text-center cursor-pointer relative bg-gray-50 group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center gap-3 text-gray-400 group-hover:text-primary transition-colors">
                                                <div className="bg-white p-4 rounded-full shadow-sm group-hover:shadow-md transition-all">
                                                    <Upload
                                                        size={24}
                                                        className="text-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-700 block text-sm">
                                                        Klik untuk upload foto
                                                        unit
                                                    </span>
                                                    <span className="text-xs text-gray-400 block mt-1">
                                                        JPG, PNG, WebP (Maks.
                                                        2MB)
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
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
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
                                        },
                                        {
                                            key: "engine_size",
                                            label: "Kapasitas Mesin (cc)",
                                        },
                                        {
                                            key: "fuel_system",
                                            label: "Sistem Bahan Bakar",
                                        },
                                        {
                                            key: "transmission",
                                            label: "Transmisi",
                                        },
                                        {
                                            key: "max_power",
                                            label: "Tenaga Maksimum",
                                        },
                                        {
                                            key: "max_torque",
                                            label: "Torsi Maksimum",
                                        },
                                    ].map((spec) => (
                                        <div key={spec.key}>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                                {spec.label}
                                            </label>
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
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm"
                                                placeholder={`...`}
                                            />
                                            {errors[
                                                `specifications.${spec.key}`
                                            ] && (
                                                <div className="text-rose-500 text-xs mt-1 font-bold">
                                                    {
                                                        errors[
                                                            `specifications.${spec.key}`
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
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
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm"
                                            placeholder="Tuliskan spesifikasi unggulan lainnya..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Hidden Submit Button for Mobile / Compatibility */}
                            <div className="hidden">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: PREVIEW (1/3) */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Main Action Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Box size={18} className="text-primary" />
                                    Live Preview
                                </h3>

                                {/* Card Preview */}
                                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                                    <div className="aspect-[4/3] bg-gray-100 relative">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
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
                                        <h4 className="font-black text-gray-900 text-lg leading-tight mb-1">
                                            {data.name || "Nama Motor"}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-bold mb-3 uppercase">
                                            {data.type || "Tipe"} &bull;{" "}
                                            {data.year}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">
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
                                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                                        Stok Tersedia
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                                                        Stok Habis
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Tampilan kartu di atas adalah simulasi
                                    katalog.
                                </p>

                                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
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
                                        Simpan Motor
                                    </button>
                                    <Link
                                        href={route("admin.motors.index")}
                                        className="w-full bg-white text-gray-600 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
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
