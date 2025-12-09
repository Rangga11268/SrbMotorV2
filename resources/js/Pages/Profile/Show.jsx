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
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header Background */}
                            <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
                                <div className="absolute top-0 right-0 p-20 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                            </div>

                            <div className="px-8 pb-8">
                                <div className="relative flex justify-between items-end -mt-12 mb-6">
                                    <div className="bg-white p-2 rounded-full shadow-lg">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                                            <User size={48} />
                                        </div>
                                    </div>

                                    {isCurrentUser && (
                                        <Link
                                            href={route("profile.edit")}
                                            className="px-6 py-2 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 flex items-center gap-2"
                                        >
                                            <Edit2 size={16} /> Edit Profil
                                        </Link>
                                    )}
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                    {user.name}
                                </h1>
                                <p className="text-gray-500 mb-8">
                                    {user.email}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                                Role
                                            </div>
                                            <div className="font-bold text-gray-800 capitalize">
                                                {user.role === "admin" ? (
                                                    <span className="text-blue-600">
                                                        Administrator
                                                    </span>
                                                ) : (
                                                    "Pengguna"
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                                Bergabung Sejak
                                            </div>
                                            <div className="font-bold text-gray-800">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                                Email
                                            </div>
                                            <div className="font-bold text-gray-800">
                                                {user.email}
                                            </div>
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
