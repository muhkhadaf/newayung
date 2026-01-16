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

    const [packages, setPackages] = useState<any[]>([]);
    const [editingPackage, setEditingPackage] = useState<any>(null);
    const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

    useEffect(() => {
        if (!isNew) {
            fetchProduct();
            fetchPackages();
        }
    }, [id]);

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from("service_packages")
                .select("*")
                .eq("service_id", id)
                .order("price", { ascending: true }); // Simple sort, might need numeric sort later

            if (error) throw error;
            if (data) setPackages(data);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };

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

    const handleSavePackage = async (pkgData: any) => {
        try {
            if (pkgData.id) {
                const { error } = await supabase
                    .from("service_packages")
                    .update(pkgData)
                    .eq("id", pkgData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("service_packages")
                    .insert([{ ...pkgData, service_id: id }]);
                if (error) throw error;
            }
            fetchPackages();
            setIsPackageModalOpen(false);
            setEditingPackage(null);
        } catch (error: any) {
            console.error("Error saving package:", error);
            alert("Failed to save package: " + error.message);
        }
    };

    const handleDeletePackage = async (pkgId: string) => {
        if (!confirm("Are you sure you want to delete this package?")) return;
        try {
            const { error } = await supabase
                .from("service_packages")
                .delete()
                .eq("id", pkgId);
            if (error) throw error;
            fetchPackages();
        } catch (error: any) {
            console.error("Error deleting package:", error);
            alert("Failed to delete package: " + error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    const slug = title
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")
                                        .replace(/(^-|-$)+/g, "");

                                    setFormData(prev => ({
                                        ...prev,
                                        title,
                                    }));

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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Features (General)</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Starting Price</label>
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

                {/* Packages Section */}
                {!isNew && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Service Packages</h2>
                                <button
                                    onClick={() => {
                                        setEditingPackage({
                                            name: "",
                                            price: "",
                                            original_price: "",
                                            features: [""],
                                            is_popular: false
                                        });
                                        setIsPackageModalOpen(true);
                                    }}
                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {packages.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">No packages added yet.</p>
                                ) : (
                                    packages.map((pkg) => (
                                        <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-primary font-bold">{pkg.price}</span>
                                                        {pkg.original_price && (
                                                            <span className="text-xs text-gray-400 line-through">{pkg.original_price}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => {
                                                            setEditingPackage(pkg);
                                                            setIsPackageModalOpen(true);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-50 rounded"
                                                    >
                                                        <Save className="w-4 h-4" /> {/* Reuse Save icon as Edit for now or import Edit */}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePackage(pkg.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            {pkg.is_popular && (
                                                <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full mb-2">
                                                    Popular
                                                </span>
                                            )}
                                            <ul className="text-xs text-gray-600 space-y-1">
                                                {(pkg.features || []).slice(0, 3).map((f: string, i: number) => (
                                                    <li key={i} className="flex items-center">
                                                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                                                        {f}
                                                    </li>
                                                ))}
                                                {(pkg.features || []).length > 3 && (
                                                    <li className="text-gray-400 italic">+{pkg.features.length - 3} more...</li>
                                                )}
                                            </ul>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Package Modal */}
            {isPackageModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {editingPackage?.id ? "Edit Package" : "Add Package"}
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSavePackage(editingPackage);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                                <input
                                    type="text"
                                    value={editingPackage.name}
                                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                                    required
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    placeholder="e.g. Basic, Premium"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input
                                        type="text"
                                        value={editingPackage.price}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                                        required
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        placeholder="e.g. 500rb"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (Promo)</label>
                                    <input
                                        type="text"
                                        value={editingPackage.original_price || ""}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, original_price: e.target.value })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingPackage.is_popular || false}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, is_popular: e.target.checked })}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700">Mark as Popular</span>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                                <div className="space-y-2">
                                    {(editingPackage.features || []).map((feature: string, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => {
                                                    const newFeatures = [...editingPackage.features];
                                                    newFeatures[index] = e.target.value;
                                                    setEditingPackage({ ...editingPackage, features: newFeatures });
                                                }}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm"
                                                placeholder="Feature..."
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFeatures = editingPackage.features.filter((_: any, i: number) => i !== index);
                                                    setEditingPackage({ ...editingPackage, features: newFeatures });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setEditingPackage({ ...editingPackage, features: [...(editingPackage.features || []), ""] })}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        + Add Feature
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsPackageModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                    Save Package
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
