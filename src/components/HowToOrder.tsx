"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, CreditCard, Rocket } from "lucide-react";

const steps = [
    {
        icon: <MessageSquare className="w-8 h-8" />,
        title: "Konsultasi",
        description: "Hubungi kami dan diskusikan kebutuhan project Anda.",
    },
    {
        icon: <FileText className="w-8 h-8" />,
        title: "Penawaran",
        description: "Kami akan memberikan penawaran harga dan timeline pengerjaan.",
    },
    {
        icon: <CreditCard className="w-8 h-8" />,
        title: "Pembayaran & Pengerjaan",
        description: "Lakukan DP dan kami akan mulai mengerjakan project Anda.",
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: "Revisi & Serah Terima",
        description: "Review hasil kerja kami, revisi jika perlu, dan project selesai.",
    },
];

const HowToOrder = () => {
    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white/80 font-semibold tracking-wide uppercase text-sm mb-2"
                    >
                        Cara Pemesanan
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        4 Langkah Mudah
                    </motion.h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/20 h-full hover:bg-white/20 transition-colors duration-300">
                                <div className="w-10 h-10 md:w-16 md:h-16 bg-white text-primary rounded-full flex items-center justify-center mb-3 md:mb-6 text-lg md:text-2xl font-bold shadow-lg">
                                    {index + 1}
                                </div>
                                <div className="mb-2 md:mb-4 text-white/90 transform scale-75 origin-left md:scale-100">{step.icon}</div>
                                <h4 className="text-sm md:text-xl font-bold mb-1 md:mb-3">{step.title}</h4>
                                <p className="text-white/80 text-xs md:text-base leading-relaxed">{step.description}</p>
                            </div>

                            {/* Connector Line for Desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30 transform -translate-y-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToOrder;
