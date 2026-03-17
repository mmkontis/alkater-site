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

    const recipients = [process.env.SMTP_USER];
    if (process.env.SMTP_USER_MINAS) {
      recipients.push(process.env.SMTP_USER_MINAS);
    }

    const siteUrl = process.env.SITE_URL || "https://alkater.gr";
    const logoUrl = `${siteUrl}/Photos/Logo/alkater-logo-email.jpg`;
    const now = new Date().toLocaleDateString("el-GR", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    const mailOptions = {
      from: `"ΑΛΚΑΤΕΡ Α.Ε." <${process.env.SMTP_USER}>`,
      to: recipients.join(", "),
      replyTo: email,
      subject: `Νέο μήνυμα επικοινωνίας από ${safeName}`,
      html: `
<!DOCTYPE html>
<html lang="el">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f0ede8;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ede8;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">

        <!-- Header with logo -->
        <tr>
          <td style="background-color:#111111;padding:28px 32px;text-align:center;">
            <img src="${logoUrl}" alt="ΑΛΚΑΤΕΡ" width="220" height="auto" style="display:block;margin:0 auto;max-width:220px;height:auto;" />
          </td>
        </tr>

        <!-- Red accent stripe -->
        <tr>
          <td style="background:linear-gradient(90deg,#063D64,#A21B21);height:4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Title bar -->
        <tr>
          <td style="background-color:#063D64;padding:20px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">
              &#9993; Νέο Μήνυμα Επικοινωνίας
            </h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:12px;">
              ${now}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background-color:#ffffff;padding:32px;">

            <!-- Contact details -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 16px;background-color:#f8f6f3;border-left:3px solid #063D64;border-radius:6px;">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#999;">Ονοματεπώνυμο</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#111111;">${safeName}</p>
                </td>
              </tr>
              <tr><td style="height:10px;"></td></tr>
              <tr>
                <td style="padding:12px 16px;background-color:#f8f6f3;border-left:3px solid #063D64;border-radius:6px;">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#999;">Email</p>
                  <p style="margin:0;font-size:16px;color:#111111;">
                    <a href="mailto:${safeEmail}" style="color:#063D64;text-decoration:none;font-weight:600;">${safeEmail}</a>
                  </p>
                </td>
              </tr>
              ${safePhone ? `
              <tr><td style="height:10px;"></td></tr>
              <tr>
                <td style="padding:12px 16px;background-color:#f8f6f3;border-left:3px solid #063D64;border-radius:6px;">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#999;">Τηλέφωνο</p>
                  <p style="margin:0;font-size:16px;color:#111111;">
                    <a href="tel:${safePhone}" style="color:#063D64;text-decoration:none;font-weight:600;">${safePhone}</a>
                  </p>
                </td>
              </tr>` : ""}
              ${safeSubject ? `
              <tr><td style="height:10px;"></td></tr>
              <tr>
                <td style="padding:12px 16px;background-color:#f8f6f3;border-left:3px solid #A21B21;border-radius:6px;">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#999;">Θέμα</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#111111;">${safeSubject}</p>
                </td>
              </tr>` : ""}
            </table>

            <!-- Divider -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
              <tr>
                <td style="border-top:1px solid #e8e4dd;"></td>
              </tr>
            </table>

            <!-- Message -->
            <div style="background-color:#f8f6f3;border-radius:8px;padding:20px 24px;border:1px solid #e8e4dd;">
              <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#999;">Μήνυμα</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#222222;white-space:pre-wrap;">${safeMessage}</p>
            </div>

            <!-- Reply button -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr>
                <td align="center">
                  <a href="mailto:${safeEmail}" style="display:inline-block;background-color:#A21B21;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
                    Απαντήστε στον ${safeName}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#111111;padding:20px 32px;text-align:center;">
            <p style="margin:0 0 4px;color:rgba(245,243,238,0.5);font-size:11px;letter-spacing:0.5px;">
              ΑΛΚΑΤΕΡ Α.Ε. &bull; Τεχνική Εταιρεία
            </p>
            <p style="margin:0;color:rgba(245,243,238,0.3);font-size:11px;">
              Ηγουμενίτσα, Θεσπρωτία &bull; alkater.ae@gmail.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
