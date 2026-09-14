import type { Metadata } from 'next';
import SignupCheckout, { type SignupLeague, type SignupOrganization } from '@/components/signup/SignupCheckout';
import { getLiveOrganization, getLiveSignupLeagues } from '@/lib/flagmag';

export const metadata: Metadata = {
  title: 'Register | XFlag Football',
  description: 'Sign up as a free agent, register a team, or make a custom payment with xflagfootball.',
};

// Registration for xflagfootball only — this page has no ?org= param
// (unlike flagmag's shared /signup route) since every visitor here is
// registering with this one organization.
export default async function SignupPage() {
  const [organization, leagues] = await Promise.all([
    getLiveOrganization() as Promise<SignupOrganization | null>,
    getLiveSignupLeagues() as Promise<SignupLeague[]>,
  ]);

  return <SignupCheckout organization={organization} leagues={leagues || []} />;
}
