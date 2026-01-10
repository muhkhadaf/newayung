import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");
        const { id } = await params;

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const { data, error } = await supabaseAdmin
            .from("banners")
            .update(body)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error updating banner:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");
        const { id } = await params;

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { error } = await supabaseAdmin
            .from("banners")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "Banner deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting banner:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
