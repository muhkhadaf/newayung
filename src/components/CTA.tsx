"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTA = () => {
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="bg-primary rounded-3xl p-8 md:p-20 text-center relative overflow-hidden">
                    {/* Background Patterns */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6"
                        >
                            Siap Meningkatkan Bisnis Anda ke Level Berikutnya?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white/90 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed"
                        >
                            Jangan biarkan kompetitor mendahului Anda. Miliki website profesional dan branding yang kuat sekarang juga bersama Ayung Project.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                href="https://wa.me/6289602981841"
                                target="_blank"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary transition-all duration-200 bg-white rounded-full hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1"
                            >
                                Konsultasi Gratis
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
