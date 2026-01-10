import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        // 1. Check Authentication
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // 2. Parse Form Data
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const bucket = formData.get("bucket") as string || "portfolio";

        if (!file) {
            return NextResponse.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        // 3. Upload to Supabase Storage (using Service Role)
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert File to ArrayBuffer for upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const { error: uploadError } = await supabaseAdmin.storage
            .from(bucket)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        // 4. Get Public URL
        const { data } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return NextResponse.json({ url: data.publicUrl });

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
