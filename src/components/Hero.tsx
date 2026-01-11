"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-50 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-50 blur-3xl" />

            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center text-center">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                                Jasa Pembuatan Desain Logo, Website, dan Branding
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                                Bangun Identitas Digital yang <span className="text-primary">Memukau</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Ayung Project membantu bisnis Anda tampil profesional dengan desain website modern, logo unik, dan branding yang kuat. Siap untuk meningkatkan omzet?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1"
                                >
                                    Mulai Sekarang
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link
                                    href="#portfolio"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-primary hover:border-primary/30"
                                >
                                    Lihat Portfolio
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
