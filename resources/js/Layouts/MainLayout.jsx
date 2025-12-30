import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";
import ComparisonFloatingBar from "@/Components/ComparisonFloatingBar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children, title }) {
    const { flash } = usePage().props;

    useEffect(() => {
        const handleAnchorClick = (e) => {
            const targetId = e.target.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition =
                        targetElement.getBoundingClientRect().top;
                    const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach((anchor) =>
            anchor.addEventListener("click", handleAnchorClick)
        );

        return () => {
            anchors.forEach((anchor) =>
                anchor.removeEventListener("click", handleAnchorClick)
            );
        };
    }, []);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col font-sans text-white bg-surface-dark selection:bg-accent selection:text-black overflow-x-hidden">
                <Navbar />
                {/* Removed automatic pt-24 to prevent gaps. Pages must handle their own spacing if needed, or use a wrapper. 
                    However, for standard pages, we might need it. But since we want 'immersive' headers, we remove it.
                */}
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        className:
                            "!rounded-2xl !font-medium !shadow-xl !bg-zinc-900 !text-white !border !border-white/10",
                    }}
                />
                <FloatingWhatsApp />
                <ComparisonFloatingBar />
            </div>
        </>
    );
}
