import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    ShoppingBag,
    Calendar,
    User,
    Phone,
    Info,
    FileText,
    CheckCircle,
    AlertCircle,
    XCircle,
    Clock,
    Hash,
    ArrowRight,
    Activity,
    CreditCard,
    DollarSign,
    Package,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserTransactions({ transactions }) {
    // Status Helper
    const getStatusInfo = (status) => {
        switch (status) {
            case "completed":
            case "disetujui":
            case "ready_for_delivery":
                return {
                    label: "FULFILLED",
                    color: "text-green-400 border-green-500/30 bg-green-500/10",
                    icon: CheckCircle,
                };
            case "menunggu_persetujuan":
            case "new_order":
            case "waiting_payment":
                return {
                    label: "PROCESSING",
                    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
                    icon: Activity,
                };
            case "ditolak":
            case "data_tidak_valid":
                return {
                    label: "DECLINED",
                    color: "text-red-400 border-red-500/30 bg-red-500/10",
                    icon: XCircle,
                };
            default:
                return {
                    label: status.toUpperCase(),
                    color: "text-white/50 border-white/20 bg-white/5",
                    icon: Info,
                };
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <MainLayout title="Transaction Log">
            <div className="bg-surface-dark min-h-screen pt-32 pb-20 overflow-hidden relative">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-10 pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4 backdrop-blur-md">
                                <Hash size={12} className="text-accent" />
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">
                                    System Log
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
                                TRANSACTION{" "}
                                <span className="text-accent text-glow">
                                    STREAM
                                </span>
                            </h1>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-white/30 font-mono text-sm">
                                TOTAL ENTRIES:{" "}
                                <span className="text-accent">
                                    {transactions.data.length}
                                </span>
                            </p>
                        </div>
                    </motion.div>

                    {transactions.data.length > 0 ? (
                        <div className="space-y-6">
                            {transactions.data.map((transaction, index) => {
                                const statusInfo = getStatusInfo(
                                    transaction.status
                                );
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <motion.div
                                        key={transaction.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-accent/30 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-black/40"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                        <div className="flex flex-col lg:flex-row">
                                            {/* Image Section */}
                                            <div className="lg:w-64 h-48 lg:h-auto relative bg-black/50 border-r border-white/5 flex items-center justify-center p-4 overflow-hidden">
                                                <div className="absolute inset-0 bg-[url('/assets/img/grid.svg')] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                                <img
                                                    src={`/storage/${transaction.motor.image_path}`}
                                                    alt={transaction.motor.name}
                                                    className="relative z-10 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-xs font-mono text-white/30 tracking-widest uppercase">
                                                                TXID: #
                                                                {String(
                                                                    transaction.id
                                                                ).padStart(
                                                                    6,
                                                                    "0"
                                                                )}
                                                            </span>
                                                            <span
                                                                className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 uppercase tracking-wider ${statusInfo.color}`}
                                                            >
                                                                <StatusIcon
                                                                    size={10}
                                                                />{" "}
                                                                {
                                                                    statusInfo.label
                                                                }
                                                            </span>
                                                        </div>
                                                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
                                                            {
                                                                transaction
                                                                    .motor.name
                                                            }
                                                        </h3>
                                                        <div className="flex items-center gap-4 mt-2 text-xs font-mono text-white/50">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar
                                                                    size={12}
                                                                />{" "}
                                                                {
                                                                    transaction
                                                                        .motor
                                                                        .year
                                                                }
                                                            </span>
                                                            <span>•</span>
                                                            <span className="flex items-center gap-1 uppercase">
                                                                {transaction.transaction_type ===
                                                                "CASH" ? (
                                                                    <DollarSign
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="text-green-400"
                                                                    />
                                                                ) : (
                                                                    <CreditCard
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="text-purple-400"
                                                                    />
                                                                )}
                                                                {
                                                                    transaction.transaction_type
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                                                            Total Value
                                                        </p>
                                                        <p className="text-2xl font-mono font-bold text-white">
                                                            {formatCurrency(
                                                                transaction.total_amount
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-white/5 relative z-10">
                                                    {transaction.transaction_type ===
                                                        "CREDIT" && (
                                                        <Link
                                                            href={route(
                                                                "motors.manage-documents",
                                                                transaction.id
                                                            )}
                                                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:text-white hover:bg-blue-500 text-xs font-bold tracking-wider hover:border-blue-500 transition-all flex items-center justify-center gap-2 group/btn"
                                                        >
                                                            <FileText
                                                                size={14}
                                                                className="group-hover/btn:scale-110 transition-transform"
                                                            />
                                                            MANAGE DOCS
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={route(
                                                            "motors.order.confirmation",
                                                            transaction.id
                                                        )}
                                                        className="w-full sm:w-auto flex-1 px-6 py-3 rounded-xl bg-white text-black hover:bg-accent font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 group/btn"
                                                    >
                                                        VIEW DETAILS
                                                        <ArrowRight
                                                            size={14}
                                                            className="group-hover/btn:translate-x-1 transition-transform"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 animate-pulse">
                                <Package size={32} className="text-white/20" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-display">
                                NO ENTRIES FOUND
                            </h3>
                            <p className="text-white/30 font-mono text-sm mb-8">
                                Transaction log is currently empty.
                            </p>
                            <Link
                                href={route("motors.index")}
                                className="bg-accent text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(190,242,100,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                INITIATE ORDER
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {transactions.links && transactions.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {transactions.links.map((link, k) => (
                                <Link
                                    key={k}
                                    href={link.url || "#"}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono text-xs font-bold transition-all ${
                                        link.active
                                            ? "bg-accent text-black shadow-[0_0_15px_rgba(190,242,100,0.4)]"
                                            : link.url
                                            ? "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                            : "opacity-30 cursor-not-allowed text-white/20"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
