import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { contactSubmissionEmail } from '@/lib/emailTemplates';

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

    const { html, attachments } = contactSubmissionEmail({ firstName, lastName, email, phone, company, message });

    await sendMail({
      to: process.env.CONTACT_NOTIFY_EMAIL || process.env.GMAIL_USER || '',
      replyTo: email,
      subject: 'XFlagFootball - Contact Submission',
      html,
      attachments,
      text: `New Website Query\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n${company ? `Company: ${company}\n` : ''}Message: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
