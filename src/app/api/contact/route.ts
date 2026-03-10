import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Simple in-memory rate limiter: max 5 submissions per IP per 15 minutes
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Πολλές αιτήσεις. Παρακαλώ δοκιμάστε ξανά αργότερα." },
        { status: 429 }
      );
    }

    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία." },
        { status: 400 }
      );
    }

    // Save to database
    const { error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ name, email, phone: phone || null, subject: subject || null, message });

    if (dbError) {
      console.error("DB insert error:", dbError);
    }

    // Escape all user input for HTML email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : null;
    const safeSubject = subject ? escapeHtml(subject) : null;
    const safeMessage = escapeHtml(message);

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Alkater Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Νέο μήνυμα επικοινωνίας από ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(90deg, #1A4D6E, #8B1A2B); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Νέο Μήνυμα Επικοινωνίας</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1A4D6E; width: 120px;">Ονοματεπώνυμο:</td>
                <td style="padding: 8px 0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1A4D6E;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              ${safePhone ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1A4D6E;">Τηλέφωνο:</td>
                <td style="padding: 8px 0;"><a href="tel:${safePhone}">${safePhone}</a></td>
              </tr>` : ""}
              ${safeSubject ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1A4D6E;">Θέμα:</td>
                <td style="padding: 8px 0;">${safeSubject}</td>
              </tr>` : ""}
            </table>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <div>
              <p style="font-weight: bold; color: #1A4D6E; margin-bottom: 8px;">Μήνυμα:</p>
              <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Αποτυχία αποστολής. Παρακαλώ δοκιμάστε ξανά." },
      { status: 500 }
    );
  }
}
