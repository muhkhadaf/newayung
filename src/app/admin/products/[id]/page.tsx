"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ProductForm({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === "new";
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        accent: "bg-blue-100 text-blue-600", // Default accent
        border_color: "group-hover:border-blue-200", // Default border
        long_description: "",
        features: [] as string[],
        slug: "",
    });

    useEffect(() => {
        if (!isNew) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    price: data.price || "",
                    image: data.image || "",
                    accent: data.accent || "bg-blue-100 text-blue-600",
                    border_color: data.border_color || "group-hover:border-blue-200",
                    long_description: data.long_description || "",
                    features: data.features || [],
                    slug: data.slug || "",
                });
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = e.target.files[0];
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("bucket", "products");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Upload failed");
            }

            setFormData({ ...formData, image: data.url });
        } catch (error: any) {
            console.error("Error uploading image:", error);
            alert(error.message || "Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isNew) {
                const { error } = await supabase.from("services").insert([formData]);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("services")
                    .update(formData)
                    .eq("id", id);
                if (error) throw error;
            }
            router.push("/admin/products");
        } catch (error: any) {
            console.error("Error saving product:", JSON.stringify(error, null, 2));
            alert(`Failed to save product: ${error.message || JSON.stringify(error)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isNew ? "Add New Product" : "Edit Product"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => {
                            const title = e.target.value;
                            // Auto-generate slug if it's new or empty
                            const slug = title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)+/g, "");

                            setFormData(prev => ({
                                ...prev,
                                title,
                                // Only auto-update slug if it wasn't manually edited (simplified: always update for now or check if match)
                                // For better UX, let's just update it if it matches the old title slugified, or if it's empty.
                                // But for simplicity in this step, let's just update title. We'll handle slug in its own field change or effect.
                            }));

                            // Simple auto-gen:
                            if (!formData.slug || formData.slug === formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")) {
                                setFormData(prev => ({ ...prev, title, slug }));
                            } else {
                                setFormData(prev => ({ ...prev, title }));
                            }
                        }}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="e.g. Web Development"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                    <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            /services/
                        </span>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="web-development"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate from title.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Brief summary for the card..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Long Description</label>
                    <textarea
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleChange}
                        rows={5}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Detailed description of the service..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="space-y-2">
                        {(formData.features || []).map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    placeholder="e.g. Responsive Design"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="inline-flex items-center px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Feature
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="e.g. 1.5jt"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                        <div className="flex items-center gap-4">
                            {formData.image && (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
