import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Upload,
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Eye,
    Clock,
    XCircle,
    AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentManagement({ transaction }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        documents: {
            KTP: [],
            KK: [],
            SLIP_GAJI: [],
            LAINNYA: [],
        },
    });

    // Status Helper
    const getCreditStatusInfo = (status) => {
        switch (status) {
            case "disetujui":
            case "ready_for_delivery":
                return {
                    label: "Disetujui",
                    color: "bg-green-100 text-green-700 border-green-200",
                    icon: CheckCircle,
                };
            case "menunggu_persetujuan":
            case "dikirim_ke_surveyor":
            case "PENDING_REVIEW":
            case "SUBMITTED_TO_SURVEYOR":
            case "SURVEY_SCHEDULED":
                return {
                    label: "Menunggu Persetujuan",
                    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
                    icon: Clock,
                };
            case "ditolak":
            case "REJECTED":
                return {
                    label: "Ditolak",
                    color: "bg-red-100 text-red-700 border-red-200",
                    icon: XCircle,
                };
            default:
                return {
                    label: status,
                    color: "bg-blue-100 text-blue-700 border-blue-200",
                    icon: FileText,
                };
        }
    };

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        setData("documents", {
            ...data.documents,
            [type]: files,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("motors.update-documents", transaction.id));
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const creditStatus = getCreditStatusInfo(
        transaction.credit_detail?.credit_status
    );
    const StatusIcon = creditStatus.icon;

    // Group documents by type
    const groupedDocuments =
        transaction.credit_detail?.documents?.reduce((acc, doc) => {
            // Handle both older and newer structure if needed, but assuming Inertia passes relations
            // Assuming documents is an array of objects
            const type = doc.document_type;
            if (!acc[type]) acc[type] = [];
            acc[type].push(doc);
            return acc;
        }, {}) || {};

    const hasRequiredDocs =
        transaction.credit_detail?.documents?.some(
            (d) => d.document_type === "KTP"
        ) &&
        transaction.credit_detail?.documents?.some(
            (d) => d.document_type === "KK"
        ) &&
        transaction.credit_detail?.documents?.some(
            (d) => d.document_type === "SLIP_GAJI"
        );

    return (
        <MainLayout title="Manajemen Dokumen">
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-900">
                            Manajemen{" "}
                            <span className="text-primary">Dokumen</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Kelola dokumen pengajuan kredit untuk{" "}
                            {transaction.motor.name}
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Motor & Credit Summary Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FileText size={24} /> Informasi Kredit
                                </h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border bg-white/20 border-white/30 text-white backdrop-blur-sm`}
                                >
                                    <StatusIcon size={14} />{" "}
                                    {creditStatus.label}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <img
                                        src={`/storage/${transaction.motor.image_path}`}
                                        alt={transaction.motor.name}
                                        className="w-full md:w-32 h-24 object-contain bg-white rounded-xl shadow-sm p-2"
                                    />
                                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <InfoBox
                                            label="Uang Muka"
                                            value={formatCurrency(
                                                transaction.credit_detail
                                                    .down_payment
                                            )}
                                        />
                                        <InfoBox
                                            label="Cicilan/Bulan"
                                            value={formatCurrency(
                                                transaction.credit_detail
                                                    .monthly_installment
                                            )}
                                        />
                                        <InfoBox
                                            label="Tenor"
                                            value={`${transaction.credit_detail.tenor} Bulan`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Uploaded Documents List */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 text-lg">
                                    Dokumen Terunggah
                                </h3>
                            </div>
                            <div className="p-6">
                                {Object.keys(groupedDocuments).length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(groupedDocuments).map(
                                            ([type, docs]) => (
                                                <div
                                                    key={type}
                                                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                                                >
                                                    <h4 className="font-bold text-gray-700 text-sm mb-3 border-b border-gray-200 pb-2">
                                                        {type.replace(
                                                            /_/g,
                                                            " "
                                                        )}
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {docs.map(
                                                            (doc, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100 text-sm"
                                                                >
                                                                    <div className="flex items-center gap-2 truncate flex-1">
                                                                        <FileText
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="text-blue-500"
                                                                        />
                                                                        <span
                                                                            className="truncate text-gray-600"
                                                                            title={
                                                                                doc.original_name
                                                                            }
                                                                        >
                                                                            {
                                                                                doc.original_name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <a
                                                                        href={`/storage/${doc.file_path}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded-md transition-colors"
                                                                        title="Lihat Dokumen"
                                                                    >
                                                                        <Eye
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </a>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center italic">
                                        Belum ada dokumen yang diunggah.
                                    </p>
                                )}

                                <div
                                    className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                                        hasRequiredDocs
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                    }`}
                                >
                                    {hasRequiredDocs ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <AlertTriangle size={20} />
                                    )}
                                    <span className="font-bold text-sm">
                                        {hasRequiredDocs
                                            ? "Semua dokumen wajib telah diunggah!"
                                            : "Beberapa dokumen wajib belum lengkap."}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Upload New Documents Form */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 text-lg">
                                    Unggah Dokumen Baru
                                </h3>
                            </div>
                            <div className="p-6">
                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <FileUploadField
                                            label="KTP"
                                            id="document_ktp"
                                            onChange={(e) =>
                                                handleFileChange(e, "KTP")
                                            }
                                            error={errors["documents.KTP"]}
                                            files={data.documents.KTP}
                                            description="Update foto KTP"
                                        />
                                        <FileUploadField
                                            label="Kartu Keluarga"
                                            id="document_kk"
                                            onChange={(e) =>
                                                handleFileChange(e, "KK")
                                            }
                                            error={errors["documents.KK"]}
                                            files={data.documents.KK}
                                            description="Update Kartu Keluarga"
                                        />
                                        <FileUploadField
                                            label="Slip Gaji"
                                            id="document_slip_gaji"
                                            onChange={(e) =>
                                                handleFileChange(e, "SLIP_GAJI")
                                            }
                                            error={
                                                errors["documents.SLIP_GAJI"]
                                            }
                                            files={data.documents.SLIP_GAJI}
                                            description="Update Slip Gaji"
                                        />
                                        <FileUploadField
                                            label="Dokumen Lainnya"
                                            id="document_lainnya"
                                            onChange={(e) =>
                                                handleFileChange(e, "LAINNYA")
                                            }
                                            error={errors["documents.LAINNYA"]}
                                            files={data.documents.LAINNYA}
                                            description="Dokumen Tambahan"
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
                                            <ArrowLeft size={20} /> Kembali ke
                                            Pesanan
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                                        >
                                            <Upload size={20} /> Unggah Dokumen
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

function InfoBox({ label, value }) {
    return (
        <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">
                {label}
            </div>
            <div className="font-bold text-gray-800 text-lg">{value}</div>
        </div>
    );
}

function FileUploadField({ label, id, onChange, error, files, description }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-gray-700 font-bold mb-2 text-sm"
            >
                {label}
            </label>
            <div className="relative group">
                <input
                    type="file"
                    id={id}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept="image/*,application/pdf"
                    multiple
                    onChange={onChange}
                />
                <div
                    className={`w-full p-3 rounded-xl border-2 border-dashed ${
                        error
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-gray-50 group-hover:border-blue-400 group-hover:bg-blue-50"
                    } transition-all flex items-center gap-3`}
                >
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Upload size={18} className="text-gray-400" />
                    </div>
                    <div className="flex-1 text-left">
                        {files && files.length > 0 ? (
                            <div className="text-sm font-medium text-gray-800">
                                {files.length} file dipilih
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">
                                {description}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
