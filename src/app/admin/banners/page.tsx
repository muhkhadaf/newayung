"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default function BannersPage() {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const { data, error } = await supabase
                .from("banners")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            if (data) setBanners(data);
        } catch (error) {
            console.error("Error fetching banners:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this banner?")) return;

        try {
            const res = await fetch(`/api/banners/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to delete banner");
            }

            fetchBanners();
        } catch (error: any) {
            console.error("Error deleting banner:", error);
            alert(error.message || "Failed to delete banner");
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/banners/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_active: !currentStatus }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to update status");
            }

            fetchBanners();
        } catch (error: any) {
            console.error("Error updating banner status:", error);
            alert(error.message || "Failed to update status");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Promotional Banners</h1>
                <Link
                    href="/admin/banners/new"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Banner
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500">Image</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Title</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Link</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {banners.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No banners found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                banners.map((banner) => (
                                    <tr key={banner.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="w-24 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                                                <img
                                                    src={banner.image_url}
                                                    alt={banner.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {banner.title || "Untitled"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                                            {banner.link || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(banner.id, banner.is_active)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${banner.is_active
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {banner.is_active ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleActive(banner.id, banner.is_active)}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                                    title={banner.is_active ? "Deactivate" : "Activate"}
                                                >
                                                    {banner.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                </button>
                                                <Link
                                                    href={`/admin/banners/${banner.id}`}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
            )}
        </div>
    );
}
