import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Upload,
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Image as ImageIcon,
    X,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UploadCreditDocuments({ transaction }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        documents: {
            KTP: [],
            KK: [],
            SLIP_GAJI: [],
            LAINNYA: [],
        },
    });

    // Helper to handle file input changes
    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        setData("documents", {
            ...data.documents,
            [type]: files,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("motors.upload-credit-documents.post", transaction.id)); // Note: Check route name in web.php
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <MainLayout title="Unggah Dokumen Kredit">
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-900">
                            Unggah <span className="text-primary">Dokumen</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Lengkapi persyaratan kredit untuk{" "}
                            {transaction.motor.name}
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                <h2 className="text-2xl font-bold relative z-10 flex items-center gap-3">
                                    <Upload size={28} />
                                    Unggah Dokumen
                                </h2>
                            </div>

                            <div className="p-8">
                                {/* Motor & Credit Summary */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 items-center">
                                    <img
                                        src={`/storage/${transaction.motor.image_path}`}
                                        alt={transaction.motor.name}
                                        className="w-full md:w-32 h-24 object-contain bg-white rounded-xl shadow-sm p-2"
                                    />
                                    <div className="flex-1 w-full">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {transaction.motor.name}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                                                <div className="text-gray-500 text-xs">
                                                    Uang Muka
                                                </div>
                                                <div className="font-bold text-gray-800">
                                                    {formatCurrency(
                                                        transaction
                                                            .credit_detail
                                                            .down_payment
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                                                <div className="text-gray-500 text-xs">
                                                    Cicilan/Bulan
                                                </div>
                                                <div className="font-bold text-gray-800">
                                                    {formatCurrency(
                                                        transaction
                                                            .credit_detail
                                                            .monthly_installment
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                                                <div className="text-gray-500 text-xs">
                                                    Tenor
                                                </div>
                                                <div className="font-bold text-gray-800">
                                                    {
                                                        transaction
                                                            .credit_detail.tenor
                                                    }{" "}
                                                    Bulan
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-8">
                                    <h5 className="font-bold text-dark-blue flex items-center gap-2 mb-3">
                                        <AlertCircle size={20} /> Persyaratan
                                        Dokumen
                                    </h5>
                                    <ul className="list-disc list-inside text-primary/80 text-sm space-y-1 pl-1">
                                        <li>
                                            Foto KTP (Kartu Tanda Penduduk) -
                                            Depan & Belakang
                                        </li>
                                        <li>Foto Kartu Keluarga (KK)</li>
                                        <li>
                                            Slip gaji 3 bulan terakhir atau
                                            rekening koran
                                        </li>
                                    </ul>
                                </div>

                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <FileUploadField
                                            label="KTP (Kartu Tanda Penduduk)"
                                            id="document_ktp"
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "KTP")
                                            }
                                            error={errors["documents.KTP"]}
                                            files={data.documents.KTP}
                                            required
                                            description="Unggah foto KTP (depan & belakang) atau PDF"
                                        />

                                        <FileUploadField
                                            label="Kartu Keluarga (KK)"
                                            id="document_kk"
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "KK")
                                            }
                                            error={errors["documents.KK"]}
                                            files={data.documents.KK}
                                            required
                                            description="Unggah foto Kartu Keluarga"
                                        />

                                        <FileUploadField
                                            label="Slip Gaji / Rekening Koran"
                                            id="document_slip_gaji"
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "SLIP_GAJI")
                                            }
                                            error={
                                                errors["documents.SLIP_GAJI"]
                                            }
                                            files={data.documents.SLIP_GAJI}
                                            required
                                            description="Unggah slip gaji 3 bulan terakhir"
                                        />

                                        <FileUploadField
                                            label="Dokumen Tambahan (Opsional)"
                                            id="document_lainnya"
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "LAINNYA")
                                            }
                                            error={errors["documents.LAINNYA"]}
                                            files={data.documents.LAINNYA}
                                            description="Dokumen pendukung lainnya jika ada"
                                        />
                                    </div>

                                    {progress && (
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                    )}

                                    <div className="flex flex-col-reverse md:flex-row gap-4 pt-4 border-t border-gray-100">
                                        <Link
                                            href={route(
                                                "motors.order.confirmation",
                                                transaction.id
                                            )}
                                            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft size={20} /> Kembali
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <Upload size={20} /> Unggah Dokumen
                                            & Lanjutkan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function FileUploadField({
    label,
    id,
    accept,
    onChange,
    error,
    files,
    required,
    description,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative group">
                <input
                    type="file"
                    id={id}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept={accept}
                    multiple
                    onChange={onChange}
                    required={required}
                />
                <div
                    className={`w-full p-4 rounded-xl border-2 border-dashed ${
                        error
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-gray-50 group-hover:border-blue-400 group-hover:bg-blue-50"
                    } transition-all flex flex-col items-center justify-center text-center`}
                >
                    <div className="bg-white p-2 rounded-full shadow-sm mb-2">
                        <Upload size={20} className="text-gray-400" />
                    </div>
                    {files && files.length > 0 ? (
                        <div className="text-sm font-medium text-gray-800">
                            {files.length} file dipilih
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">
                            Klik untuk memilih file
                        </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                        {description}
                    </div>
                </div>
            </div>
            {/* Preview List (Simple) */}
            {files && files.length > 0 && (
                <div className="mt-2 space-y-1">
                    {Array.from(files).map((file, idx) => (
                        <div
                            key={idx}
                            className="text-xs text-gray-600 flex items-center gap-1"
                        >
                            <CheckCircle size={10} className="text-green-500" />{" "}
                            {file.name}
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
