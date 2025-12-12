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
    Image as ImageIcon,
    Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        const newFiles = Array.from(e.target.files);
        // Append new files to existing ones
        setData("documents", {
            ...data.documents,
            [type]: [...data.documents[type], ...newFiles],
        });
        e.target.value = "";
    };

    const handleRemoveFile = (type, index) => {
        const newFiles = [...data.documents[type]];
        newFiles.splice(index, 1);
        setData("documents", {
            ...data.documents,
            [type]: newFiles,
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
            <div className="bg-gray-50 min-h-screen pt-32 pb-10">
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
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "KTP")
                                            }
                                            onRemove={(idx) =>
                                                handleRemoveFile("KTP", idx)
                                            }
                                            error={errors["documents.KTP"]}
                                            files={data.documents.KTP}
                                            description="Update foto KTP"
                                        />
                                        <FileUploadField
                                            label="Kartu Keluarga"
                                            id="document_kk"
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "KK")
                                            }
                                            onRemove={(idx) =>
                                                handleRemoveFile("KK", idx)
                                            }
                                            error={errors["documents.KK"]}
                                            files={data.documents.KK}
                                            description="Update Kartu Keluarga"
                                        />
                                        <FileUploadField
                                            label="Slip Gaji"
                                            id="document_slip_gaji"
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "SLIP_GAJI")
                                            }
                                            onRemove={(idx) =>
                                                handleRemoveFile(
                                                    "SLIP_GAJI",
                                                    idx
                                                )
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
                                            accept="image/*,application/pdf"
                                            onChange={(e) =>
                                                handleFileChange(e, "LAINNYA")
                                            }
                                            onRemove={(idx) =>
                                                handleRemoveFile("LAINNYA", idx)
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

function FileUploadField({
    label,
    id,
    accept,
    onChange,
    onRemove,
    error,
    files,
    required,
    description,
}) {
    const isImage = (file) => file.type.startsWith("image/");

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3">
                <label
                    htmlFor={id}
                    className="block text-gray-800 font-bold text-sm flex items-center gap-2"
                >
                    {label}
                    {required && (
                        <span className="text-xs font-normal text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            Wajib
                        </span>
                    )}
                </label>
            </div>

            <div className="space-y-4">
                {/* Dropzone Area */}
                <div className="relative group">
                    <input
                        type="file"
                        id={id}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        accept={accept}
                        multiple
                        onChange={onChange}
                        required={files.length === 0 && required}
                    />
                    <div
                        className={`w-full p-6 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden ${
                            error
                                ? "border-red-300 bg-red-50/50"
                                : "border-gray-200 bg-gray-50/50 group-hover:border-primary group-hover:bg-blue-50/50"
                        }`}
                    >
                        {/* Interactive Background Effect */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                        <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto ${
                                    error
                                        ? "bg-red-100 text-red-500"
                                        : "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
                                }`}
                            >
                                <Upload size={24} />
                            </div>
                            <span className="block text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
                                Klik atau Drag & Drop
                            </span>
                            <span className="block text-xs text-gray-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                                {description}
                            </span>
                        </div>
                    </div>
                </div>

                {/* File List Preview */}
                <AnimatePresence mode="popLayout">
                    {files && files.length > 0 && (
                        <motion.div layout className="grid grid-cols-1 gap-3">
                            {Array.from(files).map((file, idx) => (
                                <motion.div
                                    layout
                                    key={`${file.name}-${idx}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="relative flex items-center p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all group overflow-hidden"
                                >
                                    {/* Preview Thumbnail/Icon */}
                                    <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden relative">
                                        {isImage(file) ? (
                                            <>
                                                <img
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                    alt="preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <ImageIcon
                                                        size={16}
                                                        className="text-white"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-blue-500">
                                                <FileText size={20} />
                                                <span className="text-[10px] uppercase font-bold mt-1">
                                                    {file.name.split(".").pop()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* File Info */}
                                    <div className="flex-1 min-w-0 ml-4 mr-12">
                                        <p
                                            className="text-sm font-bold text-gray-800 truncate"
                                            title={file.name}
                                        >
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                            <span>
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span className="uppercase text-gray-500 font-medium">
                                                {file.type.split("/")[1] ||
                                                    "FILE"}
                                            </span>
                                        </p>
                                        {/* Status Bar (Visual Only) */}
                                        <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "easeOut",
                                                }}
                                                className="h-full bg-green-500 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() => onRemove(idx)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Hapus file"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    {/* Success Checkmark (Visual) */}
                                    <div className="absolute right-3 top-3 text-green-500 opacity-100 group-hover:opacity-0 transition-opacity">
                                        <CheckCircle size={16} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 mt-3 text-red-500 text-sm bg-red-50 p-2 rounded-lg border border-red-100"
                >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                </motion.div>
            )}
        </div>
    );
}
