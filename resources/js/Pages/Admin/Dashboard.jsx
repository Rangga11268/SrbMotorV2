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
            title: "ARMADA UNIT",
            value: motorsCount,
            icon: Bike,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            title: "TOTAL CUSTOMER",
            value: usersCount,
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            title: "TRANSAKSI",
            value: transactionsCount,
            icon: ShoppingCart,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            subtext: `${cashTransactionsCount} Tunai • ${creditTransactionsCount} Kredit`,
        },
        {
            title: "INBOX MASUK",
            value: contactMessagesCount,
            icon: MessageSquare,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
            case "approved":
            case "lunas":
                return "text-green-400 bg-green-500/10 border-green-500/20";
            case "pending":
            case "menunggu_persetujuan":
            case "new_order":
                return "text-amber-400 bg-amber-500/10 border-amber-500/20";
            case "rejected":
            case "cancelled":
                return "text-red-400 bg-red-500/10 border-red-500/20";
            default:
                return "text-gray-400 bg-white/5 border-white/10";
        }
    };

    const getStatusLabel = (status) => {
        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <AdminLayout title="COMMAND CENTER">
            <Head title="Admin Dashboard" />

            {/* Welcome / Header */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6 bg-zinc-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                <div>
                    <h2 className="text-3xl font-display font-black text-white mb-2">
                        STATUS:{" "}
                        <span className="text-accent text-glow">
                            OPERASIONAL
                        </span>
                    </h2>
                    <p className="text-gray-400">
                        Selamat datang kembali, Admin. Sistem berjalan optimal.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-white/60">
                        {new Date().toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border ${stat.border} hover:border-white/20 transition-all duration-300 group`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className={`${stat.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}
                            >
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className="flex items-center text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-full uppercase tracking-wider">
                                <TrendingUp size={12} className="mr-1" /> +2.5%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">
                            {stat.title}
                        </h3>
                        <p className="text-3xl font-mono font-bold text-white text-glow">
                            {stat.value}
                        </p>
                        {stat.subtext && (
                            <p className="text-[10px] text-gray-500 mt-2 font-mono">
                                {stat.subtext}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                <BarChart3
                                    size={20}
                                    className="text-blue-500"
                                />
                                ANALISIS PENDAPATAN
                            </h3>
                        </div>
                    </div>
                    <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                        <RevenueChart data={monthlyStats} />
                    </div>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                <PieChartIcon
                                    size={20}
                                    className="text-purple-500"
                                />
                                DISTRIBUSI STATUS
                            </h3>
                        </div>
                    </div>
                    <StatusPieChart data={statusStats} />
                </div>
            </div>

            {/* Recent Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="font-bold text-lg text-white">
                            TRANSAKSI LANGSUNG
                        </h3>
                        <Link
                            href={route("admin.transactions.index")}
                            className="text-white/50 text-xs font-bold hover:text-accent flex items-center gap-1 uppercase tracking-widest"
                        >
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] text-white/30 uppercase tracking-widest">
                                    <th className="px-6 py-4 font-bold">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Unit
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Metode
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 font-bold">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-mono text-sm">
                                {recentTransactions &&
                                recentTransactions.length > 0 ? (
                                    recentTransactions.map((trx) => (
                                        <tr
                                            key={trx.id}
                                            className="hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">
                                                    {trx.customer_name}
                                                </div>
                                                <div className="text-[10px] text-white/40">
                                                    {trx.customer_phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white/70">
                                                {trx.motor?.name || "Deleted"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-[10px] font-bold border ${
                                                        trx.transaction_type ===
                                                        "CASH"
                                                            ? "text-blue-400 border-blue-400/30 bg-blue-500/10"
                                                            : "text-purple-400 border-purple-400/30 bg-purple-500/10"
                                                    }`}
                                                >
                                                    {trx.transaction_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusColor(
                                                        trx.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(trx.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-white/40 text-xs">
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
                                            className="px-6 py-8 text-center text-white/30 italic"
                                        >
                                            Data kosong.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Motors */}
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="font-bold text-lg text-white">
                            DATABASE UNIT
                        </h3>
                        <Link
                            href={route("admin.motors.index")}
                            className="text-white/50 text-xs font-bold hover:text-accent flex items-center gap-1 uppercase tracking-widest"
                        >
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto max-h-[400px] space-y-4">
                        {recentMotors && recentMotors.length > 0 ? (
                            recentMotors.map((motor) => (
                                <div
                                    key={motor.id}
                                    className="flex gap-4 items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors"
                                >
                                    <div className="w-14 h-14 bg-black/40 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                        {motor.image_path ? (
                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform grayscale group-hover:grayscale-0"
                                                alt={motor.name}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <Bike size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white truncate group-hover:text-accent transition-colors">
                                            {motor.name}
                                        </h4>
                                        <p className="text-[10px] text-white/50 mb-1 font-mono uppercase">
                                            {motor.brand?.name || "No Brand"} •{" "}
                                            {motor.year}
                                        </p>
                                        <p className="text-sm font-bold text-accent">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor.price)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-white/30 py-8">
                                Belum ada unit.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
