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

// Command Center Layout
function AdminLayoutContent({ children, title }) {
    const { auth, flash } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const sidebarLinks = [
        {
            name: "Command Center",
            href: route("admin.dashboard"),
            icon: LayoutDashboard,
            active: route().current("admin.dashboard"),
        },
        {
            name: "Armada",
            href: route("admin.motors.index"),
            icon: Bike,
            active: route().current("admin.motors.*"),
        },
        {
            name: "Keuangan",
            href: route("admin.transactions.index"),
            icon: ShoppingCart,
            active: route().current("admin.transactions.*"),
        },
        {
            name: "Personel",
            href: route("admin.users.index"),
            icon: Users,
            active: route().current("admin.users.*"),
        },
        {
            name: "Intelijen",
            href: route("admin.reports.index"),
            icon: FileText,
            active: route().current("admin.reports.*"),
        },
        {
            name: "Komunikasi",
            href: route("admin.contact.index"),
            icon: MessageSquare,
            active: route().current("admin.contact.*"),
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white flex transition-colors duration-200">
            <Head title={title} />

            {/* Background FX */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[url('/assets/img/noise.png')] opacity-[0.03]"></div>
            </div>

            {/* Flash Message Alert */}
            <AnimatePresence>
                {showFlash && (flash.success || flash.error) && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 30, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className={`fixed top-0 left-1/2 z-[100] px-6 py-4 rounded-xl border flex items-center gap-3 min-w-[320px] justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
                            flash.success
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-red-500/10 border-red-500/20 text-red-500"
                        }`}
                    >
                        {flash.success ? (
                            <CheckCircle size={20} className="text-green-400" />
                        ) : (
                            <AlertCircle size={20} className="text-red-500" />
                        )}
                        <span className="font-bold font-mono tracking-wide text-sm">
                            {flash.success || flash.error}
                        </span>
                        <button
                            onClick={() => setShowFlash(false)}
                            className="ml-auto hover:bg-white/10 rounded-full p-1 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm border-r border-white/10"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-zinc-900/50 border-r border-white/5 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-full flex flex-col relative overflow-hidden">
                    {/* Decorative Scan Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

                    {/* Logo Area */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between relative bg-black/20">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-black font-black transform group-hover:rotate-12 transition-transform">
                                S
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-black text-xl text-white leading-none tracking-tight">
                                    SRB
                                    <span className="text-accent">ADMIN</span>
                                </span>
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                                    System v2.0
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-white/50 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                        <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                            Main Modules
                        </p>
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 group relative overflow-hidden ${
                                    link.active
                                        ? "text-black bg-accent shadow-[0_0_20px_rgba(225,29,72,0.4)] border border-accent"
                                        : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                                }`}
                            >
                                <link.icon
                                    size={18}
                                    className={`relative z-10 ${
                                        link.active ? "animate-pulse" : ""
                                    }`}
                                />
                                <span className="relative z-10">
                                    {link.name}
                                </span>
                                {link.active && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                )}
                            </Link>
                        ))}

                        <div className="mt-12">
                            <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                                System
                            </p>
                            <Link
                                href={route("admin.profile.show")}
                                className={`flex items-center gap-4 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 border border-transparent ${
                                    route().current("admin.profile.*")
                                        ? "bg-white/10 text-white border-white/10"
                                        : ""
                                }`}
                            >
                                <Settings size={18} />
                                <span>Konfigurasi</span>
                            </Link>
                            <a
                                href="/"
                                className="flex items-center gap-4 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 text-white/60 hover:text-red-500 hover:bg-red-500/10 border border-transparent group"
                            >
                                <LogOut
                                    size={18}
                                    className="rotate-180 group-hover:-translate-x-1 transition-transform"
                                />
                                <span>Logout System</span>
                            </a>
                        </div>
                    </nav>

                    {/* Admin Status Footer */}
                    <div className="p-4 border-t border-white/5 bg-black/20">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 p-[1px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                    <span className="font-bold text-white">
                                        {auth.user.name.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">
                                    {auth.user.name}
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <p className="text-[10px] font-mono text-green-500 uppercase tracking-wider">
                                        ONLINE
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="p-2 text-white/30 hover:text-white transition-colors"
                            >
                                <LogOut size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 font-sans relative z-10 lg:pl-0">
                {/* Topbar */}
                <header className="bg-zinc-900/50 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 text-white/60 hover:text-white rounded-lg transition-colors border border-white/5 bg-white/5"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-display font-black text-white uppercase tracking-tighter">
                                {title}
                            </h1>
                            <p className="text-[10px] font-mono text-white/40 hidden sm:block">
                                SECURE CONNECTION ESTABLISHED
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[10px] font-bold text-white/60">
                                SYSTEM NORMAL
                            </span>
                        </div>

                        <div className="w-px h-8 bg-white/10 hidden md:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <span className="block text-sm font-bold text-white">
                                    {auth.user.name}
                                </span>
                                <span className="block text-[10px] font-mono text-accent">
                                    SUPER ADMIN
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                                {auth.user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-10">{children}</main>
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
