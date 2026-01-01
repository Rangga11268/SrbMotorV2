import React, { useRef } from "react";
import { Link, Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Printer,
    Download,
    FileText,
    Calendar,
    Box,
    TrendingUp,
    DollarSign,
    Users,
    Briefcase,
    ShoppingCart,
    CreditCard,
    MoreHorizontal,
    Sparkles,
    Activity,
    PieChart,
    BarChart3,
} from "lucide-react";
import {
    RevenueChart,
    StatusPieChart,
} from "@/Components/Admin/DashboardCharts";

export default function Show({
    type,
    title,
    description,
    startDate,
    endDate,
    rawStartDate,
    rawEndDate,
    data,
}) {
    const getSummaryStats = () => {
        if (!data) return [];

        switch (type) {
            case "sales":
                return [
                    {
                        label: "TOTAL TRANSAKSI",
                        value: data.total_transactions,
                        icon: ShoppingCart,
                        color: "text-emerald-400",
                        bg: "bg-emerald-500/10",
                        border: "border-emerald-500/20",
                    },
                    {
                        label: "TOTAL REVENUE",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.total_revenue
                        )}`,
                        icon: DollarSign,
                        color: "text-blue-400",
                        bg: "bg-blue-500/10",
                        border: "border-blue-500/20",
                    },
                ];
            case "income":
                return [
                    {
                        label: "PENDAPATAN KOTOR",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.total_income
                        )}`,
                        icon: TrendingUp,
                        color: "text-emerald-400",
                        bg: "bg-emerald-500/10",
                        border: "border-emerald-500/20",
                    },
                    {
                        label: "KAS TUNAI",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.cash_income
                        )}`,
                        icon: DollarSign,
                        color: "text-blue-400",
                        bg: "bg-blue-500/10",
                        border: "border-blue-500/20",
                    },
                    {
                        label: "PEMASUKAN KREDIT",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.credit_income
                        )}`,
                        icon: CreditCard,
                        color: "text-amber-400",
                        bg: "bg-amber-500/10",
                        border: "border-amber-500/20",
                    },
                ];
            case "customer":
                return [
                    {
                        label: "TOTAL KLIEN",
                        value: data.total_customers,
                        icon: Users,
                        color: "text-violet-400",
                        bg: "bg-violet-500/10",
                        border: "border-violet-500/20",
                    },
                    {
                        label: "KLIEN BARU",
                        value: data.new_customers,
                        icon: Sparkles,
                        color: "text-pink-400",
                        bg: "bg-pink-500/10",
                        border: "border-pink-500/20",
                    },
                ];
            case "status":
                return [
                    {
                        label: "TOTAL ORDER",
                        value: data.total_transactions,
                        icon: Box,
                        color: "text-gray-400",
                        bg: "bg-gray-500/10",
                        border: "border-gray-500/20",
                    },
                ];
            default:
                return [];
        }
    };

    const getChartData = () => {
        if (!data) return [];

        switch (type) {
            case "sales":
            case "income":
                if (!data.items) return [];
                const grouped = data.items.reduce((acc, item) => {
                    const dateKey = item.created_at.substring(0, 6); // Just rough grouping/date logic
                    if (!acc[dateKey]) acc[dateKey] = 0;
                    acc[dateKey] += parseFloat(item.total_amount || 0);
                    return acc;
                }, {});

                return Object.keys(grouped).map((date) => ({
                    name: date,
                    revenue: grouped[date],
                }));

            case "status":
                if (!data.by_status) return [];
                return Object.entries(data.by_status).map(
                    ([status, stats]) => ({
                        name: status.replace(/_/g, " "),
                        value: stats.count,
                    })
                );

            default:
                return [];
        }
    };

    const renderChart = () => {
        const chartData = getChartData();
        if (chartData.length === 0) return null;

        if (type === "sales" || type === "income") {
            return (
                <div className="mb-8 p-6 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 shadow-lg print:hidden relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -z-10"></div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <TrendingUp
                                    size={20}
                                    className="text-blue-400"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg font-display uppercase tracking-wide">
                                    GRAFIK PENDAPATAN
                                </h3>
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                    VISUALISASI TREN KEUANGAN
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <RevenueChart data={chartData} />
                    </div>
                </div>
            );
        } else if (type === "status") {
            return (
                <div className="mb-8 p-6 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 shadow-lg print:hidden relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] -z-10"></div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Box size={20} className="text-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg font-display uppercase tracking-wide">
                                    DISTRIBUSI STATUS
                                </h3>
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                    KOMPOSISI PROGRES ORDER
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <StatusPieChart data={chartData} />
                    </div>
                </div>
            );
        }
        return null;
    };

    const calculateTotal = (key) => {
        if (!data || !data.items || data.items.length === 0) return 0;
        return data.items.reduce(
            (sum, item) => sum + (Number(item[key]) || 0),
            0
        );
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExportPdf = () => {
        const url = route("admin.reports.export", {
            type: type,
            start_date: rawStartDate,
            end_date: rawEndDate,
        });
        window.open(url, "_blank");
    };

    const getReportIcon = () => {
        switch (type) {
            case "sales":
                return <TrendingUp size={24} className="text-emerald-400" />;
            case "income":
                return <DollarSign size={24} className="text-blue-400" />;
            case "customer":
                return <Users size={24} className="text-violet-400" />;
            default:
                return <FileText size={24} className="text-gray-400" />;
        }
    };

    const renderTable = () => {
        let listData = [];
        if (type === "sales" || type === "income") {
            listData = data.items || [];
        } else if (type === "customer") {
            listData = data.top_customers || [];
        } else if (type === "status") {
            const statusEntries = data.by_status
                ? Object.entries(data.by_status)
                : [];
            listData = statusEntries;
        }

        if (!listData || listData.length === 0) {
            return (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Box className="text-white/20" size={32} />
                    </div>
                    <p className="font-bold text-white/40 text-lg font-display uppercase tracking-wide">
                        DATA TIDAK TERSEDIA
                    </p>
                    <p className="text-white/20 text-xs font-mono mt-1 uppercase">
                        SILAKAN SESUAIKAN PARAMETER PENCARIAN
                    </p>
                </div>
            );
        }

        let headers = [];
        let rows = [];

        if (type === "sales" || type === "income") {
            headers = ["ID", "TANGGAL", "KLIEN", "UNIT", "METODE", "TOTAL"];
            rows = listData.map((item, index) => (
                <tr
                    key={item.id || index}
                    className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                    <td className="p-5 font-mono text-[10px] font-bold text-blue-400">
                        #{item.id}
                    </td>
                    <td className="p-5 text-xs font-mono text-white/60">
                        {item.created_at}
                    </td>
                    <td className="p-5 font-bold text-white text-sm font-display uppercase tracking-wide">
                        {item.customer_name}
                    </td>
                    <td className="p-5 text-xs font-mono text-white/60">
                        {item.motor_name}
                    </td>
                    <td className="p-5">
                        <span
                            className={`px-2 py-1 rounded text-[10px] font-bold font-mono border ${
                                item.type === "CASH"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            }`}
                        >
                            {item.type}
                        </span>
                    </td>
                    <td className="p-5 font-mono font-bold text-white text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            item.total_amount || 0
                        )}
                    </td>
                </tr>
            ));
        } else if (type === "customer") {
            headers = ["KLIEN", "EMAIL", "TRANSAKSI", "VALUASI"];
            rows = listData.map((item, index) => (
                <tr
                    key={index}
                    className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                    <td className="p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400 font-mono">
                                {item.name.charAt(0)}
                            </div>
                            <span className="font-bold text-white text-sm font-display uppercase tracking-wide">
                                {item.name}
                            </span>
                        </div>
                    </td>
                    <td className="p-5 text-xs font-mono text-white/60">
                        {item.email}
                    </td>
                    <td className="p-5 text-center font-mono font-bold text-white">
                        {item.transaction_count}
                    </td>
                    <td className="p-5 font-mono font-bold text-white text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            item.total_spent || 0
                        )}
                    </td>
                </tr>
            ));
        } else if (type === "status") {
            headers = ["STATUS", "JUMLAH", "VALUASI"];
            const statusEntries = data.by_status
                ? Object.entries(data.by_status)
                : [];

            rows = statusEntries.map(([status, stats], index) => (
                <tr
                    key={index}
                    className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                    <td className="p-5">
                        <span className="font-bold text-xs uppercase px-3 py-1 bg-white/5 rounded border border-white/10 tracking-wider text-white">
                            {status.replace(/_/g, " ")}
                        </span>
                    </td>
                    <td className="p-5 font-mono font-bold text-lg text-white">
                        {stats.count}
                    </td>
                    <td className="p-5 font-mono font-bold text-white text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            stats.revenue || 0
                        )}
                    </td>
                </tr>
            ));
        }

        return (
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg font-display uppercase tracking-wide flex items-center gap-2">
                        <Activity size={20} className="text-blue-400" />
                        TABEL DATA RINCI
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5 text-white/40 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                                {headers.map((h, i) => (
                                    <th
                                        key={i}
                                        className={`p-5 ${
                                            h === "TOTAL" || h === "VALUASI"
                                                ? "text-right"
                                                : ""
                                        }`}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>

                        {(type === "sales" || type === "income") && (
                            <tfoot className="bg-white/5 font-bold text-white">
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-5 text-right font-mono text-[10px] uppercase text-white/40 tracking-wider"
                                    >
                                        GRAND TOTAL
                                    </td>
                                    <td className="p-5 text-right text-lg font-mono text-emerald-400">
                                        Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            calculateTotal("total_amount")
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout title="HASIL LAPORAN">
            <Head title="HASIL ANALISIS DATA" />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header & Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <Link
                        href={route("admin.reports.index")}
                        className="group flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <div>
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-0.5 group-hover:text-blue-400 transition-colors">
                                KEMBALI KE
                            </span>
                            <span className="text-lg font-bold font-display text-white uppercase tracking-wide">
                                PUSAT LAPORAN
                            </span>
                        </div>
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 print:hidden">
                        <div className="px-4 py-2 bg-black/40 rounded-xl border border-white/10 text-xs font-mono font-bold text-white/60 flex items-center gap-2">
                            <Calendar size={14} className="text-blue-400" />
                            {startDate} — {endDate}
                        </div>

                        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden lg:block"></div>

                        <button
                            onClick={handlePrint}
                            className="px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl font-bold font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Printer size={16} />
                            <span className="hidden sm:inline">
                                CETAK DOKUMEN
                            </span>
                        </button>
                        <button
                            onClick={handleExportPdf}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold font-mono text-xs uppercase tracking-wider hover:bg-blue-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                        >
                            <Download size={16} /> EXPORT PDF
                        </button>
                    </div>
                </div>

                {/* Report Content */}
                <div className="print:p-0 print:border-none">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg shadow-black/50">
                            {getReportIcon()}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black font-display text-white uppercase tracking-wide mb-1">
                                {title}
                            </h1>
                            <p className="text-sm font-mono text-white/40 uppercase tracking-wider">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {getSummaryStats().map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-6 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl shadow-lg relative overflow-hidden group hover:bg-white/5 transition-all duration-300"
                                >
                                    <div
                                        className={`absolute top-0 right-0 w-24 h-24 ${
                                            stat.bg.split(" ")[0]
                                        } rounded-full blur-[40px] -z-10 opacity-50`}
                                    ></div>
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`p-3 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}
                                        >
                                            <Icon size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-white/40 font-bold uppercase tracking-widest mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-black font-display text-white tracking-wide">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {renderChart()}
                    {renderTable()}

                    <div className="mt-12 text-center print:block hidden">
                        <p className="text-[10px] font-mono text-black uppercase tracking-widest">
                            DICETAK OTOMATIS OLEH SISTEM ADMIN SRB MOTOR —{" "}
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
