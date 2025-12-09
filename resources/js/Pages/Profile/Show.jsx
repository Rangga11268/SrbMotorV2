import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { User, Mail, Shield, Calendar, Edit2, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Show({ user }) {
    const { auth } = usePage().props;
    const isCurrentUser = auth.user && auth.user.id === user.id;

    return (
        <MainLayout title="Profil Saya">
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                            {/* Header Background */}
                            <div className="h-48 bg-gradient-to-r from-dark-blue to-primary relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 p-24 bg-blue-400/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                            </div>

                            <div className="px-8 md:px-12 pb-12">
                                <div className="relative flex flex-col md:flex-row justify-between items-end -mt-16 mb-8 gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-xl">
                                        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border-4 border-white shadow-inner relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50"></div>
                                            <User
                                                size={64}
                                                className="relative z-10"
                                            />
                                        </div>
                                    </div>

                                    {isCurrentUser && (
                                        <div className="mb-4 md:mb-0 w-full md:w-auto">
                                            <Link
                                                href={route("profile.edit")}
                                                className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                                            >
                                                <Edit2 size={18} /> Edit Profil
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-10">
                                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-500 text-lg flex items-center gap-2">
                                        <Mail size={16} /> {user.email}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100/50 shadow-sm hover:shadow-md transition-all group">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                            <Shield size={24} />
                                        </div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                                            Role Akun
                                        </div>
                                        <div className="font-bold text-gray-900 text-lg capitalize">
                                            {user.role === "admin" ? (
                                                <span className="text-primary">
                                                    Administrator
                                                </span>
                                            ) : (
                                                "Pengguna"
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100/50 shadow-sm hover:shadow-md transition-all group">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                            <Calendar size={24} />
                                        </div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                                            Bergabung Sejak
                                        </div>
                                        <div className="font-bold text-gray-900 text-lg">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100/50 shadow-sm hover:shadow-md transition-all group">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                            <Mail size={24} />
                                        </div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                                            Status Email
                                        </div>
                                        <div className="font-bold text-gray-900 text-lg">
                                            {user.email_verified_at ? (
                                                <span className="text-green-600 flex items-center gap-1">
                                                    Terverifikasi
                                                </span>
                                            ) : (
                                                <span className="text-yellow-600">
                                                    Belum Verifikasi
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
