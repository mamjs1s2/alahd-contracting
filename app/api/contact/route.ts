import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, projectType, message } = body as {
      name?: string;
      phone?: string;
      email?: string;
      projectType?: string;
      message?: string;
    };

    if (!name || !phone || !projectType) {
      return NextResponse.json({ error: "missing-fields" }, { status: 400 });
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
          <h2>طلب تواصل جديد — موقع العهد للمقاولات</h2>
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
