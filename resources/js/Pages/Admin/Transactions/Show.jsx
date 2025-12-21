import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    ArrowLeft,
    User,
    Bike,
    FileText,
    Upload,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    MessageCircle,
    Printer,
    Download,
    AlertTriangle,
    Edit,
    Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Show({ transaction }) {
    const { credit_detail, motor, user } = transaction;
    const documents = credit_detail?.documents || [];

    const paidInstallments =
        transaction.installments?.filter((i) => i.status === "paid").length ||
        0;
    const totalInstallments = credit_detail?.tenor || 0;
    const progressPercentage =
        totalInstallments > 0
            ? Math.round((paidInstallments / totalInstallments) * 100)
            : 0;
    const nextInstallment = transaction.installments?.find(
        (i) => i.status !== "paid" && i.installment_number > 0
    );

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
        onConfirm: () => {},
        confirmText: "Confirm",
    });
    const [processingAction, setProcessingAction] = useState(false);

    const getStatusColor = (status) => {
        if (
            [
                "completed",
                "disetujui",
                "ready_for_delivery",
                "payment_confirmed",
            ].includes(status)
        )
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
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
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
        if (
            ["ditolak", "data_tidak_valid", "cancelled", "rejected"].includes(
                status
            )
        )
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    };

    const formatStatus = (status) =>
        status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const formatPaymentMethod = (method) => {
        if (!method) return "-";
        const map = {
            midtrans_bca_va: "BCA Virtual Account",
            midtrans_bri_va: "BRI Virtual Account",
            midtrans_bni_va: "BNI Virtual Account",
            midtrans_mandiri_bill: "Mandiri Bill",
            midtrans_gopay: "GoPay",
            midtrans_shopeepay: "ShopeePay",
            midtrans_indomaret: "Indomaret",
            midtrans_alfamart: "Alfamart",
            transfer: "Transfer Manual",
            cash: "Tunai",
        };
        if (map[method]) return map[method];
        return method.replace("midtrans_", "").replace(/_/g, " ").toUpperCase();
    };

    const getVALink = () => {
        const phone = transaction.customer_phone || user?.phone_number;
        if (!phone) return "#";
        const cleanNumber = phone.replace(/[^0-9]/g, "");
        const waNumber = cleanNumber.startsWith("0")
            ? "62" + cleanNumber.slice(1)
            : cleanNumber;
        return `https://wa.me/${waNumber}`;
    };

    const getStatusOptions = () => {
        if (transaction.transaction_type === "CASH") {
            return [
                { value: "new_order", label: "Pesanan Baru" },
                { value: "waiting_payment", label: "Menunggu Pembayaran" },
                {
                    value: "payment_confirmed",
                    label: "Pembayaran Dikonfirmasi",
                },
                { value: "unit_preparation", label: "Persiapan Unit" },
                { value: "ready_for_delivery", label: "Siap Dikirim" },
                { value: "completed", label: "Selesai" },
                { value: "cancelled", label: "Dibatalkan" },
            ];
        } else {
            return [
                {
                    value: "menunggu_persetujuan",
                    label: "Menunggu Persetujuan",
                },
                { value: "data_tidak_valid", label: "Data Tidak Valid" },
                {
                    value: "dikirim_ke_surveyor",
                    label: "Dikirim ke Surveyor",
                    disabled: !checkDocumentsComplete(),
                },
                { value: "jadwal_survey", label: "Jadwal Survey" },
                { value: "disetujui", label: "Disetujui" },
                { value: "ditolak", label: "Ditolak" },
                { value: "completed", label: "Selesai" },
            ];
        }
    };

    const checkDocumentsComplete = () => {
        return transaction.documents_complete !== false;
    };

    const handleStatusUpdate = (e) => {
        const newStatus = e.target.value;
        setModalConfig({
            isOpen: true,
            title: "Update Status?",
            message: `Apakah anda yakin ingin mengubah status transaksi menjadi "${formatStatus(
                newStatus
            )}"?`,
            type: "info",
            confirmText: "Ya, Update",
            onConfirm: () => processStatusUpdate(newStatus),
        });
    };

    const processStatusUpdate = (newStatus) => {
        setProcessingAction(true);
        router.post(
            route("admin.transactions.updateStatus", transaction.id),
            { status: newStatus },
            {
                onSuccess: () => {
                    setProcessingAction(false);
                    setModalConfig((prev) => ({ ...prev, isOpen: false }));
                    toast.success("Status berhasil diperbarui");
                },
                onError: () => {
                    setProcessingAction(false);
                    toast.error("Gagal memperbarui status");
                },
            }
        );
    };

    const confirmDelete = () => {
        setModalConfig({
            isOpen: true,
            title: "Hapus Transaksi?",
            message:
                "Apakah anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.",
            type: "danger",
            confirmText: "Hapus",
            onConfirm: () => processDelete(),
        });
    };

    const processDelete = () => {
        setProcessingAction(true);
        router.delete(route("admin.transactions.destroy", transaction.id), {
            onSuccess: () => {
                setProcessingAction(false);
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("Transaksi berhasil dihapus");
            },
            onError: () => {
                setProcessingAction(false);
                toast.error("Gagal menghapus transaksi");
            },
        });
    };

    const approvePayment = (installmentId) => {
        if (confirm("Apakah anda yakin ingin menyetujui pembayaran ini?")) {
            router.post(
                route("admin.installments.approve", installmentId),
                {},
                {
                    onSuccess: () => toast.success("Pembayaran disetujui"),
                    onError: () => toast.error("Gagal memproses"),
                }
            );
        }
    };

    const rejectPayment = (installmentId) => {
        if (confirm("Apakah anda yakin ingin menolak pembayaran ini?")) {
            router.post(
                route("admin.installments.reject", installmentId),
                {},
                {
                    onSuccess: () => toast.success("Pembayaran ditolak"),
                    onError: () => toast.error("Gagal memproses"),
                }
            );
        }
    };

    const {
        data: docData,
        setData: setDocData,
        post: postDoc,
        processing: docProcessing,
        errors: docErrors,
        reset: resetDoc,
    } = useForm({
        document_type: "",
        document_file: null,
    });

    const handleUpload = (e) => {
        e.preventDefault();
        postDoc(route("admin.transactions.upload-document", transaction.id), {
            onSuccess: () => {
                resetDoc();
                toast.success("Dokumen berhasil diunggah");
            },
            onError: () => toast.error("Gagal mengunggah dokumen"),
        });
    };

    const confirmDeleteDocument = (docId) => {
        setModalConfig({
            isOpen: true,
            title: "Hapus Dokumen?",
            message:
                "Apakah anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.",
            type: "danger",
            confirmText: "Hapus",
            onConfirm: () => processDeleteDocument(docId),
        });
    };

    const processDeleteDocument = (docId) => {
        setProcessingAction(true);
        router.delete(route("admin.transactions.delete_document", docId), {
            onSuccess: () => {
                setProcessingAction(false);
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("Dokumen berhasil dihapus");
            },
            onError: () => {
                setProcessingAction(false);
                toast.error("Gagal menghapus dokumen");
            },
        });
    };

    return (
        <AdminLayout title={`Detail Transaksi #${transaction.id}`}>
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText={modalConfig.confirmText}
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
                processing={processingAction}
            />

            <div className="max-w-7xl mx-auto">
                <Link
                    href={route("admin.transactions.index")}
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 font-bold transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-sm">Kembali ke Daftar</span>
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Bike className="text-primary" size={20} />{" "}
                                Detail Unit
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-full sm:w-48 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-gray-600 relative group">
                                    {motor?.image_path ? (
                                        <img
                                            src={`/storage/${motor.image_path}`}
                                            alt={motor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                            <Bike />
                                        </div>
                                    )}
                                    <Link
                                        href={route(
                                            "admin.motors.show",
                                            motor.id
                                        )}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                    >
                                        <span className="text-white text-xs font-bold border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                                            Lihat Detail Motor
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex-1 text-center sm:text-left space-y-2">
                                    <div>
                                        <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                            {motor?.name}
                                        </h4>
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 uppercase">
                                                {motor?.brand}
                                            </span>
                                            <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                                                •
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                {motor?.year}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-bold">
                                            Harga Cash
                                        </p>
                                        <p className="text-primary dark:text-blue-400 font-bold text-xl">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor?.price || 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {transaction.transaction_type === "CREDIT" &&
                            transaction.installments &&
                            transaction.installments.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Clock
                                                className="text-primary"
                                                size={20}
                                            />
                                            Riwayat Angsuran
                                        </h3>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold border border-green-100 dark:border-green-800">
                                                Lunas: {paidInstallments}
                                            </span>
                                            <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-600">
                                                Sisa:{" "}
                                                {totalInstallments -
                                                    paidInstallments}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                            <table className="w-full text-sm text-left relative">
                                                <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50/95 dark:bg-gray-700/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
                                                    <tr>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Bulan Ke
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Jatuh Tempo
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Nominal
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Metode
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Bukti
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Status
                                                        </th>
                                                        <th className="px-6 py-4 text-right font-bold tracking-wider">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                                    {transaction.installments.map(
                                                        (inst) => (
                                                            <tr
                                                                key={inst.id}
                                                                className="hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors"
                                                            >
                                                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                                    {inst.installment_number ===
                                                                    0 ? (
                                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                                                                            DP
                                                                        </span>
                                                                    ) : (
                                                                        `#${inst.installment_number}`
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                                    {new Date(
                                                                        inst.due_date
                                                                    ).toLocaleDateString(
                                                                        "id-ID",
                                                                        {
                                                                            day: "numeric",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        }
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 font-bold font-mono text-gray-700 dark:text-gray-200">
                                                                    Rp{" "}
                                                                    {new Intl.NumberFormat(
                                                                        "id-ID"
                                                                    ).format(
                                                                        inst.amount
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {inst.payment_method ? (
                                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                                            {formatPaymentMethod(
                                                                                inst.payment_method
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400 dark:text-gray-500">
                                                                            -
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {inst.payment_proof ? (
                                                                        <a
                                                                            href={`/storage/${inst.payment_proof}`}
                                                                            target="_blank"
                                                                            className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-xs hover:underline transition-all"
                                                                        >
                                                                            <Eye
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />{" "}
                                                                            Lihat
                                                                        </a>
                                                                    ) : (
                                                                        <span className="text-gray-400 dark:text-gray-500">
                                                                            -
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span
                                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                                            inst.status ===
                                                                            "paid"
                                                                                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800"
                                                                                : inst.status ===
                                                                                  "waiting_approval"
                                                                                ? "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800"
                                                                                : inst.status ===
                                                                                  "overdue"
                                                                                ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800"
                                                                                : "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600"
                                                                        }`}
                                                                    >
                                                                        {inst.status ===
                                                                            "paid" && (
                                                                            <CheckCircle
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        )}
                                                                        {inst.status ===
                                                                            "waiting_approval" && (
                                                                            <Clock
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        )}
                                                                        {inst.status ===
                                                                            "overdue" && (
                                                                            <AlertTriangle
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        )}
                                                                        {formatStatus(
                                                                            inst.status
                                                                        )}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    {inst.status ===
                                                                        "waiting_approval" && (
                                                                        <div className="flex justify-end gap-2">
                                                                            <button
                                                                                onClick={() =>
                                                                                    approvePayment(
                                                                                        inst.id
                                                                                    )
                                                                                }
                                                                                className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                                                title="Setujui Pembayaran"
                                                                            >
                                                                                <CheckCircle
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    rejectPayment(
                                                                                        inst.id
                                                                                    )
                                                                                }
                                                                                className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                                                title="Tolak Pembayaran"
                                                                            >
                                                                                <XCircle
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {inst.status ===
                                                                        "paid" && (
                                                                        <span className="text-green-500 dark:text-green-400 flex justify-end">
                                                                            <CheckCircle
                                                                                size={
                                                                                    20
                                                                                }
                                                                                className="opacity-50"
                                                                            />
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Upload
                                        className="text-primary"
                                        size={20}
                                    />
                                    Dokumen Pendukung
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {documents.length > 0
                                        ? `${documents.length} dokumen telah diunggah`
                                        : "Belum ada dokumen yang diunggah"}
                                </p>
                            </div>

                            <div className="p-6">
                                <form
                                    onSubmit={handleUpload}
                                    className="mb-8 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-dashed border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="w-full md:w-1/3">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Jenis Dokumen
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={
                                                        docData.document_type
                                                    }
                                                    onChange={(e) =>
                                                        setDocData(
                                                            "document_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer hover:border-blue-300 dark:text-white"
                                                    required
                                                >
                                                    <option value="">
                                                        Pilih Jenis...
                                                    </option>
                                                    <option value="KTP">
                                                        KTP
                                                    </option>
                                                    <option value="KK">
                                                        Kartu Keluarga
                                                    </option>
                                                    <option value="SLIP_GAJI">
                                                        Slip Gaji
                                                    </option>
                                                    <option value="BPKB">
                                                        BPKB
                                                    </option>
                                                    <option value="STNK">
                                                        STNK
                                                    </option>
                                                    <option value="FAKTUR">
                                                        Faktur
                                                    </option>
                                                    <option value="LAINNYA">
                                                        Lainnya
                                                    </option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                File Dokumen
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    onChange={(e) =>
                                                        setDocData(
                                                            "document_file",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="hidden"
                                                    required
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="flex items-center justify-between w-full px-4 py-2.5 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all text-sm group"
                                                >
                                                    <span
                                                        className={`truncate ${
                                                            docData.document_file
                                                                ? "text-gray-800 dark:text-gray-200 font-medium"
                                                                : "text-gray-400 dark:text-gray-500"
                                                        }`}
                                                    >
                                                        {docData.document_file
                                                            ? docData
                                                                  .document_file
                                                                  .name
                                                            : "Pilih file..."}
                                                    </span>
                                                    <div className="bg-gray-100 dark:bg-gray-600 p-1 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-300 text-gray-500 dark:text-gray-400 transition-colors">
                                                        <Upload size={16} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <button
                                                type="submit"
                                                disabled={docProcessing}
                                                className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
                                            >
                                                {docProcessing ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Proses...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload size={16} />
                                                        <span>Upload</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {documents && documents.length > 0 ? (
                                        documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="group p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 relative"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p
                                                            className="font-bold text-gray-900 dark:text-white text-sm truncate"
                                                            title={
                                                                doc.document_type
                                                            }
                                                        >
                                                            {doc.document_type}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {new Date(
                                                                doc.created_at
                                                            ).toLocaleDateString()}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            <a
                                                                href={`/storage/${doc.file_path}`}
                                                                target="_blank"
                                                                className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                                                            >
                                                                <Eye
                                                                    size={12}
                                                                />{" "}
                                                                Lihat
                                                            </a>
                                                            <a
                                                                href={`/storage/${doc.file_path}`}
                                                                download
                                                                className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-1"
                                                            >
                                                                <Download
                                                                    size={12}
                                                                />{" "}
                                                                Unduh
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            confirmDeleteDocument(
                                                                doc.id
                                                            )
                                                        }
                                                        className="absolute top-2 right-2 p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Hapus Dokumen"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                                            <Upload
                                                size={48}
                                                className="mb-4 opacity-20"
                                            />
                                            <p className="font-medium">
                                                Belum ada dokumen yang diunggah.
                                            </p>
                                            <p className="text-xs mt-1 opacity-70">
                                                Gunakan form di atas untuk
                                                mengunggah dokumen baru.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                                            ID Transaksi
                                        </p>
                                        <h1 className="text-xl font-black text-gray-900 dark:text-white">
                                            #{transaction.id}
                                        </h1>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(
                                                transaction.created_at
                                            ).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                                            transaction.transaction_type ===
                                            "CASH"
                                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800"
                                                : "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800"
                                        }`}
                                    >
                                        {transaction.transaction_type === "CASH"
                                            ? "TUNAI"
                                            : "KREDIT"}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span
                                        className={`block w-full text-center py-2.5 rounded-xl text-sm font-black tracking-wide capitalize ${getStatusColor(
                                            transaction.status
                                        )}`}
                                    >
                                        {formatStatus(transaction.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Update Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium text-sm appearance-none text-gray-900 dark:text-white"
                                            value={transaction.status}
                                            onChange={handleStatusUpdate}
                                        >
                                            {getStatusOptions().map((opt) => (
                                                <option
                                                    key={opt.value}
                                                    value={opt.value}
                                                    disabled={opt.disabled}
                                                    className="dark:bg-gray-800"
                                                >
                                                    {opt.label}{" "}
                                                    {opt.disabled
                                                        ? "(Dokumen Belum Lengkap)"
                                                        : ""}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {transaction.transaction_type ===
                                        "CREDIT" &&
                                        !checkDocumentsComplete() && (
                                            <div className="mt-3 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-100 dark:border-orange-900/30 flex items-start gap-2">
                                                <AlertTriangle
                                                    size={14}
                                                    className="shrink-0 mt-0.5"
                                                />
                                                <span>
                                                    Dokumen belum lengkap.
                                                    Beberapa status dibatasi.
                                                </span>
                                            </div>
                                        )}
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <a
                                        href={getVALink()}
                                        target="_blank"
                                        className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl font-bold text-xs hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors border border-green-100 dark:border-green-800"
                                    >
                                        <MessageCircle size={18} /> WhatsApp
                                    </a>
                                    <a
                                        href={`mailto:${user?.email}`}
                                        className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-100 dark:border-blue-800"
                                    >
                                        <Mail size={18} /> Email
                                    </a>
                                </div>
                                <a
                                    href={route(
                                        "admin.transactions.invoice.download",
                                        transaction.id
                                    )}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <Printer size={16} /> Cetak Invoice
                                </a>
                                <button
                                    onClick={confirmDelete}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/50"
                                >
                                    <Trash2 size={16} /> Hapus Transaksi
                                </button>
                            </div>
                        </div>

                        {transaction.transaction_type === "CREDIT" &&
                            credit_detail && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-blue-50/30 dark:bg-blue-900/10">
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <FileText
                                                className="text-blue-600 dark:text-blue-400"
                                                size={18}
                                            />
                                            Ringkasan Kredit
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route(
                                                    "admin.transactions.edit",
                                                    transaction.id
                                                )}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500 transition-colors shadow-sm"
                                                title="Edit Detail Kredit"
                                            >
                                                <Edit size={14} />
                                            </Link>
                                            <span
                                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                                                    credit_detail.credit_status
                                                )}`}
                                            >
                                                {formatStatus(
                                                    credit_detail.credit_status
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                                                    Progress Pembayaran
                                                </span>
                                                <span className="text-sm font-black text-primary dark:text-blue-400">
                                                    {progressPercentage}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-primary dark:bg-blue-500 h-2 rounded-full"
                                                    style={{
                                                        width: `${progressPercentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {paidInstallments}
                                                </span>{" "}
                                                dari {totalInstallments}{" "}
                                                angsuran lunas
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Uang Muka
                                                </span>
                                                <span className="text-base font-bold text-gray-900 dark:text-white">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        credit_detail.down_payment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Angsuran/Bulan
                                                </span>
                                                <span className="text-base font-bold text-green-600 dark:text-green-400">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        credit_detail.monthly_installment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Tenor
                                                </span>
                                                <span className="text-base font-bold text-gray-900 dark:text-white">
                                                    {credit_detail.tenor} Bulan
                                                </span>
                                            </div>
                                        </div>

                                        {nextInstallment && (
                                            <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 rounded-xl">
                                                <p className="text-xs text-orange-600 dark:text-orange-400 font-bold mb-1 flex items-center gap-1">
                                                    <AlertTriangle size={10} />{" "}
                                                    Tagihan Berikutnya
                                                </p>
                                                <p className="text-sm font-bold text-orange-800 dark:text-orange-300">
                                                    {new Date(
                                                        nextInstallment.due_date
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                                <p className="text-xs text-orange-700 dark:text-orange-400 mt-0.5">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        nextInstallment.amount
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <User
                                    className="text-gray-400 dark:text-gray-500"
                                    size={18}
                                />{" "}
                                Data Pelanggan
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0 font-bold text-lg">
                                        {(
                                            transaction.customer_name ||
                                            user?.name ||
                                            "?"
                                        ).charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 dark:text-white truncate">
                                            {transaction.customer_name ||
                                                user?.name ||
                                                "-"}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user?.email || "-"}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-gray-50 dark:border-gray-700 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Telepon
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {transaction.customer_phone || "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Pekerjaan
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {transaction.customer_occupation ||
                                                "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
