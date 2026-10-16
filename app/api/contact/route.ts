import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { isValidContactName, normalizeContactName, normalizeEgyptianMobile } from "@/lib/contact-validation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1. تخزين الطلب في قاعدة البيانات (Supabase)
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

    // 2. إرسال البريد الإلكتروني عبر خدمة Resend السحابية الآمنة
    try {
      await resend.emails.send({
        from: 'Al-Ahad Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_TO || 'levinhomahmoud@gmail.com',
        replyTo: email || undefined,
        subject: `طلب مشروع جديد من الموقع: ${name}`,
        html: `
          <div style="font-family:sans-serif;direction:rtl;text-align:right;padding:20px;background:#f8fafc;color:#0f172a;">
            <h2 style="color:#d97706;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">طلب تواصل جديد — موقع العهد الصناعي</h2>
            <p><b>الاسم:</b> ${name}</p>
            <p><b>الهاتف:</b> ${phone}</p>
            <p><b>البريد الإلكتروني:</b> ${email || "غير محدد"}</p>
            <p><b>نوع المشروع:</b> ${projectType}</p>
            <p><b>تفاصيل الطلب:</b></p>
            <div style="background:#ffffff;padding:15px;border-radius:8px;border:1px solid #cbd5e1;margin-top:5px;">
              ${(message || "لا توجد تفاصيل إضافية").replace(/\n/g, "<br/>")}
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Resend email failed, but data saved to DB:", emailErr);
      // لن نوقف العملية لو فشل الإرسال لأن البيانات خُزنت في القاعدة بنجاح
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form submission failed", err);
    return NextResponse.json({ error: "send-failed" }, { status: 500 });
  }
}