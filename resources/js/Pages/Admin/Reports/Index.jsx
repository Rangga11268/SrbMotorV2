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
    BarChart3,
    PieChart,
    Activity,
    FileText,
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
            label: "ANALISIS PENJUALAN",
            desc: "METRIK TRANSAKSI & PERFORMA PRODUK",
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            shadow: "shadow-[0_0_15px_rgba(52,211,153,0.15)]",
            activeClass: "ring-1 ring-emerald-500 bg-emerald-500/10",
        },
        {
            id: "income",
            label: "LAPORAN PENDAPATAN",
            desc: "ARUS KAS & DETAIL REVENUE",
            icon: DollarSign,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            shadow: "shadow-[0_0_15px_rgba(96,165,250,0.15)]",
            activeClass: "ring-1 ring-blue-500 bg-blue-500/10",
        },
        {
            id: "customer",
            label: "WAWASAN PELANGGAN",
            desc: "DEMOGRAFI & TOP SPENDER",
            icon: Users,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
            border: "border-violet-500/20",
            shadow: "shadow-[0_0_15px_rgba(167,139,250,0.15)]",
            activeClass: "ring-1 ring-violet-500 bg-violet-500/10",
        },
        {
            id: "status",
            label: "DISTRIBUSI STATUS",
            desc: "MONITORING LOGISTIK & PROSES",
            icon: Activity,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            shadow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
            activeClass: "ring-1 ring-amber-500 bg-amber-500/10",
        },
    ];

    const presets = [
        { label: "HARI INI", days: 0 },
        { label: "7 HARI TERAKHIR", days: 7 },
        { label: "30 HARI TERAKHIR", days: 30 },
        { label: "BULAN INI", type: "month" },
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
        <AdminLayout title="PUSAT LAPORAN">
            <Head title="PUSAT LAPORAN DIGITAl" />

            <div className="space-y-8">
                {/* Header Control Panel */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-white/50 font-mono uppercase tracking-widest text-xs mb-2">
                            MODUL SISTEM ANALITIK
                        </h2>
                        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wide flex items-center gap-3">
                            <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
                            GENERATOR LAPORAN
                        </h1>
                    </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                    <div className="p-8 lg:p-12">
                        <form onSubmit={handleGenerate} className="space-y-12">
                            {/* Section 1: Report Type */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                                        <FileText className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold font-display text-white uppercase tracking-wide">
                                            JENIS LAPORAN
                                        </h2>
                                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                            PILIH PARAMETER DATA YANG AKAN
                                            DIANALISIS
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
                                                className={`group cursor-pointer relative p-6 rounded-xl border transition-all duration-300 ${
                                                    isSelected
                                                        ? `${type.activeClass} border-transparent shadow-lg scale-[1.02]`
                                                        : "border-white/5 bg-black/40 hover:bg-white/5 hover:border-white/10"
                                                }`}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${
                                                        isSelected
                                                            ? type.bg +
                                                              " " +
                                                              type.color
                                                            : "bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white"
                                                    }`}
                                                >
                                                    <Icon size={24} />
                                                </div>
                                                <h3
                                                    className={`font-bold font-display text-sm mb-1 uppercase tracking-wider transition-colors ${
                                                        isSelected
                                                            ? "text-white"
                                                            : "text-white/60 group-hover:text-white"
                                                    }`}
                                                >
                                                    {type.label}
                                                </h3>
                                                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                                                    {type.desc}
                                                </p>

                                                <div
                                                    className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-500 ${
                                                        isSelected
                                                            ? type.color.replace(
                                                                  "text-",
                                                                  "bg-"
                                                              ) +
                                                              " shadow-[0_0_10px_currentColor]"
                                                            : "bg-transparent"
                                                    }`}
                                                ></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Section 2: Time Period */}
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold font-display text-white uppercase tracking-wide">
                                                RENTANG WAKTU
                                            </h2>
                                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                                DEFINISIKAN PERIODE OBSERVASI
                                                DATA
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
                                                className="px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 text-white/40 border border-white/5 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/10 transition-all active:scale-95"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-1 bg-black/40 rounded-xl border border-white/5 flex flex-col md:flex-row items-center transition-colors">
                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
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
                                            className="w-full pl-14 pr-4 py-5 bg-transparent border-none rounded-xl focus:ring-0 font-mono font-bold text-white text-lg cursor-pointer"
                                        />
                                        <span className="absolute top-2 left-14 text-[10px] font-bold font-mono text-blue-400/70 uppercase tracking-widest">
                                            MULAI TANGGAL
                                        </span>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center w-12 text-white/20">
                                        <ArrowRight size={20} strokeWidth={1} />
                                    </div>

                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
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
                                            className="w-full pl-14 pr-4 py-5 bg-transparent border-none rounded-xl focus:ring-0 font-mono font-bold text-white text-lg cursor-pointer"
                                        />
                                        <span className="absolute top-2 left-14 text-[10px] font-bold font-mono text-blue-400/70 uppercase tracking-widest">
                                            SAMPAI TANGGAL
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Execute Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="relative w-full group overflow-hidden rounded-xl p-[1px]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 group-hover:via-purple-500 transition-all duration-500"></div>
                                    <div className="relative bg-black rounded-[10px] px-8 py-5 flex items-center justify-center gap-3 overflow-hidden group-hover:bg-opacity-90 transition-all">
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {processing ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <Search className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                                        )}
                                        <span className="font-display font-bold text-lg text-white uppercase tracking-widest">
                                            {processing
                                                ? "MEMPROSES DATA..."
                                                : "EKSEKUSI PEMINDAIAN"}
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
