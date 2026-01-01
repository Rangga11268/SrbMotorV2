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
    ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        brand: "Yamaha",
        model: "",
        price: "",
        year: new Date().getFullYear(),
        type: "",
        tersedia: 1,
        image: null,
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

    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const checkDirty = () => {
            if (data.name || data.model || data.price || data.type) {
                setIsDirty(true);
            }
        };
        checkDirty();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.motors.store"), {
            onSuccess: () => toast.success("UNIT BERHASIL DITAMBAHKAN"),
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
        <AdminLayout title="TAMBAH UNIT BARU">
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
                            BATAL
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        DATA BARU
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Form Area */}
                    <div className="xl:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Primary Data Module */}
                            <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-accent/10 transition-all duration-700"></div>

                                <h3 className="text-xl font-bold text-white mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-1 h-8 bg-accent rounded-full"></span>
                                    DATA UTAMA UNIT
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            NAMA UNIT
                                        </label>
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-display text-lg tracking-wide transition-all"
                                                placeholder="Contoh: ZX-25R ABS SE"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                                                <Bike
                                                    size={20}
                                                    className="text-accent"
                                                />
                                            </div>
                                        </div>
                                        {errors.name && (
                                            <div className="text-accent text-xs mt-2 font-mono flex items-center gap-2">
                                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            PABRIKAN (MERK)
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
                                            TIPE (KLASIFIKASI)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-mono transition-all"
                                            placeholder="Contoh: SPORT"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            HARGA OTR
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
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            TAHUN PEMBUATAN
                                        </label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-mono transition-all"
                                            placeholder="YYYY"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            STATUS KETERSEDIAAN
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
                                                TERSEDIA
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
                                                KOSONG
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            UPLOAD GAMBAR
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
                                                        PILIH DOKUMEN VISUAL
                                                    </span>
                                                    <span className="text-xs font-mono opacity-50 block mt-2">
                                                        KLIK ATAU DRAG & DROP
                                                        GAMBAR DI SINI
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
                                    SPESIFIKASI TEKNIS
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            key: "engine_type",
                                            label: "TIPE MESIN",
                                        },
                                        {
                                            key: "engine_size",
                                            label: "KAPASITAS (CC)",
                                        },
                                        {
                                            key: "fuel_system",
                                            label: "SISTEM BAHAN BAKAR",
                                        },
                                        {
                                            key: "transmission",
                                            label: "TRANSMISI",
                                        },
                                        {
                                            key: "max_power",
                                            label: "TENAGA MAKSIMUM",
                                        },
                                        {
                                            key: "max_torque",
                                            label: "TORSI MAKSIMUM",
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
                                                    ]
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
                                            CATATAN TAMBAHAN
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
                                            className="w-full px-5 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-white/20 font-mono text-sm transition-all"
                                            placeholder="Masukkan detail teknis tambahan jika ada..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-accent text-black py-4 rounded-xl font-bold font-display uppercase tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg group"
                                >
                                    {processing ? (
                                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <Save
                                            size={20}
                                            className="group-hover:rotate-12 transition-transform"
                                        />
                                    )}
                                    SIMPAN UNIT BARU
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar Area */}
                    <div className="xl:col-span-1 space-y-8">
                        {/* Preview Feature */}
                        <div className="sticky top-6">
                            <div className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 mb-8">
                                <h3 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <Box size={14} className="text-accent" />
                                    PRATINJAU DATABASE
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
                                                    TIDAK ADA GAMBAR
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
                                                    ESTIMASI
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

                            {/* Info Box */}
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-6">
                                <h3 className="text-blue-400 font-bold font-display uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Info size={18} />
                                    CATATAN SISTEM
                                </h3>
                                <p className="text-blue-400/60 text-xs font-mono leading-relaxed">
                                    Semua unit yang ditambahkan akan otomatis
                                    disinkronkan dengan galeri publik. Pastikan
                                    gambar memiliki resolusi tinggi untuk
                                    tampilan terbaik.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
