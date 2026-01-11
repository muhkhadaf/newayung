import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";
import sharp from "sharp";

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

        // 3. Process Image with Sharp
        const arrayBuffer = await file.arrayBuffer();
        let buffer: Buffer = Buffer.from(arrayBuffer as ArrayBuffer);

        // Only compress if it's an image
        if (file.type.startsWith("image/")) {
            try {
                buffer = (await sharp(buffer)
                    .resize(1920, 1080, { // Max dimensions
                        fit: "inside",
                        withoutEnlargement: true
                    })
                    .webp({ quality: 80 }) // Convert to WebP with 80% quality
                    .toBuffer()) as Buffer;
            } catch (sharpError) {
                console.error("Sharp compression error:", sharpError);
                // Fallback to original buffer if compression fails
            }
        }

        // 4. Upload to Supabase Storage
        // Use .webp extension if compressed, otherwise keep original
        const fileExt = file.type.startsWith("image/") ? "webp" : file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from(bucket)
            .upload(filePath, buffer, {
                contentType: file.type.startsWith("image/") ? "image/webp" : file.type,
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        // 5. Get Public URL
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
