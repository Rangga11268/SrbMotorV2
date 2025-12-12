import React from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Calendar,
    Search,
    TrendingUp,
    DollarSign,
    Users,
    Briefcase,
    ArrowRight,
    Filter,
} from "lucide-react";

export default function Index() {
    const { data, setData, get, processing } = useForm({
        type: "sales",
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date().toISOString().split("T")[0],
    });

    const reportTypes = [
        {
            id: "sales",
            label: "Penjualan",
            desc: "Analisis transaksi & pendapatan",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
        {
            id: "income",
            label: "Pendapatan",
            desc: "Laporan cash flow detail",
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
        },
        {
            id: "customer",
            label: "Pelanggan",
            desc: "Top spending & aktivitas",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100",
        },
        {
            id: "status",
            label: "Status",
            desc: "Distribusi status pesanan",
            icon: Briefcase,
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100",
        },
    ];

    const presets = [
        { label: "Hari Ini", days: 0 },
        { label: "7 Hari Terakhir", days: 7 },
        { label: "30 Hari Terakhir", days: 30 },
        { label: "Bulan Ini", type: "month" },
    ];

    const applyPreset = (preset) => {
        const end = new Date();
        const start = new Date();

        if (preset.type === "month") {
            start.setDate(1); // First day of month
        } else {
            start.setDate(end.getDate() - preset.days);
        }

        setData({
            ...data,
            start_date: start.toISOString().split("T")[0],
            end_date: end.toISOString().split("T")[0],
        });
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        get(route("admin.reports.generate"));
    };

    return (
        <AdminLayout title="Pusat Laporan">
            <div className="max-w-4xl mx-auto py-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">
                        Control Center Laporan
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Generate insight mendalam untuk bisnis Anda dalam sekali
                        klik.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
                    <div className="p-8 md:p-10">
                        <form onSubmit={handleGenerate} className="space-y-10">
                            {/* Section 1: Report Type */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                        1
                                    </div>
                                    Pilih Jenis Laporan
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {reportTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected =
                                            data.type === type.id;
                                        return (
                                            <div
                                                key={type.id}
                                                onClick={() =>
                                                    setData("type", type.id)
                                                }
                                                className={`cursor-pointer relative p-5 rounded-2xl border-2 transition-all duration-300 group ${
                                                    isSelected
                                                        ? `border-primary bg-primary/5 ring-4 ring-primary/10 shadow-lg shadow-primary/10 scale-105 z-10`
                                                        : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50 hover:-translate-y-1"
                                                }`}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                                                        isSelected
                                                            ? "bg-primary text-white"
                                                            : `${type.bg} ${type.color}`
                                                    }`}
                                                >
                                                    <Icon size={24} />
                                                </div>
                                                <h3
                                                    className={`font-bold text-base mb-1 ${
                                                        isSelected
                                                            ? "text-gray-900"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    {type.label}
                                                </h3>
                                                <p className="text-xs text-gray-400 font-medium">
                                                    {type.desc}
                                                </p>

                                                {isSelected && (
                                                    <div className="absolute top-4 right-4 text-primary">
                                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Section 2: Date Range */}
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                            2
                                        </div>
                                        Periode Waktu
                                    </div>

                                    {/* Presets */}
                                    <div className="flex flex-wrap gap-2">
                                        {presets.map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() =>
                                                    applyPreset(preset)
                                                }
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-50 text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-2 md:gap-0">
                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 font-bold text-gray-700 text-center md:text-left"
                                        />
                                        <span className="absolute top-2 left-12 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            Mulai Tanggal
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-300 shadow-sm shrink-0 z-10">
                                        <ArrowRight size={18} />
                                    </div>

                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) =>
                                                setData(
                                                    "end_date",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 font-bold text-gray-700 text-center md:text-left"
                                        />
                                        <span className="absolute top-2 left-12 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            Sampai Tanggal
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 rounded-xl bg-gray-900 text-white font-black text-lg shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:scale-[1.01] hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Search size={22} strokeWidth={2.5} />
                                    {processing
                                        ? "Memproses Laporan..."
                                        : "Tampilkan Laporan Analisa"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
