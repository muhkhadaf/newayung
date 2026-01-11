"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Trash2, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials");
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete");
            fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial");
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_active: !currentStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");
            fetchTestimonials();
        } catch (error) {
            console.error("Error updating testimonial status:", error);
            alert("Failed to update status");
        }
    };

    const filteredTestimonials = testimonials.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500">User</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Rating</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Message</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredTestimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No testimonials found
                                    </td>
                                </tr>
                            ) : (
                                filteredTestimonials.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative shrink-0">
                                                    {t.image_url ? (
                                                        <Image
                                                            src={t.image_url}
                                                            alt={t.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">
                                                            {t.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{t.name}</div>
                                                    <div className="text-xs text-gray-500">{t.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="font-medium">{t.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-600 line-clamp-2 max-w-xs">{t.message}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.is_active
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {t.is_active ? "Active" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleActive(t.id, t.is_active)}
                                                    className={`p-2 rounded-lg transition-colors ${t.is_active
                                                        ? "text-orange-600 hover:bg-orange-50"
                                                        : "text-green-600 hover:bg-green-50"
                                                        }`}
                                                    title={t.is_active ? "Hide" : "Approve"}
                                                >
                                                    {t.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
