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
    // Helper to calculate or get total
    const getSummaryStats = () => {
        if (!data) return [];

        switch (type) {
            case "sales":
                return [
                    {
                        label: "Total Transaksi",
                        value: data.total_transactions,
                        icon: ShoppingCart,
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
                    },
                    {
                        label: "Total Pendapatan",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.total_revenue
                        )}`,
                        icon: DollarSign,
                        color: "text-blue-500",
                        bg: "bg-blue-500/10 dark:bg-blue-500/20",
                    },
                ];
            case "income":
                return [
                    {
                        label: "Gross Income",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.total_income
                        )}`,
                        icon: TrendingUp,
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
                    },
                    {
                        label: "Cash Income",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.cash_income
                        )}`,
                        icon: DollarSign,
                        color: "text-blue-500",
                        bg: "bg-blue-500/10 dark:bg-blue-500/20",
                    },
                    {
                        label: "Credit Income",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.credit_income
                        )}`,
                        icon: CreditCard,
                        color: "text-amber-500",
                        bg: "bg-amber-500/10 dark:bg-amber-500/20",
                    },
                ];
            case "customer":
                return [
                    {
                        label: "Total Pelanggan",
                        value: data.total_customers,
                        icon: Users,
                        color: "text-violet-500",
                        bg: "bg-violet-500/10 dark:bg-violet-500/20",
                    },
                    {
                        label: "Pelanggan Baru",
                        value: data.new_customers,
                        icon: [Users, SparklesIcon], // Custom composition logic needed if multiple icons, kept simple here
                        color: "text-pink-500",
                        bg: "bg-pink-500/10 dark:bg-pink-500/20",
                    },
                ];
            case "status":
                return [
                    {
                        label: "Total Transaksi",
                        value: data.total_transactions,
                        icon: Box,
                        color: "text-gray-500 dark:text-gray-400",
                        bg: "bg-gray-500/10 dark:bg-gray-500/20",
                    },
                ];
            default:
                return [];
        }
    };

    // Prepare Data for Charts
    const getChartData = () => {
        if (!data) return [];

        switch (type) {
            case "sales":
            case "income":
                if (!data.items) return [];
                const grouped = data.items.reduce((acc, item) => {
                    const dateKey = item.created_at.substring(0, 6); // "01 Jan"
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
                <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm print:hidden transition-colors">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                <TrendingUp
                                    size={20}
                                    className="text-blue-600 dark:text-blue-400"
                                />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                                Tren Pendapatan
                            </h3>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <RevenueChart data={chartData} />
                    </div>
                </div>
            );
        } else if (type === "status") {
            return (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm print:hidden transition-colors">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                                <Box
                                    size={20}
                                    className="text-amber-600 dark:text-amber-400"
                                />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                                Distribusi Status
                            </h3>
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

    // Header Stats to show summary at a glance
    const calculateTotal = (key) => {
        if (!data || !data.items || data.items.length === 0) return 0;
        return data.items.reduce(
            (sum, item) => sum + (Number(item[key]) || 0),
            0
        );
    };

    // Native Print Strategy
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
                return <TrendingUp size={24} className="text-emerald-500" />;
            case "income":
                return <DollarSign size={24} className="text-blue-500" />;
            case "customer":
                return <Users size={24} className="text-violet-500" />;
            default:
                return (
                    <FileText
                        size={24}
                        className="text-gray-500 dark:text-gray-400"
                    />
                );
        }
    };

    const renderTable = () => {
        let listData = [];
        if (type === "sales" || type === "income") {
            listData = data.items || [];
        } else if (type === "customer") {
            listData = data.top_customers || [];
        } else if (type === "status") {
            // Re-map listData for status to include keys if it was an object
            const statusEntries = data.by_status
                ? Object.entries(data.by_status)
                : [];
            // We'll process this below directly or map it here.
            // Let's use statusEntries directly in the map below for 'status' type.
            listData = statusEntries; // Just to pass the empty check
        }

        if (!listData || listData.length === 0) {
            return (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Box
                            className="text-gray-400 dark:text-gray-500"
                            size={32}
                        />
                    </div>
                    <p className="font-bold text-gray-500 dark:text-gray-400 text-lg">
                        Tidak ada data untuk periode ini.
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                        Coba pilih rentang tanggal yang lain.
                    </p>
                </div>
            );
        }

        let headers = [];
        let rows = [];

        if (type === "sales" || type === "income") {
            headers = [
                "ID Transaksi",
                "Tanggal",
                "Pelanggan",
                "Motor",
                "Metode",
                "Total",
            ];
            rows = listData.map((item, index) => (
                <tr
                    key={item.id || index}
                    className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                    <td className="p-5 font-mono text-xs font-bold text-gray-500 dark:text-gray-400">
                        #{item.id}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {item.created_at}
                    </td>
                    <td className="p-5 font-bold text-gray-800 dark:text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300">
                                {item.customer_name.charAt(0)}
                            </div>
                            {item.customer_name}
                        </div>
                    </td>
                    <td className="p-5 text-sm text-gray-600 dark:text-gray-300">
                        {item.motor_name}
                    </td>
                    <td className="p-5">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                                item.type === "CASH"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                        >
                            {item.type}
                        </span>
                    </td>
                    <td className="p-5 font-bold text-gray-900 dark:text-white text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            item.total_amount || 0
                        )}
                    </td>
                </tr>
            ));
        } else if (type === "customer") {
            headers = [
                "Pelanggan",
                "Email",
                "Total Transaksi",
                "Total Belanja",
            ];
            rows = listData.map((item, index) => (
                <tr
                    key={index}
                    className="group hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors"
                >
                    <td className="p-5 font-bold text-gray-800 dark:text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">
                                {item.name.charAt(0)}
                            </div>
                            {item.name}
                        </div>
                    </td>
                    <td className="p-5 text-gray-600 dark:text-gray-300 text-sm">
                        {item.email}
                    </td>
                    <td className="p-5 text-center font-bold text-gray-900 dark:text-white">
                        {item.transaction_count}
                    </td>
                    <td className="p-5 font-bold text-gray-900 dark:text-white text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            item.total_spent || 0
                        )}
                    </td>
                </tr>
            ));
        } else if (type === "status") {
            headers = ["Status Pesanan", "Jumlah", "Valuasi"];
            const statusEntries = data.by_status
                ? Object.entries(data.by_status)
                : [];

            rows = statusEntries.map(([status, stats], index) => (
                <tr
                    key={index}
                    className="group hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors"
                >
                    <td className="p-5">
                        <span className="font-bold text-gray-700 dark:text-gray-200 uppercase px-4 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 text-xs tracking-wider">
                            {status.replace(/_/g, " ")}
                        </span>
                    </td>
                    <td className="p-5 font-black text-lg text-gray-800 dark:text-white pl-10">
                        {stats.count}
                    </td>
                    <td className="p-5 font-bold text-gray-900 dark:text-white text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            stats.revenue || 0
                        )}
                    </td>
                </tr>
            ));
        }

        return (
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
                        <MoreHorizontal size={20} className="text-gray-400" />
                        Rincian Data
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100/50 dark:border-gray-700 text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-widest font-bold">
                                {headers.map((h, i) => (
                                    <th
                                        key={i}
                                        className={`p-5 ${
                                            h.includes("Total") ||
                                            h.includes("Valuasi")
                                                ? "text-right"
                                                : ""
                                        }`}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {rows}
                        </tbody>

                        {(type === "sales" || type === "income") && (
                            <tfoot className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur font-black text-gray-900 dark:text-white">
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-5 text-right uppercase tracking-wide text-xs text-gray-500 dark:text-gray-400"
                                    >
                                        Grand Total
                                    </td>
                                    <td className="p-5 text-right text-lg">
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

    // Dummy component for icon fallback
    const SparklesIcon = () => <Sparkles size={24} className="text-pink-500" />;

    return (
        <AdminLayout>
            <Head title={title} />

            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <Link
                        href={route("admin.reports.index")}
                        className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-gray-900 dark:group-hover:border-white group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 transition-all shadow-sm">
                            <ArrowLeft size={18} />
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 block mb-0.5 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                                Kembali ke
                            </span>
                            <span className="text-lg">Control Center</span>
                        </div>
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 print:hidden">
                        <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-2 transition-colors">
                            <Calendar size={14} className="text-gray-400" />
                            {startDate} - {endDate}
                        </div>

                        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2 hidden lg:block"></div>

                        <button
                            onClick={handlePrint}
                            className="px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all flex items-center gap-2 shadow-sm"
                        >
                            <Printer size={18} />
                            <span className="hidden sm:inline">Cetak</span>
                        </button>
                        <button
                            onClick={handleExportPdf}
                            className="px-5 py-2.5 bg-gray-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-black dark:hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-gray-900/10 dark:shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-0.5"
                        >
                            <Download size={18} /> Export PDF
                        </button>
                    </div>
                </div>

                {/* Printable Area */}
                <div className="print:p-0 print:border-none">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shadow-lg shadow-gray-200/50 dark:shadow-black/50 transition-colors">
                            {getReportIcon()}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-1">
                                {title}
                            </h1>
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Summary Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                        {getSummaryStats().map((stat, idx) => {
                            const Icon = stat.icon;
                            // Check if Icon is array or component
                            const isIconComponent =
                                typeof Icon === "function" ||
                                typeof Icon === "object";

                            return (
                                <div
                                    key={idx}
                                    className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2rem] shadow-xl shadow-gray-100/50 dark:shadow-black/20 flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}
                                        >
                                            {isIconComponent && (
                                                <Icon size={24} />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
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
                        <p className="text-xs text-gray-400">
                            Dicetak otomatis oleh Sistem Admin SRB Motor pada{" "}
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
