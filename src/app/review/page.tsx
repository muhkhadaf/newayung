"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ReviewPage() {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        message: "",
        rating: 5,
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const { error } = await supabase
                .from("testimonials")
                .insert([formData]);

            if (error) throw error;

            setSubmitted(true);
        } catch (error: any) {
            console.error("Error submitting review:", error);
            setError("Gagal mengirim ulasan. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Terima Kasih!</h2>
                    <p className="text-gray-600 mb-8">
                        Ulasan Anda telah berhasil dikirim.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
                    >
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Bagikan Pengalaman Anda</h1>
                    <p className="text-gray-600">
                        Kami menghargai masukan Anda! Silakan luangkan waktu sejenak untuk menilai pengalaman Anda bersama Ayung Project.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating Anda</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= formData.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="Nama Anda"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Peran / Perusahaan (Opsional)</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="Contoh: CEO di Perusahaan"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ulasan</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                                placeholder="Ceritakan pengalaman Anda..."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {submitting ? "Mengirim..." : "Kirim Ulasan"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
