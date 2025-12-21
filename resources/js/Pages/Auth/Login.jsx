import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Eye, EyeOff, AlertCircle, LogIn, Mail, Lock } from "lucide-react";
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
        <MainLayout title="Login">
            <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-white via-indigo-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-blue-100/40 to-transparent blur-3xl z-0 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-indigo-100/40 to-transparent blur-3xl z-0 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden relative z-10 border border-white/50"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-br from-dark-blue to-blue-900 p-10 pt-16 text-center relative text-white overflow-hidden">
                        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 p-20 bg-primary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg z-20 border border-white/20">
                            <div className="bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center shadow-inner">
                                <img
                                    src="/assets/icon/logo trans.png"
                                    alt="Logo"
                                    className="w-14 h-14 object-contain"
                                />
                            </div>
                        </div>

                        <h2 className="text-3xl font-extrabold mb-2 relative z-10 text-white tracking-tight">
                            Selamat Datang
                        </h2>
                        <p className="text-blue-100 text-sm relative z-10 opacity-90 font-medium">
                            Masuk untuk mengelola akun Anda
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-8 md:p-10">
                        <form onSubmit={submit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2 pl-1">
                                    Alamat Email
                                </label>
                                <div className="relative group">
                                    <Mail
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                                    />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <div className="mt-2 text-red-500 text-xs font-semibold flex items-center gap-1 bg-red-50 p-2 rounded-lg border border-red-100">
                                        <AlertCircle size={12} /> {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2 pl-1">
                                    Kata Sandi
                                </label>
                                <div className="relative group">
                                    <Lock
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                                    />
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="········"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="mt-2 text-red-500 text-xs font-semibold flex items-center gap-1 bg-red-50 p-2 rounded-lg border border-red-100">
                                        <AlertCircle size={12} />{" "}
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-8">
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
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary transition duration-150 ease-in-out cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                        Ingat Saya
                                    </span>
                                </label>
                                <Link
                                    href="#"
                                    className="text-sm font-bold text-primary hover:text-dark-blue hover:underline transition-colors"
                                >
                                    Lupa Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-dark-blue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <LogIn size={20} /> Masuk Sekarang
                                    </>
                                )}
                            </button>

                            <div className="mt-8 text-center">
                                <p className="text-gray-500 text-sm">
                                    Belum memiliki akun?{" "}
                                    <Link
                                        href={route("register")}
                                        className="text-primary font-bold hover:text-dark-blue hover:underline transition-colors"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
