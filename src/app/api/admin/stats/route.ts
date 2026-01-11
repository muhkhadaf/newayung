import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        const [
            { count: servicesCount },
            { count: projectsCount },
            { count: testimonialsCount },
            { count: faqsCount },
            { count: bannersCount },
            { count: usersCount },
        ] = await Promise.all([
            supabaseAdmin.from("services").select("*", { count: "exact", head: true }),
            supabaseAdmin.from("projects").select("*", { count: "exact", head: true }),
            supabaseAdmin.from("testimonials").select("*", { count: "exact", head: true }),
            supabaseAdmin.from("faqs").select("*", { count: "exact", head: true }),
            supabaseAdmin.from("banners").select("*", { count: "exact", head: true }),
            supabaseAdmin.from("users").select("*", { count: "exact", head: true }),
        ]);

        return NextResponse.json({
            services: servicesCount || 0,
            projects: projectsCount || 0,
            testimonials: testimonialsCount || 0,
            faqs: faqsCount || 0,
            banners: bannersCount || 0,
            users: usersCount || 0,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { message: "Error fetching stats" },
            { status: 500 }
        );
    }
}
