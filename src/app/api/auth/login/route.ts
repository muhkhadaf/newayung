import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Manual authentication against 'users' table
        const { data: user, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password", password) // Note: In production, use hashed passwords!
            .single();

        if (error || !user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ message: "Login successful", user });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
