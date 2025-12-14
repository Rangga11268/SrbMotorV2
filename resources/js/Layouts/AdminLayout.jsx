import React, { useState, useEffect } from "react";
import { Link, usePage, Head } from "@inertiajs/react";
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
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "../Contexts/ThemeContext";
import ThemeToggle from "../Components/ThemeToggle";

function AdminLayoutContent({ children, title }) {
    const { auth, flash } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 3000); // Auto hide after 3s
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Head title={title} />
            {/* Flash Message Alert */}
            <AnimatePresence>
                {showFlash && (flash.success || flash.error) && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 30, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className={`fixed top-0 left-1/2 z-50 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px] justify-center backdrop-blur-md ${
                            flash.success
                                ? "bg-green-500/90 text-white border border-green-400"
                                : "bg-red-500/90 text-white border border-red-400"
                        }`}
                    >
                        {flash.success ? (
                            <CheckCircle size={20} className="text-white" />
                        ) : (
                            <AlertCircle size={20} className="text-white" />
                        )}
                        <span className="font-bold text-sm">
                            {flash.success || flash.error}
                        </span>
                        <button
                            onClick={() => setShowFlash(false)}
                            className="ml-auto hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

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
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } print:hidden`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
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
                                <span className="font-extrabold text-xl text-dark-blue dark:text-blue-400 leading-none tracking-tight">
                                    SRB
                                    <span className="text-primary italic ml-1">
                                        Admin
                                    </span>
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary hover:pl-5"
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary hover:pl-5 ${
                                    route().current("admin.profile.*")
                                        ? "bg-gray-50 dark:bg-gray-700 text-primary font-bold"
                                        : ""
                                }`}
                            >
                                <Settings size={20} />
                                <span>Profil Admin</span>
                            </Link>
                            {/* Back to Website */}
                            <a
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary hover:pl-5"
                            >
                                <LogOut size={20} className="rotate-180" />
                                <span>Kembali ke Website</span>
                            </a>
                        </div>
                    </nav>

                    {/* User Profile Footer */}
                    <div className="p-4 border-t border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-dark-blue flex items-center justify-center text-white font-bold shadow-sm">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    Administrator
                                </p>
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
                <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 h-16 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 print:hidden transition-colors duration-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white hidden sm:block">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-gray-700">
                            <span className="text-sm text-right hidden md:block">
                                <span className="block font-bold text-gray-900 dark:text-white">
                                    {auth.user.name}
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    {auth.user.email}
                                </span>
                            </span>
                            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center font-bold border-2 border-white dark:border-gray-700 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
                                {auth.user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto px-4 pb-4 lg:px-8 lg:pb-8 pt-8 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout(props) {
    return (
        <ThemeProvider>
            <AdminLayoutContent {...props} />
        </ThemeProvider>
    );
}
