import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from("users")
            .select("*");

        if (error) {
            console.error("Supabase Error:", error);
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "Error fetching users", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const { data: existingUser } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from("users")
            .insert([{ email, password, name }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating user" },
            { status: 500 }
        );
    }
}
