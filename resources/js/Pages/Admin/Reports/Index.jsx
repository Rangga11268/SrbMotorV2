import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    FileText,
    Calendar,
    Download,
    Search,
    TrendingUp,
    DollarSign,
    Users,
    Briefcase,
} from "lucide-react";

export default function Index() {
    const { data, setData, get, processing, errors } = useForm({
        type: "sales",
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date().toISOString().split("T")[0],
    });

    const reportTypes = [
        {
            id: "sales",
            label: "Laporan Penjualan",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
        {
            id: "income",
            label: "Laporan Pendapatan",
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
        },
        {
            id: "customer",
            label: "Data Pelanggan",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100",
        },
        {
            id: "status",
            label: "Status Transaksi",
            icon: Briefcase,
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100",
        },
    ];

    const handleGenerate = (e) => {
        e.preventDefault();
        get(route("admin.reports.generate"));
    };

    const handleExportPdf = () => {
        const url = route("admin.reports.export", data);
        window.open(url, "_blank");
    };

    const handleExportExcel = () => {
        const url = route("admin.reports.export_excel", data);
        window.open(url, "_blank");
    };

    return (
        <AdminLayout title="Laporan & Analitik">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Text */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                        Pusat Laporan
                    </h2>
                    <p className="text-gray-500">
                        Pilih jenis laporan dan periode waktu untuk menganalisis
                        performa bisnis anda.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <form onSubmit={handleGenerate} className="space-y-8">
                        {/* 1. Report Type Selection - VISUAL CARDS */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">
                                1. Pilih Jenis Laporan
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {reportTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = data.type === type.id;
                                    return (
                                        <div
                                            key={type.id}
                                            onClick={() =>
                                                setData("type", type.id)
                                            }
                                            className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 text-center group ${
                                                isSelected
                                                    ? `border-primary bg-primary/5 ring-4 ring-primary/10 shadow-lg shadow-primary/10 scale-105 z-10`
                                                    : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50 hover:-translate-y-1"
                                            }`}
                                        >
                                            <div
                                                className={`p-3 rounded-full ${
                                                    isSelected
                                                        ? "bg-white text-primary shadow-sm"
                                                        : `${type.bg} ${type.color}`
                                                }`}
                                            >
                                                <Icon size={24} />
                                            </div>
                                            <span
                                                className={`font-bold text-sm ${
                                                    isSelected
                                                        ? "text-primary"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {type.label}
                                            </span>
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 w-full" />

                        {/* 2. Date Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">
                                2. Tentukan Periode Waktu
                            </label>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                                <div className="relative w-full md:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-700 bg-gray-50 focus:bg-white"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span className="absolute -top-6 left-0 text-xs text-gray-400 font-medium">
                                        Dari Tanggal
                                    </span>
                                </div>

                                <span className="text-gray-300 font-bold hidden md:block">
                                    Process To
                                </span>
                                <span className="text-gray-300 font-bold block md:hidden">
                                    ⬇
                                </span>

                                <div className="relative w-full md:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-gray-700 bg-gray-50 focus:bg-white"
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData("end_date", e.target.value)
                                        }
                                    />
                                    <span className="absolute -top-6 left-0 text-xs text-gray-400 font-medium">
                                        Sampai Tanggal
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                            >
                                {processing ? (
                                    "Memproses..."
                                ) : (
                                    <>
                                        <Search size={20} /> Tampilkan Laporan
                                    </>
                                )}
                            </button>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={handleExportPdf}
                                    className="flex-1 sm:flex-none px-6 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 border border-rose-100"
                                >
                                    <FileText size={18} /> PDF
                                </button>

                                <button
                                    type="button"
                                    onClick={handleExportExcel}
                                    className="flex-1 sm:flex-none px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-100"
                                >
                                    <FileText size={18} /> Excel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
