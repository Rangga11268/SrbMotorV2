import React from "react";
import { useForm, Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Calendar,
    Search,
    TrendingUp,
    DollarSign,
    Users,
    Briefcase,
    ArrowRight,
    Sparkles,
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
            label: "Analisis Penjualan",
            desc: "Tren transaksi & performa produk",
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "group-hover:border-emerald-500/50",
            activeClass:
                "ring-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-500",
        },
        {
            id: "income",
            label: "Laporan Pendapatan",
            desc: "Arus kas & detail revenue",
            icon: DollarSign,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/50",
            activeClass:
                "ring-blue-500/30 bg-blue-50/50 dark:bg-blue-900/20 border-blue-500",
        },
        {
            id: "customer",
            label: "Wawasan Pelanggan",
            desc: "Top spender & demografi",
            icon: Users,
            color: "text-violet-500",
            bg: "bg-violet-500/10",
            border: "group-hover:border-violet-500/50",
            activeClass:
                "ring-violet-500/30 bg-violet-50/50 dark:bg-violet-900/20 border-violet-500",
        },
        {
            id: "status",
            label: "Distribusi Status",
            desc: "Monitoring status pesanan",
            icon: Briefcase,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "group-hover:border-amber-500/50",
            activeClass:
                "ring-amber-500/30 bg-amber-50/50 dark:bg-amber-900/20 border-amber-500",
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
            start.setDate(1);
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
        <AdminLayout>
            <Head title="Pusat Laporan" />

            <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            Analytics Hub
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                        Generate laporan komprehensif untuk memantau performa
                        bisnis Anda secara real-time.
                    </p>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-white/50 dark:border-white/5 relative overflow-hidden transition-colors">
                    <div className="h-2 w-full bg-gradient-to-r from-primary via-blue-500 to-violet-500"></div>

                    <div className="p-8 lg:p-12">
                        <form onSubmit={handleGenerate} className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shadow-sm">
                                        <Sparkles className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Pilih Jenis Laporan
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Data apa yang ingin Anda lihat?
                                        </p>
                                    </div>
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
                                                className={`group cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                                                    isSelected
                                                        ? `${type.activeClass} shadow-lg scale-[1.02]`
                                                        : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                                                }`}
                                            >
                                                <div
                                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                                                        isSelected
                                                            ? type.bg +
                                                              " " +
                                                              type.color
                                                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 group-hover:bg-white dark:group-hover:bg-gray-600 group-hover:shadow-sm"
                                                    }`}
                                                >
                                                    <Icon size={28} />
                                                </div>
                                                <h3
                                                    className={`font-bold text-lg mb-1 transition-colors ${
                                                        isSelected
                                                            ? "text-gray-900 dark:text-white"
                                                            : "text-gray-700 dark:text-gray-300"
                                                    }`}
                                                >
                                                    {type.label}
                                                </h3>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium leading-relaxed">
                                                    {type.desc}
                                                </p>

                                                <div
                                                    className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-500 ${
                                                        isSelected
                                                            ? type.color.replace(
                                                                  "text-",
                                                                  "bg-"
                                                              )
                                                            : "bg-transparent"
                                                    }`}
                                                ></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-gray-100 dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shadow-sm">
                                            <Calendar className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                                Periode Waktu
                                            </h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Tentukan rentang tanggal laporan
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {presets.map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() =>
                                                    applyPreset(preset)
                                                }
                                                className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary dark:hover:text-primary hover:shadow-md transition-all active:scale-95"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-1 bg-gray-100/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 flex flex-col md:flex-row items-center transition-colors">
                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors" />
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
                                            className="w-full pl-14 pr-4 py-5 bg-white md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent border-none rounded-xl focus:ring-0 font-bold text-gray-700 dark:text-white text-lg cursor-pointer"
                                        />
                                        <span className="absolute top-2 left-14 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                            Dari Tanggal
                                        </span>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center w-12 text-gray-300 dark:text-gray-600">
                                        <ArrowRight
                                            size={24}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors" />
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
                                            className="w-full pl-14 pr-4 py-5 bg-white md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent border-none rounded-xl focus:ring-0 font-bold text-gray-700 dark:text-white text-lg cursor-pointer"
                                        />
                                        <span className="absolute top-2 left-14 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                            Sampai Tanggal
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="relative w-full group overflow-hidden rounded-2xl p-[1px]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black group-hover:via-black transition-all duration-500"></div>
                                    <div className="relative bg-gray-900 dark:bg-black rounded-[15px] px-8 py-5 flex items-center justify-center gap-3 overflow-hidden group-hover:bg-opacity-90 transition-all">
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {processing ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <Search className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                                        )}
                                        <span className="font-black text-xl text-white tracking-wide">
                                            {processing
                                                ? "MEMPROSES..."
                                                : "GENERATE REPORT"}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
