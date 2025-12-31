import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Eye,
    EyeOff,
    AlertCircle,
    LogIn,
    Mail,
    Lock,
    ShieldCheck,
    Terminal,
    ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <MainLayout title="Terminal Akses">
            <div className="min-h-screen bg-surface-dark flex pt-32 pb-12 relative overflow-hidden">
                {/* Background FX */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/assets/img/grid.svg')] opacity-5"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-5xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
                    >
                        {/* Left Panel: Security Visual */}
                        <div className="relative hidden md:flex flex-col justify-between p-12 bg-black/50 overflow-hidden group">
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-8">
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">
                                        Koneksi Aman
                                    </span>
                                </div>
                                <h2 className="text-5xl font-display font-black text-white leading-tight mb-4">
                                    WELCOME <br /> BACK
                                </h2>
                                <p className="text-white/40 max-w-xs font-sans">
                                    Otentikasi untuk mengakses dashboard anda
                                    dan kelola armada anda.
                                </p>
                            </div>

                            <div className="relative z-10 mt-12">
                                <div className="w-full h-48 bg-black/40 rounded-xl border border-white/10 p-4 font-mono text-xs text-green-500 overflow-hidden opacity-70">
                                    <p>$ initiating session...</p>
                                    <p>$ checking protocols...</p>
                                    <p className="blinking-cursor">
                                        $ siap untuk input_
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Login Form */}
                        <div className="p-10 md:p-14 bg-surface-dark relative">
                            <div className="flex items-center gap-3 mb-8">
                                <Terminal className="text-white/20" size={32} />
                                <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                                    AKSES LOGIN
                                </h3>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                                        Email Identitas
                                    </label>
                                    <div className="relative group">
                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors"
                                        />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-accent focus:bg-white/10 outline-none transition-all font-sans"
                                            placeholder="user@srbmotors.id"
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

                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                                        Kata Sandi
                                    </label>
                                    <div className="relative group">
                                        <Lock
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors"
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
                                            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-accent focus:bg-white/10 outline-none transition-all font-sans"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                            <AlertCircle size={12} />{" "}
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent focus:ring-offset-0 transition-all cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm text-white/60 group-hover:text-white transition-colors">
                                            Ingat Sesi Ini
                                        </span>
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-sm font-bold text-accent hover:text-white transition-colors"
                                    >
                                        Lupa Sandi?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-white text-black font-display font-bold text-xl py-4 rounded-xl hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {processing ? (
                                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            MULAI SESI{" "}
                                            <ArrowRight
                                                size={20}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </>
                                    )}
                                </button>

                                <div className="mt-8 text-center border-t border-white/5 pt-6">
                                    <p className="text-white/40 text-sm">
                                        Baru di sistem ini?{" "}
                                        <Link
                                            href={route("register")}
                                            className="text-white font-bold hover:text-accent transition-colors ml-1"
                                        >
                                            Buat Identitas
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
