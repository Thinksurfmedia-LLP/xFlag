import fs from 'fs';
import path from 'path';
import type { Attachment } from '@/lib/mailer';

const LOGO_PATH = path.join(process.cwd(), 'public', 'assets', 'images', 'logo2.png');
const LOGO_CID = 'xflag-logo';

// Gmail (and several other webmail clients) strip/refuse to render
// `<img src="data:...">` base64 images in received mail, and a relative or
// localhost `/assets/...` URL can't be fetched by an email client at all —
// so the logo has to travel as a real inline attachment (Content-ID) that
// the HTML references as `cid:xflag-logo`. This is the one embedding method
// every major mail client actually supports.
function getLogoAttachment(): Attachment | null {
  if (!fs.existsSync(LOGO_PATH)) return null;
  return { filename: 'logo.png', path: LOGO_PATH, cid: LOGO_CID };
}

interface EmailWrapperOptions {
  heading: string;
  bodyHtml: string;
  badge?: string;
}

interface EmailContent {
  html: string;
  attachments: Attachment[];
}

// Shared branded shell for outbound notification emails — dark header band
// + red accent line matching the xflagfootball.com site's color scheme
// (#231F20 background, #F13B26 accent red), white content card for
// readability across email clients. Inline styles throughout since most
// clients strip <style> blocks.
function emailWrapper({ heading, bodyHtml, badge }: EmailWrapperOptions): EmailContent {
  const logoAttachment = getLogoAttachment();
  const html = `
<div style="background:#f4f4f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.08);">
        <div style="background:#231F20;padding:20px 32px;border-bottom:3px solid #F13B26;">
            ${logoAttachment
        ? `<img src="cid:${LOGO_CID}" alt="xFlagFootball" height="28" style="display:block;height:28px;width:auto;" />`
        : `<span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">XFlag<span style="color:#F13B26;">Football</span></span>`
      }
        </div>
        <div style="padding:32px;">
            ${badge ? `<span style="display:inline-block;background:rgba(241,59,38,0.1);color:#F13B26;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:14px;">${badge}</span><br/>` : ''}
            <h1 style="margin:0 0 20px;font-size:22px;color:#231F20;font-weight:800;">${heading}</h1>
            ${bodyHtml}
        </div>
        <div style="background:#f9f9fa;padding:16px 32px;border-top:1px solid #eceef0;">
            <p style="margin:0;font-size:12px;color:#9a9fa8;">Sent automatically from the xflagfootball.com website.</p>
        </div>
    </div>
</div>`;

  return { html, attachments: logoAttachment ? [logoAttachment] : [] };
}

function fieldRow(label: string, value: string | undefined, linkType?: 'email' | 'tel'): string {
  const displayValue = value || 'Not specified';
  const href = linkType === 'email' ? `mailto:${value}` : linkType === 'tel' ? `tel:${value?.replace(/\s/g, '')}` : null;
  const valueHtml = href && value
    ? `<a href="${href}" style="color:#231F20;text-decoration:none;">${displayValue}</a>`
    : displayValue;
  return `
        <tr>
            <td style="padding:12px 0;border-bottom:1px solid #eceef0;">
                <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:#F13B26;margin-bottom:4px;">${label}</span>
                <span style="display:block;font-size:15px;color:#231F20;font-weight:600;white-space:pre-wrap;">${valueHtml}</span>
            </td>
        </tr>`;
}

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

/**
 * Notification email sent to the xFlag Football team when someone submits
 * the site's Contact Us form.
 */
export function contactSubmissionEmail(submission: ContactSubmission): EmailContent {
  const rows = [
    fieldRow('Name', `${submission.firstName} ${submission.lastName}`.trim()),
    fieldRow('Email', submission.email, 'email'),
    fieldRow('Phone', submission.phone, 'tel'),
    ...(submission.company ? [fieldRow('Company', submission.company)] : []),
    fieldRow('Message', submission.message),
  ].join('');

  return emailWrapper({
    badge: 'New Contact Submission',
    heading: `${submission.firstName} Sent You a Message`,
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`,
  });
}

interface RegistrationPayment {
  name: string;
  email: string;
  phone?: string;
  registrationType: 'free-agent' | 'team' | 'payment';
  teamName?: string;
  organizationName?: string;
  leagueName?: string;
  address?: string;
  state?: string;
  note?: string;
  teamPaymentMethod?: 'deposit' | 'playerFees' | null;
  playerCount?: number | null;
  amount: number;
  capturedAmount?: number | null;
  currency?: string;
}

const REGISTRATION_TYPE_LABELS: Record<string, string> = {
  'free-agent': 'Free Agent',
  team: 'Team',
  payment: 'Custom Payment',
};

const REGISTRATION_SUBJECT_LABELS: Record<string, string> = {
  'free-agent': 'Free Agent Registration',
  team: 'Team Registration',
  payment: 'Custom Payment',
};

function formatCurrency(amount: number | null | undefined, currency?: string): string {
  if (amount === null || amount === undefined) return '';
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(amount);
  } catch {
    return `$${Number(amount).toFixed(2)}`;
  }
}

export function registrationSubject(payment: RegistrationPayment): string {
  const typeLabel = REGISTRATION_SUBJECT_LABELS[payment.registrationType] || 'Registration';
  return `XFlag Football | ${payment.organizationName || 'Organization'} - ${typeLabel}`;
}

/**
 * Notification email sent to the xFlag Football team when a captured
 * PayPal payment completes a signup (team or free-agent registration, or a
 * custom payment).
 */
export function registrationEmail(payment: RegistrationPayment): EmailContent {
  // Prefer what PayPal actually captured over the originally-requested
  // amount — that's the number that actually landed, and the capture route
  // already verifies the two match before marking this "captured".
  const amountPaid = payment.capturedAmount ?? payment.amount;

  const rows = [
    fieldRow('Full Name', payment.name),
    fieldRow('Email', payment.email, 'email'),
    fieldRow('Phone', payment.phone, 'tel'),
    fieldRow('Registration Type', REGISTRATION_TYPE_LABELS[payment.registrationType] || payment.registrationType),
    ...(payment.teamName ? [fieldRow('Team Name', payment.teamName)] : []),
    fieldRow('Organization', payment.organizationName),
    ...(payment.leagueName ? [fieldRow('League', payment.leagueName)] : []),
    ...(payment.address ? [fieldRow('Address', payment.address)] : []),
    ...(payment.state ? [fieldRow('State', payment.state)] : []),
    ...(payment.note ? [fieldRow('Note', payment.note)] : []),
    ...(payment.teamPaymentMethod === 'deposit' ? [fieldRow('Payment For', 'Team Deposit')] : []),
    ...(payment.teamPaymentMethod === 'playerFees' ? [fieldRow('Payment For', `Team Fee (${payment.playerCount || 0} players)`)] : []),
    fieldRow('Amount Paid', formatCurrency(amountPaid, payment.currency)),
  ].join('');

  const firstName = (payment.name || '').trim().split(/\s+/)[0] || 'Someone';
  const heading = payment.registrationType === 'free-agent'
    ? `${firstName} Registered for Free Agent`
    : payment.registrationType === 'team'
      ? `${firstName} Registered for Team`
      : `${firstName} Sent You a Custom Payment`;

  return emailWrapper({
    badge: 'New Registration',
    heading,
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`,
  });
}
