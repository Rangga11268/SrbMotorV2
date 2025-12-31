import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Edit2,
    LogOut,
    CheckCircle,
    AlertTriangle,
    Fingerprint,
    Hash,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Show({ user }) {
    const { auth } = usePage().props;
    const isCurrentUser = auth.user && auth.user.id === user.id;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <MainLayout title="Identitas Digital">
            <div className="bg-surface-dark min-h-screen pt-32 pb-20 overflow-hidden relative">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="flex items-center justify-between mb-8 opacity-50">
                            <div className="flex items-center gap-2">
                                <Shield size={14} className="text-white" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">
                                    KONEKSI AMAN
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">
                                    LIVE
                                </span>
                            </div>
                        </div>

                        {/* ID Card */}
                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
                            {/* Holographic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                            {/* Card Content */}
                            <div className="p-8 md:p-12 relative z-10">
                                <div className="flex flex-col md:flex-row items-center gap-8 mb-10 text-center md:text-left">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl group-hover:bg-accent/50 transition-all duration-500"></div>
                                        <div className="w-32 h-32 rounded-full bg-black border-2 border-white/20 p-1 relative overflow-hidden group-hover:border-accent transition-colors">
                                            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                                                <div className="absolute inset-0 bg-[url('/assets/img/grid.svg')] opacity-30"></div>
                                                <span className="text-5xl font-display font-bold text-white/20 group-hover:text-white transition-colors">
                                                    {user.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black border border-accent text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            Pengguna
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-display font-black text-white mb-2">
                                            {user.name}
                                        </h1>
                                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-mono text-white/60">
                                            <span className="flex items-center gap-2">
                                                <Mail size={14} /> {user.email}
                                            </span>
                                            <span className="hidden md:inline text-white/20">
                                                |
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Hash size={14} /> ID:{" "}
                                                {String(user.id).padStart(
                                                    6,
                                                    "0"
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-accent/30 transition-colors">
                                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
                                                Level Akses
                                            </div>
                                            <div className="text-white font-bold font-mono">
                                                {user.role === "admin"
                                                    ? "ADMINISTRATOR"
                                                    : "OPERATOR STANDAR"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-accent/30 transition-colors">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
                                                Bergabung Sejak
                                            </div>
                                            <div className="text-white font-bold font-mono">
                                                {formatDate(user.created_at)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-accent/30 transition-colors md:col-span-2">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                user.email_verified_at
                                                    ? "bg-accent/10 text-accent"
                                                    : "bg-yellow-500/10 text-yellow-500"
                                            }`}
                                        >
                                            {user.email_verified_at ? (
                                                <CheckCircle size={20} />
                                            ) : (
                                                <AlertTriangle size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
                                                Status Verifikasi
                                            </div>
                                            <div className="text-white font-bold font-mono flex items-center gap-2">
                                                {user.email_verified_at
                                                    ? "IDENTITAS TERVERIFIKASI"
                                                    : "IDENTITAS BELUM TERVERIFIKASI"}
                                                {user.email_verified_at && (
                                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isCurrentUser && (
                                    <div className="pt-8 border-t border-white/10 flex justify-end">
                                        <Link
                                            href={route("profile.edit")}
                                            className="w-full md:w-auto px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm tracking-wide group"
                                        >
                                            <Edit2 size={16} />
                                            KONFIGURASI PROTOKOL
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logout Hint */}
                        <div className="mt-8 text-center opacity-50 hover:opacity-100 transition-opacity">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-xs font-mono text-red-400 flex items-center justify-center gap-2 hover:text-red-300 transition-colors"
                            >
                                <LogOut size={12} /> AKHIRI SESI
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
