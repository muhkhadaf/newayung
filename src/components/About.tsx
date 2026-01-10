"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const About = () => {
    const benefits = [
        "Tim Profesional & Berpengalaman",
        "Desain Modern & Kekinian",
        "Harga Kompetitif & Transparan",
        "Pengerjaan Cepat & Tepat Waktu",
        "Support & Maintenance",
        "SEO Friendly Structure",
    ];

    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-white relative">
                                {/* Placeholder for About Image */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                                    <span className="text-primary font-bold text-xl">Tentang Ayung Project</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl -z-10 opacity-20" />
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-200 rounded-full -z-10 opacity-50" />
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
                                Tentang Kami
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Partner Digital Terbaik untuk Pertumbuhan Bisnis Anda
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Ayung Project adalah agensi kreatif yang berfokus pada pembuatan website dan desain grafis. Kami percaya bahwa setiap bisnis memiliki cerita unik yang layak untuk ditampilkan dengan cara yang luar biasa.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Dengan kombinasi teknologi terkini dan sentuhan seni, kami menciptakan solusi digital yang tidak hanya indah dipandang tetapi juga fungsional dan menghasilkan konversi.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {benefits.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
