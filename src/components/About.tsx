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
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
                            Tentang Kami
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Partner Digital Terbaik untuk Pertumbuhan Bisnis Anda
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                            Ayung Project adalah agensi kreatif yang berfokus pada pembuatan website dan desain grafis. Kami percaya bahwa setiap bisnis memiliki cerita unik yang layak untuk ditampilkan dengan cara yang luar biasa.
                        </p>
                        <p className="text-gray-600 mb-12 leading-relaxed text-lg">
                            Dengan kombinasi teknologi terkini dan sentuhan seni, kami menciptakan solusi digital yang tidak hanya indah dipandang tetapi juga fungsional dan menghasilkan konversi.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                            {benefits.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
