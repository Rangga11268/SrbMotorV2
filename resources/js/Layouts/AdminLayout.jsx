import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Bike,
    ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    const sidebarLinks = [
        {
            name: "Dashboard",
            href: route("admin.dashboard"),
            icon: LayoutDashboard,
            active: route().current("admin.dashboard"),
        },
        {
            name: "Manajemen Motor",
            href: route("admin.motors.index"),
            icon: Bike,
            active: route().current("admin.motors.*"),
        },
        {
            name: "Transaksi",
            href: route("admin.transactions.index"),
            icon: ShoppingCart,
            active: route().current("admin.transactions.*"),
        },
        {
            name: "Manajemen User",
            href: route("admin.users.index"),
            icon: Users,
            active: route().current("admin.users.*"),
        },
        {
            name: "Laporan",
            href: route("admin.reports.index"),
            icon: FileText,
            active: route().current("admin.reports.*"),
        },
        {
            name: "Pesan Kontak",
            href: route("admin.contact.index"),
            icon: MessageSquare,
            active: route().current("admin.contact.*"),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 group"
                        >
                            <img
                                src="/assets/icon/logo trans.png"
                                alt="SRB Motors"
                                className="h-10 w-10 object-contain mr-2 drop-shadow-sm"
                            />
                            <div className="flex flex-col">
                                <span className="font-extrabold text-xl text-dark-blue leading-none tracking-tight">
                                    SRB
                                    <span className="text-primary italic">
                                        Admin
                                    </span>
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                            Menu Utama
                        </p>
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                    link.active
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-1"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-primary hover:pl-5"
                                }`}
                            >
                                <link.icon size={20} />
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        <div className="mt-8">
                            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Pengaturan
                            </p>
                            <Link
                                href={route("admin.profile.show")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-primary hover:pl-5 ${
                                    route().current("admin.profile.*")
                                        ? "bg-gray-50 text-primary font-bold"
                                        : ""
                                }`}
                            >
                                <Settings size={20} />
                                <span>Profil Admin</span>
                            </Link>
                            {/* Back to Website */}
                            <a
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-primary hover:pl-5"
                            >
                                <LogOut size={20} className="rotate-180" />
                                <span>Kembali ke Website</span>
                            </a>
                        </div>
                    </nav>

                    {/* User Profile Footer */}
                    <div className="p-4 border-t border-gray-50">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-dark-blue flex items-center justify-center text-white font-bold shadow-sm">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    Administrator
                                </p>
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <span className="text-sm text-right hidden md:block">
                                <span className="block font-bold text-gray-900">
                                    {auth.user.name}
                                </span>
                                <span className="block text-xs text-gray-500">
                                    {auth.user.email}
                                </span>
                            </span>
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border-2 border-white shadow-sm ring-1 ring-gray-100">
                                {auth.user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
}
