import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isValidContactName, normalizeContactName, normalizeEgyptianMobile } from "@/lib/contact-validation";

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

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return NextResponse.json({ error: "server-not-configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"نموذج تواصل الموقع" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: email || undefined,
      subject: `طلب تواصل جديد من ${name}`,
      html: `
        <div style="font-family:sans-serif;direction:rtl;text-align:right">
          <h2>طلب تواصل جديد — موقع العهد الصناعي للمقاولات العامة</h2>
          <p><b>الاسم:</b> ${name}</p>
          <p><b>الهاتف:</b> ${phone}</p>
          <p><b>البريد الإلكتروني:</b> ${email || "غير محدد"}</p>
          <p><b>نوع المشروع:</b> ${projectType}</p>
          <p><b>تفاصيل الطلب:</b></p>
          <p>${(message || "لا توجد تفاصيل إضافية").replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form send failed", err);
    return NextResponse.json({ error: "send-failed" }, { status: 500 });
  }
}
