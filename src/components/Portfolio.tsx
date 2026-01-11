"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categories = ["Logo Design", "Web Development", "Company Profile", "Social Media", "Desain Lainnya"];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState("Logo Design");
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                if (data) setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => project.category === activeCategory);

    if (loading) {
        return (
            <section id="portfolio" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <p>Loading portfolio...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-2"
                    >
                        Portfolio
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Karya Terbaik Kami
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600"
                    >
                        Lihat bagaimana kami membantu klien kami mencapai tujuan mereka melalui desain dan teknologi.
                    </motion.p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? "bg-primary text-white shadow-lg scale-105"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                <motion.div
                    layout
                    className={`grid ${activeCategory === "Logo Design" ? "grid-cols-4 gap-2" : "grid-cols-2 gap-3"} md:grid-cols-3 lg:grid-cols-4 md:gap-8`}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id || index}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative overflow-hidden rounded-lg md:rounded-2xl shadow-lg cursor-pointer bg-white"
                            >
                                <Link href={`/portfolio/${project.id}`} className="block h-full">
                                    <div className={`aspect-[4/3] relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110 bg-gray-100`}>
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className={`text-gray-400 font-bold opacity-20 text-center ${activeCategory === "Logo Design" ? "text-[10px] px-1" : "text-lg px-2"} md:text-2xl`}>
                                                {project.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end ${activeCategory === "Logo Design" ? "p-2" : "p-3"} md:p-6`}>
                                        <span className={`text-primary-light font-medium ${activeCategory === "Logo Design" ? "text-[8px] mb-0.5" : "text-xs mb-1"} md:text-sm line-clamp-1`}>{project.category}</span>
                                        <h4 className={`text-white font-bold ${activeCategory === "Logo Design" ? "text-[10px] mb-0.5" : "text-sm mb-1"} md:text-xl md:mb-2 line-clamp-1`}>{project.title}</h4>
                                        <span className={`inline-flex items-center text-white hover:text-primary-light transition-colors ${activeCategory === "Logo Design" ? "text-[8px]" : "text-xs"} md:text-sm font-medium`}>
                                            Detail <ExternalLink className={`${activeCategory === "Logo Design" ? "ml-0.5 w-2 h-2" : "ml-1 w-3 h-3"} md:ml-2 md:w-4 md:h-4`} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="text-center mt-12">
                    <Link href="#" className="inline-block px-8 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                        Lihat Semua Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
