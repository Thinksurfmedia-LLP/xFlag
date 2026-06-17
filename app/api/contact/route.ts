import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload;
    const { firstName, lastName, email, phone, company, message } = body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"xFlag Football Website" <${process.env.SMTP_USER}>`,
      to: 'mzimmerman@xflagfootball.com',
      replyTo: email,
      subject: `Website Query from ${firstName} ${lastName}`,
      html: `
        <h2>New Website Query</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${firstName} ${lastName}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ''}
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
