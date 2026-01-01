import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ArrowUpDown,
    Bike,
    AlertCircle,
    CheckCircle,
    XCircle,
    ChevronDown,
    RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Index({ motors, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [brand, setBrand] = useState(filters.brand || "");
    const [status, setStatus] = useState(filters.status || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.motors.index"),
            { search, brand, status },
            { preserveState: true, replace: true }
        );
    };

    const handleFilterChange = (key, value) => {
        if (key === "brand") setBrand(value);
        if (key === "status") setStatus(value);

        router.get(
            route("admin.motors.index"),
            {
                search,
                brand: key === "brand" ? value : brand,
                status: key === "status" ? value : status,
            },
            { preserveState: true, replace: true }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setBrand("");
        setStatus("");
        router.get(route("admin.motors.index"));
    };

    const confirmDelete = (motor) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${motor.name}?`)) {
            router.delete(route("admin.motors.destroy", motor.id), {
                onSuccess: () => toast.success("Data unit berhasil dihapus"),
            });
        }
    };

    return (
        <AdminLayout title="MANAJEMEN ARMADA">
            <div className="space-y-8">
                {/* Header Control Panel */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-white/50 font-mono uppercase tracking-widest text-xs mb-2">
                            MODUL ARMADA
                        </h2>
                        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wide flex items-center gap-3">
                            <span className="w-1 h-8 bg-accent rounded-full"></span>
                            DAFTAR UNIT
                        </h1>
                    </div>

                    <Link
                        href={route("admin.motors.create")}
                        className="group flex items-center gap-3 px-6 py-3 bg-accent text-black rounded-xl font-bold font-display uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
                    >
                        <Plus
                            size={20}
                            className="group-hover:rotate-90 transition-transform duration-500"
                        />
                        <span>TAMBAH UNIT</span>
                    </Link>
                </div>

                {/* Glassmorphic Filter Bar */}
                <div className="bg-zinc-900/50 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex flex-col xl:flex-row gap-4 items-center justify-between">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full xl:w-96 group"
                    >
                        <input
                            type="text"
                            placeholder="CARI BERDASARKAN ID / NAMA..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white placeholder-white/20 font-mono text-sm transition-all"
                        />
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-accent transition-colors"
                            size={18}
                        />
                    </form>

                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                        <div className="relative min-w-[160px]">
                            <select
                                value={brand}
                                onChange={(e) =>
                                    handleFilterChange("brand", e.target.value)
                                }
                                className="w-full pl-10 pr-10 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent/50 text-white font-mono text-xs uppercase tracking-wider appearance-none cursor-pointer hover:border-white/30 transition-all"
                            >
                                <option value="">SEMUA MERK</option>
                                <option value="Yamaha">Yamaha</option>
                                <option value="Honda">Honda</option>
                                <option value="Kawasaki">Kawasaki</option>
                                <option value="Suzuki">Suzuki</option>
                            </select>
                            <Filter
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                                size={16}
                            />
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                                size={14}
                            />
                        </div>

                        <div className="relative min-w-[160px]">
                            <select
                                value={status}
                                onChange={(e) =>
                                    handleFilterChange("status", e.target.value)
                                }
                                className="w-full pl-10 pr-10 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent/50 text-white font-mono text-xs uppercase tracking-wider appearance-none cursor-pointer hover:border-white/30 transition-all"
                            >
                                <option value="">SEMUA STATUS</option>
                                <option value="1">Tersedia</option>
                                <option value="0">Kosong</option>
                            </select>
                            <AlertCircle
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                                size={16}
                            />
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                                size={14}
                            />
                        </div>

                        {(search || brand || status) && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold font-mono text-xs uppercase flex items-center gap-2"
                            >
                                <RotateCcw size={16} />
                                <span className="hidden sm:inline">RESET</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Data Grid */}
                <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-white/40 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                                    <th className="p-6">IDENTITAS UNIT</th>
                                    <th className="p-6">SPESIFIKASI</th>
                                    <th className="p-6">NILAI ASET</th>
                                    <th className="p-6">STATUS</th>
                                    <th className="p-6 text-right">AKSI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {motors.data.length > 0 ? (
                                    motors.data.map((motor) => (
                                        <tr
                                            key={motor.id}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden shrink-0 group-hover:border-accent/30 transition-colors">
                                                        {motor.image_path ? (
                                                            <img
                                                                src={`/storage/${motor.image_path}`}
                                                                alt={motor.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                                <Bike
                                                                    size={20}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm font-display uppercase tracking-wide">
                                                            {motor.name}
                                                        </div>
                                                        <div className="text-[10px] text-white/40 font-mono mt-1">
                                                            ID:{" "}
                                                            {motor.id
                                                                .toString()
                                                                .padStart(
                                                                    4,
                                                                    "0"
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="space-y-1">
                                                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                                                        {motor.brand}
                                                    </div>
                                                    <div className="text-[10px] text-white/40 font-mono">
                                                        {motor.type} •{" "}
                                                        {motor.year}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-mono font-bold text-accent text-sm text-glow">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(motor.price)}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {motor.tersedia ? (
                                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                        TERSEDIA
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                        KOSONG
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-end gap-2 text-right">
                                                    <Link
                                                        href={route(
                                                            "admin.motors.show",
                                                            motor.id
                                                        )}
                                                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all inline-flex"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "admin.motors.edit",
                                                            motor.id
                                                        )}
                                                        className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-black transition-all inline-flex"
                                                        title="Edit Data"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(motor)
                                                        }
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all inline-flex"
                                                        title="Hapus Unit"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-12 text-center text-white/30 font-mono"
                                        >
                                            DATA TIDAK DITEMUKAN.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {motors.links.length > 3 && (
                        <div className="p-6 border-t border-white/5 flex justify-center bg-black/20">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {motors.links.map((link, index) => {
                                    if (!link.url && !link.label) return null;
                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                                                link.active
                                                    ? "bg-accent text-black border-accent"
                                                    : "bg-white/5 text-white/50 border-white/5 hover:border-white/20 hover:text-white"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-white/5 text-white/20 border border-transparent cursor-not-allowed"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
