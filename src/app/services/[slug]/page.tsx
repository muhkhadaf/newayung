import { supabase } from "@/lib/supabase";
import ServiceDetailClient from "./ServiceDetailClient";
import { Metadata } from "next";

// Helper function to fetch service data
async function getService(slug: string) {
    // Try fetching by slug first
    let { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .single();

    // If not found by slug, and slug looks like a UUID, try fetching by ID (backward compatibility)
    if ((!data || error) && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
        const res = await supabase
            .from("services")
            .select("*")
            .eq("id", slug)
            .single();
        data = res.data;
        error = res.error;
    }

    if (error) return null;
    return data;
}

// Helper function to fetch packages
async function getPackages(serviceId: string) {
    const { data, error } = await supabase
        .from("service_packages")
        .select("*")
        .eq("service_id", serviceId)
        .order("price", { ascending: true });

    if (error) return [];
    return data;
}

// Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        return {
            title: "Service Not Found",
            description: "The requested service could not be found.",
        };
    }

    return {
        title: `${service.title} | Ayung Project`,
        description: service.long_description?.slice(0, 160) || service.description?.slice(0, 160) || `Layanan ${service.title} terbaik dari Ayung Project.`,
        openGraph: {
            title: `${service.title} | Ayung Project`,
            description: service.long_description?.slice(0, 160) || service.description?.slice(0, 160),
            images: service.image ? [service.image] : [],
            type: "website",
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        return (
            <ServiceDetailClient service={null} packages={[]} />
        );
    }

    const packages = await getPackages(service.id);

    // JSON-LD Structured Data for Product/Service
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "image": service.image,
        "description": service.description,
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": service.price,
            "priceCurrency": "IDR",
            "offerCount": packages.length > 0 ? packages.length : 1
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServiceDetailClient service={service} packages={packages} />
        </>
    );
}
