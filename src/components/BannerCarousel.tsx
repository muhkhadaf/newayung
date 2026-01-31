"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const BannerCarousel = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data, error } = await supabase
                    .from("banners")
                    .select("*")
                    .eq("is_active", true)
                    .order("created_at", { ascending: false });

                if (error) throw error;
                if (data) setBanners(data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (loading || banners.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex, loading, banners.length, isPaused]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = banners.length - 1;
            if (nextIndex >= banners.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 1,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 1,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    if (loading) return null;
    if (banners.length === 0) return null;

    return (
        <section
            className="relative w-full h-[200px] md:h-[400px] lg:h-[500px] mx-auto overflow-hidden my-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute w-full h-full"
                >
                    {banners[currentIndex].link ? (
                        <Link href={banners[currentIndex].link} className="block w-full h-full relative">
                            <Image
                                src={banners[currentIndex].image_url}
                                alt={banners[currentIndex].title || "Banner"}
                                fill
                                className="object-contain object-center"
                                priority
                            />
                            {banners[currentIndex].title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                                    <h2 className="text-white text-lg md:text-2xl font-bold text-center">
                                        {banners[currentIndex].title}
                                    </h2>
                                </div>
                            )}
                        </Link>
                    ) : (
                        <div className="w-full h-full relative">
                            <Image
                                src={banners[currentIndex].image_url}
                                alt={banners[currentIndex].title || "Banner"}
                                fill
                                className="object-contain object-center"
                                priority
                            />
                            {banners[currentIndex].title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                                    <h2 className="text-white text-lg md:text-2xl font-bold text-center">
                                        {banners[currentIndex].title}
                                    </h2>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {banners.length > 1 && (
                <>
                    <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors z-20"
                        onClick={(e) => {
                            e.preventDefault();
                            paginate(-1);
                        }}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors z-20"
                        onClick={(e) => {
                            e.preventDefault();
                            paginate(1);
                        }}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? "bg-white scale-110"
                                    : "bg-white/50 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default BannerCarousel;
