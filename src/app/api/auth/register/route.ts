import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

        // Insert new user
        const { error } = await supabaseAdmin
            .from("users")
            .insert([
                {
                    email,
                    password, // Note: In production, hash this!
                    name,
                },
            ]);

        if (error) {
            throw error;
        }

        return NextResponse.json({ message: "User created successfully" });
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
