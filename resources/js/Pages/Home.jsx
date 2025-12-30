import React, { useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Star,
    ShieldCheck,
    Clock,
    Sparkles,
    Zap,
    MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import ComparisonButton from "@/Components/ComparisonButton";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home({ popularMotors }) {
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(route("contact.submit"), {
            onSuccess: () => {
                toast.success("Message sent successfully!", {
                    style: {
                        background: "#bef264",
                        color: "#000",
                        fontWeight: "bold",
                    },
                    iconTheme: {
                        primary: "#000",
                        secondary: "#bef264",
                    },
                });
                reset();
            },
            onError: () => toast.error("Failed to send message."),
        });
    };

    // Parallax & Scroll Animations
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const heroy = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const texty = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <MainLayout title="The Future of Riding">
            {/* HERO SECTION - HYPER MODERN */}
            <section
                ref={targetRef}
                className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20"
            >
                {/* Background Noise & Gradients */}
                <div className="absolute inset-0 bg-surface-dark z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div style={{ y: texty }} className="relative z-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
                                Premium Reseller
                            </span>
                        </div>
                        <h1 className="text-[15vw] leading-[0.8] font-display font-black text-white tracking-tighter mix-blend-difference">
                            THE DREAM
                        </h1>
                        <h1 className="text-[15vw] leading-[0.8] font-display font-black text-transparent stroke-text tracking-tighter opacity-50">
                            RIDE
                        </h1>
                    </motion.div>

                    {/* Floating Hero Image */}
                    <motion.div
                        style={{ y: heroy }}
                        className="relative z-10 -mt-[10vw] mb-12 pointer-events-none"
                    >
                        <img
                            src="/assets/img/home.svg"
                            alt="Hero Motor"
                            className="w-full max-w-4xl mx-auto drop-shadow-2xl animate-float"
                            onError={(e) => {
                                e.target.style.display = "none"; // Hide if fails
                            }}
                        />
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-20">
                        <Link
                            href={route("motors.index")}
                            className="group relative px-8 py-4 bg-accent text-black font-display font-bold text-xl tracking-tight rounded-full overflow-hidden transition-transform hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                EXPLORE FLEET <ArrowUpRight size={24} />
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                        </Link>
                        <a
                            href="#contact"
                            className="px-8 py-4 text-white font-display font-bold text-xl border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                        >
                            BOOK APPOINTMENT
                        </a>
                    </div>
                </div>
            </section>

            {/* MARQUEE STRIP */}
            <div className="bg-accent py-4 overflow-hidden -rotate-1 relative z-20 border-y-4 border-black">
                <div className="flex gap-8 whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span
                            key={i}
                            className="text-4xl font-display font-black text-black uppercase tracking-tighter"
                        >
                            PREMIUM QUALITY • 100% WARRANTY • FAST DELIVERY •
                        </span>
                    ))}
                </div>
            </div>

            {/* BENTO GRID ADVANTAGES */}
            <section className="py-32 bg-surface-dark relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-display font-black text-white leading-none tracking-tighter">
                                WHY <span className="text-gray-700">US?</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 max-w-md text-lg leading-relaxed text-right md:text-left">
                            We don't just sell motorcycles. We curate
                            experiences. Certified quality driven by passion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Card 1: Main */}
                        <div className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-[2rem] p-10 md:p-14 relative overflow-hidden group hover:border-accent/50 transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                <Zap size={120} className="text-accent" />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-6">
                                Certified Quality
                            </h3>
                            <p className="text-gray-400 text-xl max-w-lg mb-8">
                                Every unit undergoes a rigorous 360-point
                                inspection by our master mechanics. We don't
                                compromise.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white uppercase bg-white/5">
                                    Engine Check
                                </span>
                                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white uppercase bg-white/5">
                                    Bodywork
                                </span>
                                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white uppercase bg-white/5">
                                    Legal
                                </span>
                            </div>
                        </div>

                        {/* Card 2: Vertical */}
                        <div className="bg-accent text-black rounded-[2rem] p-10 flex flex-col justify-between group cursor-pointer hover:bg-white transition-colors duration-500">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6 text-xl font-bold group-hover:rotate-45 transition-transform duration-500">
                                <ArrowUpRight />
                            </div>
                            <div>
                                <h3 className="text-3xl font-display font-bold mb-2">
                                    Instant Approval
                                </h3>
                                <p className="font-medium opacity-80">
                                    Get on the road in less than 24 hours.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Wide */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-10 flex flex-col justify-center items-center text-center group hover:border-white/30 transition-colors duration-500">
                            <ShieldCheck
                                size={48}
                                className="text-white mb-6 group-hover:scale-110 transition-transform"
                            />
                            <h3 className="text-2xl font-display font-bold text-white mb-2">
                                6 Month Warranty
                            </h3>
                            <p className="text-gray-400">
                                Peace of mind included.
                            </p>
                        </div>

                        {/* Card 4: Wide */}
                        <div className="md:col-span-2 bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-[2rem] p-10 flex items-center justify-between group hover:border-accent/30 transition-colors">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">
                                    Legal Guarantee
                                </h3>
                                <p className="text-gray-400">
                                    100% Valid Documents or Money Back.
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-full border border-dashed border-white/30 flex items-center justify-center group-hover:border-accent group-hover:text-accent text-white transition-all">
                                <CheckCircle2 />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* POPULAR COLLECTION */}
            <section className="py-32 bg-black border-t border-white/10 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
                            TRENDING <span className="text-accent">NOW</span>
                        </h2>
                        <Link
                            href={route("motors.index")}
                            className="text-white border-b border-accent pb-1 hover:text-accent transition-colors font-display text-xl uppercase tracking-widest"
                        >
                            View All Collection
                        </Link>
                    </div>

                    {popularMotors && popularMotors.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            autoplay={{ delay: 2500 }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                            className="!overflow-visible"
                        >
                            {popularMotors.map((motor) => (
                                <SwiperSlide key={motor.id}>
                                    <div className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2">
                                        <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                alt={motor.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                            {/* Status Badge */}
                                            {!motor.tersedia && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                                                    <span className="text-2xl font-display font-black text-red-500 uppercase -rotate-12 border-4 border-red-500 px-4 py-2">
                                                        SOLD OUT
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ComparisonButton
                                                    motor={motor}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">
                                                        {motor.brand || "Motor"}
                                                    </p>
                                                    <h3 className="text-xl font-body font-bold text-white leading-tight">
                                                        {motor.name}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                                <p className="text-sm text-gray-500">
                                                    {motor.year} • {motor.type}
                                                </p>
                                                <p className="text-xl font-display font-bold text-white">
                                                    Rp{" "}
                                                    {parseFloat(
                                                        motor.price
                                                    ).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                            <p className="text-gray-500">
                                No trending motors available.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CONTACT / CTA */}
            <section
                id="contact"
                className="py-32 bg-accent text-black relative overflow-hidden"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-20 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tighter mb-8">
                                LET'S TALK <br /> BUSINESS.
                            </h2>
                            <p className="text-xl font-medium max-w-md mb-12">
                                Ready to upgrade your ride? Our team is waiting
                                to get you on the road.
                            </p>
                            <div className="space-y-6 text-xl font-bold">
                                <a
                                    href="mailto:darrelrangga@gmail.com"
                                    className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                                >
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                                        @
                                    </div>
                                    hello@srbmotors.id
                                </a>
                                <a
                                    href="tel:08978638849"
                                    className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                                >
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                                        #
                                    </div>
                                    089-7863-8849
                                </a>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                                        <MapPin size={20} />
                                    </div>
                                    Bekasi Utara, Indonesia
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/5 p-10 rounded-[2rem] border border-black/5 backdrop-blur-sm">
                            <form
                                onSubmit={submitContact}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wide opacity-50">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full bg-transparent border-b-2 border-black/20 py-3 text-xl font-bold focus:border-black focus:ring-0 placeholder-black/30 outline-none transition-colors"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wide opacity-50">
                                            Email / Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full bg-transparent border-b-2 border-black/20 py-3 text-xl font-bold focus:border-black focus:ring-0 placeholder-black/30 outline-none transition-colors"
                                            placeholder="Contact Info"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wide opacity-50">
                                        Message
                                    </label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        className="w-full bg-transparent border-b-2 border-black/20 py-3 text-xl font-bold focus:border-black focus:ring-0 placeholder-black/30 outline-none transition-colors resize-none h-32"
                                        placeholder="I'm interested in..."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-5 bg-black text-white font-display font-bold text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-xl disabled:opacity-50"
                                >
                                    {processing ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
