import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { email, password, name } = await req.json();

        const updates: any = {};
        if (email) updates.email = email;
        if (password) updates.password = password;
        if (name) updates.name = name;

        const { data, error } = await supabaseAdmin
            .from("users")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating user" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { error } = await supabaseAdmin
            .from("users")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting user" },
            { status: 500 }
        );
    }
}
