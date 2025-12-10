import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Upload } from "lucide-react";

export default function Edit({ motor }) {
    // Transform initial specs from array to object for easy access
    const initialSpecs = {
        engine_type: "",
        engine_size: "",
        fuel_system: "",
        transmission: "",
        max_power: "",
        max_torque: "",
        additional_specs: "",
    };

    if (motor.specifications && motor.specifications.length > 0) {
        motor.specifications.forEach((spec) => {
            initialSpecs[spec.spec_key] = spec.spec_value;
        });
    }

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Method spoofing for file upload with PUT
        name: motor.name || "",
        brand: motor.brand || "Yamaha",
        model: motor.model || "",
        price: motor.price || "",
        year: motor.year || new Date().getFullYear(),
        type: motor.type || "",
        tersedia: motor.tersedia ? 1 : 0,
        image: null,
        details: motor.details || "",
        specifications: initialSpecs,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.motors.update", motor.id));
    };

    const handleSpecChange = (key, value) => {
        setData("specifications", {
            ...data.specifications,
            [key]: value,
        });
    };

    return (
        <AdminLayout title={`Edit Motor: ${motor.name}`}>
            <div className="max-w-4xl mx-auto">
                <Link
                    href={route("admin.motors.index")}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 font-medium transition-colors"
                >
                    <ArrowLeft size={20} /> Kembali ke Daftar Motor
                </Link>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                            Informasi Dasar
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nama Motor
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Contoh: Yamaha NMAX 155"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Brand
                                </label>
                                <select
                                    value={data.brand}
                                    onChange={(e) =>
                                        setData("brand", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="Yamaha">Yamaha</option>
                                    <option value="Honda">Honda</option>
                                </select>
                                {errors.brand && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.brand}
                                    </div>
                                )}
                            </div>

                            {/* Logo Model (Optional) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={(e) =>
                                        setData("model", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Contoh: Matic"
                                />
                                {errors.model && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.model}
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Harga (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="0"
                                />
                                {errors.price && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.price}
                                    </div>
                                )}
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tahun
                                </label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={(e) =>
                                        setData("year", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                                {errors.year && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.year}
                                    </div>
                                )}
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Status Ketersediaan
                                </label>
                                <select
                                    value={data.tersedia}
                                    onChange={(e) =>
                                        setData("tersedia", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value={1}>Tersedia</option>
                                    <option value={0}>Habis</option>
                                </select>
                                {errors.tersedia && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.tersedia}
                                    </div>
                                )}
                            </div>

                            {/* Type (e.g. Sport, Matic, Bebek) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tipe Motor
                                </label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Contoh: Matic"
                                />
                                {errors.type && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.type}
                                    </div>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Gambar Motor
                                </label>

                                {motor.image_path && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Gambar Saat Ini:
                                        </p>
                                        <img
                                            src={`/storage/${motor.image_path}`}
                                            alt="Current"
                                            className="h-32 rounded-lg object-cover"
                                        />
                                    </div>
                                )}

                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-primary/50 transition-colors text-center cursor-pointer relative bg-gray-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                                            <Upload
                                                size={24}
                                                className="text-primary"
                                            />
                                        </div>
                                        <span className="font-medium">
                                            {data.image
                                                ? data.image.name
                                                : "Klik untuk ganti gambar (Opsional)"}
                                        </span>
                                        <span className="text-xs">
                                            JPG, PNG, max 2MB
                                        </span>
                                    </div>
                                </div>
                                {errors.image && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.image}
                                    </div>
                                )}
                            </div>

                            {/* Details/Description */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Deskripsi Singkat
                                </label>
                                <textarea
                                    value={data.details}
                                    onChange={(e) =>
                                        setData("details", e.target.value)
                                    }
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Deskripsi singkat tentang motor ini..."
                                ></textarea>
                                {errors.details && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.details}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Specifications Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                            Spesifikasi Teknis
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { key: "engine_type", label: "Tipe Mesin" },
                                {
                                    key: "engine_size",
                                    label: "Kapasitas Mesin (cc)",
                                },
                                {
                                    key: "fuel_system",
                                    label: "Sistem Bahan Bakar",
                                },
                                { key: "transmission", label: "Transmisi" },
                                { key: "max_power", label: "Tenaga Maksimum" },
                                { key: "max_torque", label: "Torsi Maksimum" },
                            ].map((spec) => (
                                <div key={spec.key}>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        {spec.label}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.specifications[spec.key]}
                                        onChange={(e) =>
                                            handleSpecChange(
                                                spec.key,
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder={`Masukkan ${spec.label.toLowerCase()}`}
                                    />
                                    {errors[`specifications.${spec.key}`] && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {
                                                errors[
                                                    `specifications.${spec.key}`
                                                ]
                                            }
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Additional Specs */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Spesifikasi Tambahan
                                </label>
                                <textarea
                                    value={data.specifications.additional_specs}
                                    onChange={(e) =>
                                        handleSpecChange(
                                            "additional_specs",
                                            e.target.value
                                        )
                                    }
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Informasi spesifikasi lainnya..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <Save size={20} />
                            {processing ? "Menyimpan..." : "Update Data Motor"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
