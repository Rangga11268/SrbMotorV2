import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { FileText, Calendar, Download, Search } from "lucide-react";

export default function Index() {
    const { data, setData, get, processing, errors } = useForm({
        type: "sales",
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
    });

    const handleGenerate = (e) => {
        e.preventDefault();
        get(route("admin.reports.generate"));
    };

    const handleExportPdf = () => {
        const url = route('admin.reports.export', data);
        window.open(url, '_blank');
    };

    const handleExportExcel = () => {
        const url = route('admin.reports.export_excel', data);
        window.open(url, '_blank');
    };

    return (
        <AdminLayout title="Laporan">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900">
                        <FileText className="text-primary" /> Generator Laporan
                    </h2>

                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Report Type */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Laporan</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                                    value={data.type}
                                    onChange={e => setData("type", e.target.value)}
                                >
                                    <option value="sales">Laporan Penjualan</option>
                                    <option value="income">Laporan Pendapatan</option>
                                    <option value="customer">Laporan Pelanggan</option>
                                    <option value="status">Status Transaksi</option>
                                </select>
                                {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Mulai</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    value={data.start_date}
                                    onChange={e => setData("start_date", e.target.value)}
                                />
                                {errors.start_date && <div className="text-red-500 text-xs mt-1">{errors.start_date}</div>}
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    value={data.end_date}
                                    onChange={e => setData("end_date", e.target.value)}
                                />
                                {errors.end_date && <div className="text-red-500 text-xs mt-1">{errors.end_date}</div>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
                            >
                                {processing ? 'Memproses...' : <><Search size={20} /> Lihat Laporan</>}
                            </button>

                            <button
                                type="button"
                                onClick={handleExportPdf}
                                className="sm:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText size={20} /> PDF
                            </button>

                            <button
                                type="button"
                                onClick={handleExportExcel}
                                className="sm:w-auto px-6 py-3 bg-green-50 text-green-600 rounded-xl font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText size={20} /> Excel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Text */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Silakan pilih jenis laporan dan periode tanggal, lalu klik tombol "Lihat Laporan" untuk menampilkan preview,
                        atau tombol Ekspor untuk mengunduh file langsung.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
