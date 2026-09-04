import nodemailer, { type SendMailOptions as NodemailerSendMailOptions } from 'nodemailer';

// nodemailer's own types don't re-export `Attachment` at the package root
// (it only lives on the `Mail` import-equals namespace) — derive it from
// the one place it's actually reachable instead of importing a path that
// doesn't resolve.
export type Attachment = NonNullable<NodemailerSendMailOptions['attachments']>[number];

let cachedTransporter: nodemailer.Transporter | null = null;

/**
 * Lazily builds (and caches) the Gmail SMTP transporter. Reused across
 * calls in the same server process instead of reconnecting per email.
 */
function getTransporter(): nodemailer.Transporter {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('GMAIL_USER / GMAIL_APP_PASSWORD are not configured');
  }

  cachedTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
  return cachedTransporter;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Attachment[];
}

/** Sends an email via the shared Gmail sender. */
export async function sendMail({ to, subject, html, text, replyTo, attachments }: SendEmailOptions): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"xFlag Football" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments?.length ? { attachments } : {}),
  });
}
