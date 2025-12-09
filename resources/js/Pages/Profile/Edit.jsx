import React, { useState } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    User,
    Mail,
    Lock,
    Save,
    ArrowLeft,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Edit({ user }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <MainLayout title="Edit Profil">
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="mb-6">
                            <Link
                                href={route("profile.show")}
                                className="text-gray-500 hover:text-primary font-bold flex items-center gap-2 transition-colors hover:-translate-x-1 transform duration-300"
                            >
                                <ArrowLeft size={20} /> Kembali ke Profil
                            </Link>
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-dark-blue to-blue-900 p-8 pb-0 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 p-24 bg-blue-400/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

                                <h1 className="text-3xl font-extrabold text-white mb-2 relative z-10">
                                    Edit Profil
                                </h1>
                                <p className="text-blue-100 mb-8 relative z-10 font-medium">
                                    Kelola informasi profil dan keamanan akun
                                    Anda
                                </p>

                                <div className="flex gap-8 relative z-10">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`pb-4 px-4 font-bold text-sm transition-all relative ${
                                            activeTab === "profile"
                                                ? "text-white"
                                                : "text-blue-200 hover:text-white"
                                        }`}
                                    >
                                        Informasi Profil
                                        {activeTab === "profile" && (
                                            <motion.div
                                                layoutId="tab-underline"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full shadow-lg"
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("password")}
                                        className={`pb-4 px-4 font-bold text-sm transition-all relative ${
                                            activeTab === "password"
                                                ? "text-white"
                                                : "text-blue-200 hover:text-white"
                                        }`}
                                    >
                                        Ubah Password
                                        {activeTab === "password" && (
                                            <motion.div
                                                layoutId="tab-underline"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full shadow-lg"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 md:p-10">
                                {flash.success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-50 text-green-700 p-4 rounded-xl mb-8 flex items-center gap-3 border border-green-100 shadow-sm"
                                    >
                                        <CheckCircle
                                            size={20}
                                            className="shrink-0"
                                        />
                                        <span className="font-medium">
                                            {flash.success}
                                        </span>
                                    </motion.div>
                                )}

                                {flash.error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3 border border-red-100 shadow-sm"
                                    >
                                        <AlertCircle
                                            size={20}
                                            className="shrink-0"
                                        />
                                        <span className="font-medium">
                                            {flash.error}
                                        </span>
                                    </motion.div>
                                )}

                                <div className="max-w-xl">
                                    {activeTab === "profile" ? (
                                        <UpdateProfileForm user={user} />
                                    ) : (
                                        <UpdatePasswordForm />
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

function UpdateProfileForm({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("profile.update"));
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2 text-sm pl-1">
                    Nama Lengkap
                </label>
                <div className="relative group">
                    <User
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                        size={20}
                    />
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
                        placeholder="Masukkan Nama Lengkap"
                    />
                </div>
                {errors.name && (
                    <div className="mt-2 text-red-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                    </div>
                )}
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-sm pl-1">
                    Alamat Email
                </label>
                <div className="relative group">
                    <Mail
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                        size={20}
                    />
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
                        placeholder="Masukkan Email"
                    />
                </div>
                {errors.email && (
                    <div className="mt-2 text-red-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-dark-blue transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
            >
                {processing ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Save size={20} /> Simpan Perubahan
                    </>
                )}
            </button>
        </form>
    );
}

function UpdatePasswordForm() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("profile.password.update"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2 text-sm pl-1">
                    Password Saat Ini
                </label>
                <div className="relative group">
                    <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                        size={20}
                    />
                    <input
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
                        placeholder="Masukkan password saat ini"
                    />
                </div>
                {errors.current_password && (
                    <div className="mt-2 text-red-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.current_password}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2 text-sm pl-1">
                    Password Baru
                </label>
                <div className="relative group">
                    <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                        size={20}
                    />
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
                        placeholder="Masukkan password baru"
                    />
                </div>
                {errors.password && (
                    <div className="mt-2 text-red-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.password}
                    </div>
                )}
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-sm pl-1">
                    Konfirmasi Password Baru
                </label>
                <div className="relative group">
                    <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                        size={20}
                    />
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
                        placeholder="Ketik ulang password baru"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-dark-blue transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
            >
                {processing ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Save size={20} /> Simpan Password
                    </>
                )}
            </button>
        </form>
    );
}
