import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    Trash2,
    Upload,
    AlertTriangle,
    Info,
    Box,
    Bike,
    ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Edit({ motor }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: motor.name || "",
        brand: motor.brand || "Yamaha",
        model: motor.model || "",
        price: motor.price || "",
        year: motor.year || new Date().getFullYear(),
        type: motor.type || "",
        tersedia: motor.tersedia,
        image: null,
        specifications: motor.specifications || {
            engine_type: "",
            engine_size: "",
            fuel_system: "",
            transmission: "",
            max_power: "",
            max_torque: "",
            additional_specs: "",
        },
    });

    const [previewUrl, setPreviewUrl] = useState(
        motor.image_path ? `/storage/${motor.image_path}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.motors.update", motor.id), {
            onSuccess: () => toast.success("DATA UNIT BERHASIL DIPERBARUI"),
        });
    };

    const handleDelete = () => {
        if (confirm("PERINGATAN: TINDAKAN INI PERMANEN. HAPUS UNIT?")) {
            router.delete(route("admin.motors.destroy", motor.id));
        }
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
        <AdminLayout title="EDIT DATA UNIT">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Control */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route("admin.motors.index")}
                        className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-mono text-sm tracking-wider uppercase">
                            Batal
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Mode Edit Aktif
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Form Area */}
                    <div className="xl:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Primary Data Module */}
                            <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                                <h3 className="text-xl font-bold text-white mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-1 h-8 bg-accent rounded-full"></span>
                                    Data Utama Unit
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Nama Unit
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-display text-lg tracking-wide transition-all"
                                        />
                                        {errors.name && (
                                            <div className="text-accent text-xs mt-2 font-mono flex items-center gap-2">
                                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Pabrikan (Merk)
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
                                                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white font-mono appearance-none cursor-pointer"
                                            >
                                                <option value="Yamaha">
                                                    YAMAHA
                                                </option>
                                                <option value="Honda">
                                                    HONDA
                                                </option>
                                                <option value="Kawasaki">
                                                    KAWASAKI
                                                </option>
                                                <option value="Suzuki">
                                                    SUZUKI
                                                </option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                                <ChevronDown size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Klasifikasi (Tipe)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-mono transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Nilai Aset (OTR)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent font-mono font-bold">
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
                                                className="w-full pl-12 pr-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-mono text-lg font-bold transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Tahun Produksi
                                        </label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-mono transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Status Stok
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("tersedia", 1)
                                                }
                                                className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                                                    data.tersedia == 1
                                                        ? "bg-green-500/10 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                                                        : "bg-black/30 text-white/30 border-white/5 hover:border-white/20"
                                                }`}
                                            >
                                                Tersedia
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("tersedia", 0)
                                                }
                                                className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                                                    data.tersedia == 0
                                                        ? "bg-red-500/10 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(248,113,113,0.2)]"
                                                        : "bg-black/30 text-white/30 border-white/5 hover:border-white/20"
                                                }`}
                                            >
                                                Kosong
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Update Visual Data
                                        </label>
                                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 hover:border-accent/50 hover:bg-accent/5 transition-all text-center cursor-pointer relative bg-black/20 group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center gap-4 text-white/30 group-hover:text-accent transition-colors">
                                                <div className="bg-black/40 p-5 rounded-full shadow-inner border border-white/5 group-hover:border-accent/20 transition-all">
                                                    <Upload size={28} />
                                                </div>
                                                <div>
                                                    <span className="font-display font-bold text-white/70 block text-lg group-hover:text-white transition-colors">
                                                        UNGGAH VISUAL BARU
                                                    </span>
                                                    <span className="text-xs font-mono opacity-50 block mt-2">
                                                        BIARKAN KOSONG UNTUK
                                                        TETAP MENGGUNAKAN GAMBAR
                                                        SAAT INI
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Specs Module */}
                            <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                                <h3 className="text-xl font-bold text-white mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
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
                                            label: "Kapasitas (CC)",
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
                                            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                                {spec.label}
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    data.specifications[
                                                        spec.key
                                                    ] || ""
                                                }
                                                onChange={(e) =>
                                                    handleSpecChange(
                                                        spec.key,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-5 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-white/20 font-mono text-sm transition-all"
                                                placeholder="-"
                                            />
                                        </div>
                                    ))}

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            value={
                                                data.specifications
                                                    .additional_specs || ""
                                            }
                                            onChange={(e) =>
                                                handleSpecChange(
                                                    "additional_specs",
                                                    e.target.value
                                                )
                                            }
                                            rows="4"
                                            className="w-full px-5 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-white/20 font-mono text-sm transition-all"
                                            placeholder="Masukkan detail teknis tambahan..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600/20 border border-blue-500/50 text-blue-400 py-4 rounded-xl font-bold font-display uppercase tracking-wider hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg group"
                                >
                                    {processing ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Save
                                            size={20}
                                            className="group-hover:scale-110 transition-transform"
                                        />
                                    )}
                                    SIMPAN PERUBAHAN
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar Area */}
                    <div className="xl:col-span-1 space-y-8">
                        {/* Preview Module */}
                        <div className="sticky top-6">
                            <div className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 mb-8">
                                <h3 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <Box size={14} className="text-accent" />
                                    Pratinjau Database
                                </h3>

                                <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/40 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

                                    <div className="aspect-[4/3] bg-zinc-800 relative flex items-center justify-center overflow-hidden">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-white/10">
                                                <Bike
                                                    size={64}
                                                    strokeWidth={1}
                                                />
                                                <span className="text-[10px] font-mono mt-4 uppercase tracking-widest">
                                                    Tidak Ada Data Visual
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute top-4 right-4 z-20">
                                            <span
                                                className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                                                    data.brand === "Yamaha"
                                                        ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                                        : "bg-red-500/20 text-red-400 border-red-500/50"
                                                }`}
                                            >
                                                {data.brand}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 relative z-20">
                                        <h4 className="font-display font-black text-white text-xl leading-none mb-2 uppercase italic tracking-wide">
                                            {data.name || "NAMA UNIT"}
                                        </h4>
                                        <p className="text-xs text-white/40 font-mono mb-4">
                                            {data.type || "TIPE"} // {data.year}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                            <div>
                                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-1">
                                                    Estimasi Nilai
                                                </p>
                                                <p className="text-accent font-mono font-bold text-lg text-glow">
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
                                                    <span className="text-[10px] font-bold text-green-400 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                        TERSEDIA
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-red-400 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                        KOSONG
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <AlertTriangle
                                        size={64}
                                        className="text-red-500"
                                    />
                                </div>
                                <h3 className="text-red-500 font-bold font-display uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Trash2 size={18} />
                                    Zona Bahaya
                                </h3>
                                <p className="text-red-400/60 text-xs font-mono mb-6 leading-relaxed">
                                    TINDAKAN PERMANEN. Menghapus unit ini akan
                                    menghilangkan seluruh data terkait dari
                                    klaster database utama.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={14} />
                                    Eksekusi Penghapusan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
