import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get("admin_session");

        if (!adminSession) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabaseAdmin
            .from("testimonials")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
