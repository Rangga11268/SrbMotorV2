import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Save, User, Lock, Key, Shield, ShieldCheck } from "lucide-react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPassword,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitProfile = (e) => {
        e.preventDefault();
        put(route("admin.profile.update"));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        putPassword(route("admin.profile.password.update"), {
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AdminLayout title="KONFIGURASI PROFIL">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Control Panel */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-white/50 font-mono uppercase tracking-widest text-xs mb-2">
                            MODUL KEAMANAN & PERSONALISASI
                        </h2>
                        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wide flex items-center gap-3">
                            <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                            PROFIL ADMIN
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] -z-10 group-hover:bg-blue-500/20 transition-colors"></div>

                        <div className="p-6 border-b border-white/5 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-2xl">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white font-display tracking-wide flex items-center gap-2">
                                    INFORMASI DASAR
                                    <ShieldCheck
                                        size={16}
                                        className="text-blue-500"
                                    />
                                </h2>
                                <p className="text-white/40 text-xs font-mono">
                                    DATA IDENTITAS SISTEM
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={submitProfile}
                            className="p-6 space-y-6"
                        >
                            <div>
                                <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                                    NAMA LENGKAP
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-white/30 group-focus-within/input:text-blue-500 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-white placeholder-white/20 transition-all"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                                    ALAMAT EMAIL
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-white/30 group-focus-within/input:text-blue-500 transition-colors">
                                        <span className="text-lg font-mono">
                                            @
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-white placeholder-white/20 transition-all"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold font-display uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={18} />
                                    {processing
                                        ? "MENYIMPAN..."
                                        : "SIMPAN PERUBAHAN"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px] -z-10 group-hover:bg-red-500/20 transition-colors"></div>

                        <div className="p-6 border-b border-white/5 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-2xl">
                                <Lock size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white font-display tracking-wide flex items-center gap-2">
                                    KEAMANAN AKUN
                                    <Shield
                                        size={16}
                                        className="text-red-500"
                                    />
                                </h2>
                                <p className="text-white/40 text-xs font-mono">
                                    ENKRIPSI DATA KATA SANDI
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={submitPassword}
                            className="p-6 space-y-6"
                        >
                            <div>
                                <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                                    PASSWORD SAAT INI
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-white/30 group-focus-within/input:text-red-500 transition-colors">
                                        <Key size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={passwordData.current_password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                "current_password",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm font-mono text-white placeholder-white/20 transition-all"
                                    />
                                </div>
                                {passwordErrors.current_password && (
                                    <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {passwordErrors.current_password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                                    PASSWORD BARU
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-white/30 group-focus-within/input:text-red-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm font-mono text-white placeholder-white/20 transition-all"
                                    />
                                </div>
                                {passwordErrors.password && (
                                    <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {passwordErrors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                                    KONFIRMASI PASSWORD BARU
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-white/30 group-focus-within/input:text-red-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={
                                            passwordData.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm font-mono text-white placeholder-white/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordProcessing}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-500 hover:text-white text-white rounded-xl font-bold font-display uppercase tracking-wide transition-all border border-white/10 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={18} />
                                    {passwordProcessing
                                        ? "MEMPROSES..."
                                        : "UPDATE SECURITY"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
