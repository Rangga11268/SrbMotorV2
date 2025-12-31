import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Eye,
    EyeOff,
    AlertCircle,
    UserPlus,
    User,
    Mail,
    Lock,
    ShieldCheck,
    Cpu,
    ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <MainLayout title="Buat Identitas">
            <div className="min-h-screen bg-surface-dark flex pt-32 pb-12 relative overflow-hidden">
                {/* Background FX */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/assets/img/grid.svg')] opacity-5"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-5xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
                    >
                        {/* Left Panel: Register Visual */}
                        <div className="relative hidden md:flex flex-col justify-between p-12 bg-black/50 overflow-hidden group order-2 md:order-1">
                            {/* Animated Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8">
                                    <ShieldCheck
                                        size={12}
                                        className="text-blue-400"
                                    />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
                                        Protokol User Baru
                                    </span>
                                </div>
                                <h2 className="text-5xl font-display font-black text-white leading-tight mb-4">
                                    GABUNG <br />{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                        JARINGAN
                                    </span>
                                </h2>
                                <p className="text-white/40 max-w-xs font-sans">
                                    Buat identitas aman anda untuk mengakses
                                    penawaran eksklusif dan kelola transaksi.
                                </p>
                            </div>

                            <div className="relative z-10 mt-12 flex justify-center">
                                <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center relative">
                                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                    <div className="absolute inset-4 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                                    <Cpu size={64} className="text-white/20" />
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Register Form */}
                        <div className="p-10 md:p-14 bg-surface-dark relative order-1 md:order-2 border-l border-white/5">
                            <div className="flex items-center gap-3 mb-8">
                                <UserPlus className="text-white/20" size={32} />
                                <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                                    DAFTAR IDENTITAS
                                </h3>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative group">
                                        <User
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors"
                                        />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-blue-400 focus:bg-white/10 outline-none transition-all font-sans"
                                            placeholder="John Doe"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                            <AlertCircle size={12} />{" "}
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                                        Alamat Email
                                    </label>
                                    <div className="relative group">
                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors"
                                        />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-blue-400 focus:bg-white/10 outline-none transition-all font-sans"
                                            placeholder="user@example.com"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <div className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                            <AlertCircle size={12} />{" "}
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                                            Kata Sandi
                                        </label>
                                        <div className="relative group">
                                            <Lock
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors"
                                            />
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-12 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-blue-400 focus:bg-white/10 outline-none transition-all font-sans"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                                            Konfirmasi
                                        </label>
                                        <div className="relative group">
                                            <Lock
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors"
                                            />
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-12 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-blue-400 focus:bg-white/10 outline-none transition-all font-sans"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {(errors.password ||
                                    errors.password_confirmation) && (
                                    <div className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle size={12} />{" "}
                                        {errors.password ||
                                            errors.password_confirmation}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xl py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-blue-900/20"
                                >
                                    {processing ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            BUAT AKUN{" "}
                                            <ArrowRight
                                                size={20}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </>
                                    )}
                                </button>

                                <div className="mt-8 text-center border-t border-white/5 pt-6">
                                    <p className="text-white/40 text-sm">
                                        Sudah terdaftar?{" "}
                                        <Link
                                            href={route("login")}
                                            className="text-blue-400 font-bold hover:text-white transition-colors ml-1"
                                        >
                                            Akses Terminal
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
