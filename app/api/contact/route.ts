import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidContactName, normalizeContactName, normalizeEgyptianMobile } from "@/lib/contact-validation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "missing-fields" }, { status: 400 });
    }

    const fields = body as Record<string, unknown>;
    const name = typeof fields.name === "string" ? normalizeContactName(fields.name) : "";
    const phone = typeof fields.phone === "string" ? normalizeEgyptianMobile(fields.phone) : null;
    const email = typeof fields.email === "string" ? fields.email.trim() : "";
    const projectType = typeof fields.projectType === "string" ? fields.projectType.trim() : "";
    const message = typeof fields.message === "string" ? fields.message.trim() : "";

    if (!name || !projectType) {
      return NextResponse.json({ error: "missing-fields" }, { status: 400 });
    }
    if (!isValidContactName(name)) {
      return NextResponse.json({ error: "invalid-name" }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: "invalid-phone" }, { status: 400 });
    }

    // حفظ البيانات مباشرة في جدول contact_messages في Supabase
    const { error: dbError } = await supabase.from("contact_messages").insert([
      {
        name,
        phone,
        email: email || null,
        project_type: projectType,
        message: message || null,
      },
    ]);

    if (dbError) {
      console.error("Database insert error:", dbError.message);
      return NextResponse.json({ error: "send-failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form submission failed", err);
    return NextResponse.json({ error: "send-failed" }, { status: 500 });
  }
}