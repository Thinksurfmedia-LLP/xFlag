'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const REDIRECT_SECONDS = 5;

interface SignupThankYouProps {
  name: string;
  orgName?: string;
  logo?: string;
}

/**
 * Full-page confirmation shown in place of the checkout form once payment
 * succeeds. Counts down and redirects home on its own; "Go now" is there
 * for anyone who doesn't want to wait it out.
 */
export default function SignupThankYou({ name, orgName, logo }: SignupThankYouProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push('/');
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#14100f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <img
        src={logo || '/assets/images/logo2.png'}
        alt={orgName || 'XFlag Football'}
        style={{ height: '56px', marginBottom: '36px' }}
      />
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(34,197,94,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <i className="fa-solid fa-check" style={{ fontSize: '32px', color: '#22c55e' }}></i>
      </div>
      <h1
        style={{
          fontFamily: '"Anton", sans-serif',
          fontWeight: 700,
          fontSize: '36px',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: '#fff',
          margin: '0 0 12px',
        }}
      >
        Thank You{name ? `, ${name}` : ''}!
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', maxWidth: '480px', margin: '0 0 32px' }}>
        Your payment went through{orgName ? ` for ${orgName}` : ''} — we&apos;ll be in touch to confirm your spot.
      </p>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '0 0 8px' }}>
        Redirecting you home in {secondsLeft}s...
      </p>
      <Link href="/" style={{ color: '#F13B26', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
        Go now
      </Link>
    </div>
  );
}
