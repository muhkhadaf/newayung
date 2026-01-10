import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        // Validate required fields
        if (!body.image_url) {
            return NextResponse.json(
                { message: "Image is required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from("banners")
            .insert([body])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error creating banner:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
