import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    Search,
    FileText,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    RotateCcw,
    AlertTriangle,
    Plus,
    ChevronDown,
    MoreHorizontal,
    User,
    Bike,
    Calendar,
    ArrowRight,
} from "lucide-react";

export default function Index({
    transactions,
    filters,
    transactionTypes,
    statuses,
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [type, setType] = useState(filters.type || "");
    const [status, setStatus] = useState(filters.status || "");

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
        onConfirm: () => {},
    });

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const handleFilterChange = (key, value) => {
        if (key === "type") setType(value);
        if (key === "status") setStatus(value);

        router.get(
            route("admin.transactions.index"),
            {
                search: key === "search" ? value : search,
                type: key === "type" ? value : type,
                status: key === "status" ? value : status,
            },
            { preserveState: true, replace: true }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setType("");
        setStatus("");
        router.get(route("admin.transactions.index"));
    };

    const getStatusColor = (status) => {
        if (
            [
                "completed",
                "disetujui",
                "ready_for_delivery",
                "payment_confirmed",
            ].includes(status)
        )
            return "bg-emerald-50 text-emerald-700 border-emerald-100";
        if (
            [
                "menunggu_persetujuan",
                "new_order",
                "waiting_payment",
                "unit_preparation",
                "dikirim_ke_surveyor",
                "jadwal_survey",
            ].includes(status)
        )
            return "bg-amber-50 text-amber-700 border-amber-100";
        if (
            ["ditolak", "data_tidak_valid", "cancelled", "rejected"].includes(
                status
            )
        )
            return "bg-rose-50 text-rose-700 border-rose-100";
        return "bg-blue-50 text-blue-700 border-blue-100";
    };

    const formatStatus = (status) => {
        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    // Helper for Avatar Initials
    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <AdminLayout title="Manajemen Transaksi">
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText="Confirm"
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
            />

            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <p className="text-gray-500">
                            Kelola semua transaksi penjualan unit motor.
                        </p>
                    </div>

                    <Link
                        href={route("admin.transactions.create")}
                        className="group inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
                    >
                        <Plus
                            size={20}
                            className="group-hover:rotate-90 transition-transform duration-300"
                        />
                        <span>Transaksi Baru</span>
                    </Link>
                </div>

                {/* Filters & Search Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full xl:w-96 group"
                    >
                        <input
                            type="text"
                            placeholder="Cari ID, nama pelanggan, atau motor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onBlur={() => handleFilterChange("search", search)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-medium text-gray-700 placeholder-gray-400 group-hover:bg-gray-50/80"
                        />
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                            size={20}
                        />
                    </form>

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto overflow-x-auto pb-1 sm:pb-0">
                        {/* Filter Type */}
                        <div className="relative min-w-[140px]">
                            <select
                                value={type}
                                onChange={(e) =>
                                    handleFilterChange("type", e.target.value)
                                }
                                className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer text-sm font-bold text-gray-700 hover:border-gray-300 transition-colors"
                            >
                                <option value="">Semua Tipe</option>
                                {transactionTypes.map((t) => (
                                    <option key={t} value={t}>
                                        {t === "CASH" ? "Tunai" : "Kredit"}
                                    </option>
                                ))}
                            </select>
                            <Filter
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                size={14}
                            />
                        </div>

                        {/* Filter Status */}
                        <div className="relative min-w-[180px]">
                            <select
                                value={status}
                                onChange={(e) =>
                                    handleFilterChange("status", e.target.value)
                                }
                                className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer text-sm font-bold text-gray-700 hover:border-gray-300 transition-colors"
                            >
                                <option value="">Semua Status</option>
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {formatStatus(s)}
                                    </option>
                                ))}
                            </select>
                            <CheckCircle
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                size={14}
                            />
                        </div>

                        {/* Reset Button */}
                        {(search || type || status) && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-100 hover:border-rose-200 transition-all font-bold text-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <RotateCcw size={16} />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-6">ID Transaksi</th>
                                    <th className="p-6">Pelanggan</th>
                                    <th className="p-6">Unit Motor</th>
                                    <th className="p-6">Pembayaran</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-right">Tanggal</th>
                                    <th className="p-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.data.length > 0 ? (
                                    transactions.data.map((transaction) => {
                                        const customerName =
                                            transaction.customer_name ||
                                            transaction.user?.name ||
                                            "Guest";
                                        const initials =
                                            getInitials(customerName);
                                        const isCash =
                                            transaction.transaction_type ===
                                            "CASH";

                                        return (
                                            <tr
                                                key={transaction.id}
                                                className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "admin.transactions.show",
                                                            transaction.id
                                                        )
                                                    )
                                                }
                                            >
                                                <td className="p-6">
                                                    <span className="font-mono font-bold text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md group-hover:bg-white group-hover:text-primary transition-colors border border-gray-200">
                                                        #{transaction.id}
                                                    </span>
                                                </td>

                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
                                                            ${
                                                                isCash
                                                                    ? "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700"
                                                                    : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700"
                                                            }`}
                                                        >
                                                            {initials}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900 text-sm">
                                                                {customerName}
                                                            </div>
                                                            <div className="text-xs text-gray-400 font-medium">
                                                                {transaction.customer_phone ||
                                                                    "-"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                                                            {transaction.motor
                                                                ?.image_path ? (
                                                                <img
                                                                    src={`/storage/${transaction.motor.image_path}`}
                                                                    alt={
                                                                        transaction
                                                                            .motor
                                                                            .name
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                    <Bike
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900 text-sm">
                                                                {transaction
                                                                    .motor
                                                                    ?.name ||
                                                                    "Unknown Unit"}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {
                                                                    transaction
                                                                        .motor
                                                                        ?.brand
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-6">
                                                    <div className="space-y-1">
                                                        <div className="font-bold text-gray-900">
                                                            Rp{" "}
                                                            {new Intl.NumberFormat(
                                                                "id-ID"
                                                            ).format(
                                                                transaction.total_amount
                                                            )}
                                                        </div>
                                                        <div
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                                                isCash
                                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                                    : "bg-purple-50 text-purple-700 border-purple-100"
                                                            }`}
                                                        >
                                                            {isCash
                                                                ? "TUNAI"
                                                                : "KREDIT"}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-6">
                                                    <div className="flex flex-col items-start gap-1">
                                                        <span
                                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(
                                                                transaction.status
                                                            )}`}
                                                        >
                                                            {formatStatus(
                                                                transaction.status
                                                            )}
                                                        </span>
                                                        {/* Document Warning */}
                                                        {transaction.transaction_type ===
                                                            "CREDIT" &&
                                                            !transaction.documents_complete && (
                                                                <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                                                                    <AlertTriangle
                                                                        size={
                                                                            10
                                                                        }
                                                                    />{" "}
                                                                    Dokumen
                                                                </span>
                                                            )}
                                                    </div>
                                                </td>

                                                <td className="p-6 text-right">
                                                    <div className="text-xs font-bold text-gray-500 flex flex-col items-end">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar
                                                                size={12}
                                                            />
                                                            {new Date(
                                                                transaction.created_at
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 mt-0.5">
                                                            {new Date(
                                                                transaction.created_at
                                                            ).toLocaleTimeString(
                                                                "id-ID",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}{" "}
                                                            WIB
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="p-6 text-center">
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-gray-100"
                                                        title="Lihat Detail"
                                                    >
                                                        <ArrowRight size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="p-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-300">
                                                <FileText
                                                    size={48}
                                                    className="mb-4 opacity-50"
                                                />
                                                <p className="text-lg font-bold text-gray-500">
                                                    Tidak ada transaksi
                                                    ditemukan.
                                                </p>
                                                <p className="text-sm">
                                                    Coba sesuaikan filter
                                                    pencarian anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {transactions.links.length > 3 && (
                        <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/30">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {transactions.links.map((link, index) => {
                                    if (!link.url && !link.label) return null;
                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                                                link.active
                                                    ? "bg-primary text-white shadow-primary/30 scale-105"
                                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 text-gray-300 cursor-not-allowed border border-transparent"
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
