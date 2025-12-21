import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    RevenueChart,
    StatusPieChart,
} from "@/Components/Admin/DashboardCharts";
import {
    Bike,
    Users,
    ShoppingCart,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowRight,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    BarChart3,
    PieChart as PieChartIcon,
} from "lucide-react";

export default function Dashboard({
    motorsCount,
    contactMessagesCount,
    usersCount,
    transactionsCount,
    cashTransactionsCount,
    creditTransactionsCount,
    recentTransactions,
    recentMotors,
    monthlyStats,
    statusStats,
}) {
    const stats = [
        {
            title: "Total Motor",
            value: motorsCount,
            icon: Bike,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-100 dark:border-blue-800",
        },
        {
            title: "Total Pengguna",
            value: usersCount,
            icon: Users,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            border: "border-purple-100 dark:border-purple-800",
        },
        {
            title: "Total Transaksi",
            value: transactionsCount,
            icon: ShoppingCart,
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-900/20",
            border: "border-green-100 dark:border-green-800",
            subtext: `${cashTransactionsCount} Tunai • ${creditTransactionsCount} Kredit`,
        },
        {
            title: "Pesan Masuk",
            value: contactMessagesCount,
            icon: MessageSquare,
            color: "text-orange-500",
            bg: "bg-orange-50 dark:bg-orange-900/20",
            border: "border-orange-100 dark:border-orange-800",
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
            case "approved":
            case "lunas":
                return "text-green-600 bg-green-50 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
            case "pending":
            case "menunggu_persetujuan":
            case "new_order":
                return "text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
            case "rejected":
            case "cancelled":
                return "text-red-600 bg-red-50 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
            default:
                return "text-gray-600 bg-gray-50 border-gray-100 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600";
        }
    };

    const getStatusLabel = (status) => {
        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Selamat Datang Kembali!
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Ringkasan performa dealer SRB Motors hari ini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-gray-800 p-6 rounded-2xl border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.bg} p-3 rounded-xl`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                <TrendingUp size={12} className="mr-1" /> +2.5%
                            </span>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                            {stat.title}
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                        </p>
                        {stat.subtext && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
                                {stat.subtext}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                <BarChart3
                                    size={20}
                                    className="text-blue-500"
                                />{" "}
                                Pendapatan & Penjualan
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Tren pendapatan 6 bulan terakhir
                            </p>
                        </div>
                    </div>
                    <RevenueChart data={monthlyStats} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                <PieChartIcon
                                    size={20}
                                    className="text-purple-500"
                                />{" "}
                                Status Pesanan
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Distribusi status transaksi
                            </p>
                        </div>
                    </div>
                    <StatusPieChart data={statusStats} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            Transaksi Terbaru
                        </h3>
                        <Link
                            href={route("admin.transactions.index")}
                            className="text-primary text-sm font-bold hover:text-dark-blue flex items-center gap-1"
                        >
                            Lihat Semua <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-bold">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Motor
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Tipe
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                {recentTransactions &&
                                recentTransactions.length > 0 ? (
                                    recentTransactions.map((trx) => (
                                        <tr
                                            key={trx.id}
                                            className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    {trx.customer_name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {trx.customer_phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                                                {trx.motor?.name ||
                                                    "Deleted Motor"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        trx.transaction_type ===
                                                        "CASH"
                                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                            : "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                                    }`}
                                                >
                                                    {trx.transaction_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                                        trx.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(trx.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                                                {new Date(
                                                    trx.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Belum ada transaksi.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            Motor Ditambahkan
                        </h3>
                        <Link
                            href={route("admin.motors.index")}
                            className="text-primary text-sm font-bold hover:text-dark-blue flex items-center gap-1"
                        >
                            Semua <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto max-h-[400px] space-y-6">
                        {recentMotors && recentMotors.length > 0 ? (
                            recentMotors.map((motor) => (
                                <div
                                    key={motor.id}
                                    className="flex gap-4 items-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 -mx-2 rounded-xl transition-colors"
                                >
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-600">
                                        {motor.image_path ? (
                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                alt={motor.name}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Bike size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                            {motor.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            {motor.brand?.name || "No Brand"} •{" "}
                                            {motor.year}
                                        </p>
                                        <p className="text-sm font-bold text-dark-blue dark:text-blue-400">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor.price)}
                                        </p>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-white dark:hover:bg-gray-600 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                        <ArrowUpRight size={20} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                Belum ada data motor.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
