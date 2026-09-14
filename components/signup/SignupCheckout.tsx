'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SearchableSelect, { type SelectOption } from '@/components/SearchableSelect';
import PayPalCheckout from '@/components/payments/PayPalCheckout';
import SignupThankYou from '@/components/signup/SignupThankYou';

export interface SignupLocation {
  stateAbbr?: string;
  stateName?: string;
}

export interface SignupOrganization {
  _id: string;
  name: string;
  logo?: string;
  locations?: SignupLocation[];
}

export interface SignupLeague {
  _id: string;
  name: string;
  playerFee?: number;
  teamDeposit?: number;
  states?: string[];
}

interface SignupCheckoutProps {
  organization: SignupOrganization | null;
  leagues: SignupLeague[];
}

const ROW_2COL = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' } as const;
const FIELD_LABEL_STYLE = { display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' } as const;

const REGISTRATION_TYPES = [
  { value: 'free-agent', label: 'Free Agent' },
  { value: 'team', label: 'Team' },
  { value: 'payment', label: 'Custom Payment' },
] as const;

type RegistrationType = (typeof REGISTRATION_TYPES)[number]['value'];
type TeamPaymentMethod = 'deposit' | 'playerFees';

function currency(amount: number | undefined): string {
  return `$${Number(amount || 0).toFixed(2)}`;
}

// Red outline + glow for a field that failed validation on the last Pay Now
// attempt — matches SearchableSelect's own `error` look so a plain <input>
// next to a dropdown reads as the same kind of invalid.
function invalidStyle(isInvalid: boolean) {
  return isInvalid ? { borderColor: '#F13B26', boxShadow: '0 0 0 3px rgba(241,59,38,0.12)' } : {};
}

// Shared look for every radio-as-pill group on this form (registration
// type, team payment method) so they read as one design language.
function radioPillStyle(active: boolean) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    background: active ? 'rgba(241,59,38,0.12)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${active ? '#F13B26' : 'rgba(255,255,255,0.14)'}`,
    transition: 'background 0.2s, border-color 0.2s',
  };
}

const ORG_SLUG = 'xflagfootball';

/**
 * Single-page, split checkout for xflagfootball — one form covering all
 * three registration types (Free Agent / Team / Custom Payment) on the
 * left, a sticky order summary with the live price breakdown and Pay Now
 * action on the right. Ported from flagmag's /signup?org=xflagfootball
 * checkout, but scoped to this one organization only (no org picker, no
 * ?org= param — every visitor here is registering with xflagfootball).
 */
export default function SignupCheckout({ organization, leagues }: SignupCheckoutProps) {
  const [registrationType, setRegistrationType] = useState<RegistrationType>('free-agent');
  const [leagueId, setLeagueId] = useState('');
  const [state, setState] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    teamName: '',
    playerCount: '',
    amount: '',
  });
  // How a team pays: the flat team deposit set on the league, or the sum
  // of per-player fees (which must cover at least the deposit).
  const [teamPaymentMethod, setTeamPaymentMethod] = useState<TeamPaymentMethod>('deposit');
  const [error, setError] = useState('');
  // Field-level red outlines only turn on after a failed Pay Now attempt —
  // no point flagging blank required fields before the visitor has tried.
  const [showErrors, setShowErrors] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const orgStatus: 'ready' | 'error' = organization ? 'ready' : 'error';

  // Only the states the org actually operates in — pulled off its
  // configured locations instead of the full 50-state list.
  const stateOptions: SelectOption[] = useMemo(() => {
    const seen = new Map<string, string>();
    for (const loc of organization?.locations || []) {
      if (loc.stateAbbr && !seen.has(loc.stateAbbr)) {
        seen.set(loc.stateAbbr, loc.stateName || loc.stateAbbr);
      }
    }
    return [...seen.entries()].map(([abbr, name]) => ({ value: abbr, label: name }));
  }, [organization]);

  // Leagues are scoped to whichever state is picked — a league only shows
  // up once a state is selected, and only if it runs there.
  const stateLeagues = useMemo(
    () => (state ? leagues.filter((l) => (l.states || []).includes(state)) : []),
    [leagues, state]
  );
  const leagueOptions: SelectOption[] = stateLeagues.map((l) => ({ value: l._id, label: l.name }));
  const leaguePlaceholder = !state
    ? 'Select a state first'
    : stateLeagues.length === 0
      ? 'No leagues in this state'
      : 'Select a league';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const selectedLeague = useMemo(
    () => leagues.find((l) => l._id === leagueId) || null,
    [leagues, leagueId]
  );

  const teamDepositAmount = selectedLeague?.teamDeposit || 0;
  const playerCountNum = Number(form.playerCount) || 0;
  const playerFeesTotal = playerCountNum * (selectedLeague?.playerFee || 0);
  // The Team Fee (player count × per-player fee, set by the registrar at
  // payment time) has to come out strictly ABOVE the flat deposit — paying
  // exactly the deposit amount this way defeats the point of offering the
  // per-player option at all.
  const playerFeesShortfall = teamPaymentMethod === 'playerFees' && playerFeesTotal <= teamDepositAmount;

  const lineItems = useMemo(() => {
    if (registrationType === 'free-agent') {
      return [{ label: 'Free Agent / Player Fee', amount: selectedLeague?.playerFee || 0 }];
    }
    if (registrationType === 'team') {
      const primary = teamPaymentMethod === 'playerFees'
        ? { label: `Team Fee (${playerCountNum || 0} players)`, amount: playerFeesTotal }
        : { label: 'Team Deposit', amount: teamDepositAmount };
      return [primary];
    }
    return [{ label: 'Custom Payment', amount: Number(form.amount) || 0 }];
  }, [registrationType, selectedLeague, form.amount, teamPaymentMethod, playerCountNum, playerFeesTotal, teamDepositAmount]);

  const total = lineItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const requiredFilled = Boolean(
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    state &&
    (registrationType !== 'payment' || (form.notes.trim() && Number(form.amount) > 0)) &&
    (registrationType !== 'team' || (
      form.teamName.trim() &&
      (teamPaymentMethod !== 'playerFees' || (playerCountNum > 0 && !playerFeesShortfall))
    ))
  );

  // Which individual fields to outline red — only meaningful once
  // showErrors is on (see handlePayNow).
  const fieldInvalid = {
    firstName: showErrors && !form.firstName.trim(),
    lastName: showErrors && !form.lastName.trim(),
    email: showErrors && !form.email.trim(),
    phone: showErrors && !form.phone.trim(),
    address: showErrors && !form.address.trim(),
    state: showErrors && !state,
    teamName: showErrors && registrationType === 'team' && !form.teamName.trim(),
    playerCount: showErrors && registrationType === 'team' && teamPaymentMethod === 'playerFees' && (playerCountNum <= 0 || playerFeesShortfall),
    amount: showErrors && registrationType === 'payment' && !(Number(form.amount) > 0),
    notes: showErrors && registrationType === 'payment' && !form.notes.trim(),
  };

  // The reason PayPal shows the buyer / support sees on the transaction.
  // The Comments field is only mandatory for Custom Payment — free agent
  // and team registrations still need *some* reason on the PayPal order,
  // so fall back to one built from context when the buyer left it blank.
  const paypalNote = form.notes.trim() || (
    registrationType === 'team'
      ? `Team registration — ${form.teamName || 'unnamed team'}${selectedLeague ? ` (${selectedLeague.name})` : ''}`
      : `Free agent registration${selectedLeague ? ` — ${selectedLeague.name}` : ''}`
  );

  // Clicking through with something missing just reveals the field-level
  // red outlines (see fieldInvalid) — once requiredFilled is true, this
  // button is swapped out for the real PayPal Buttons below.
  const handlePayNow = () => {
    if (!organization) { setError("Couldn't reach xflagfootball right now — please try again shortly."); return; }
    setShowErrors(true);
  };

  if (confirmed) {
    return <SignupThankYou name={form.firstName} orgName={organization?.name} logo={organization?.logo} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#14100f',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal checkout top bar — brand mark only, centered, no full site
          nav, so nothing pulls attention away mid-checkout. */}
      <div
        style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link href="/" style={{ display: 'inline-flex' }}>
          <img
            src={orgStatus === 'ready' && organization?.logo ? organization.logo : '/assets/images/logo2.png'}
            alt={orgStatus === 'ready' && organization?.name ? organization.name : 'XFlag Football'}
            style={{ height: '56px' }}
          />
        </Link>
      </div>
      {/* Thin brand stripe nodding to the logo's red flag mark, instead of
          reusing the blurred hero photo — keeps a checkout page this
          streamlined from reading as a bare gray form. */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #F13B26 0%, #F13B26 100%)' }} />

      <div style={{ flex: 1, padding: '40px 24px 80px', display: 'flex', justifyContent: 'center' }}>
        <div className="signup-checkout-grid" style={{ width: '100%', maxWidth: '1180px' }}>
          {/* ── Left: the one form ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h1
                style={{
                  fontFamily: '"Anton", sans-serif',
                  fontWeight: 700,
                  fontSize: '44px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  margin: 0,
                }}
              >
                Register
              </h1>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>
                <i className="fa-solid fa-arrow-left" style={{ marginRight: '6px' }}></i>
                Back
              </Link>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <div className="form-area" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}
                <div style={ROW_2COL}>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name *"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    style={invalidStyle(fieldInvalid.firstName)}
                  />
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name *"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    style={invalidStyle(fieldInvalid.lastName)}
                  />
                </div>
                <div style={ROW_2COL}>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    style={invalidStyle(fieldInvalid.email)}
                  />
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={invalidStyle(fieldInvalid.phone)}
                  />
                </div>

                <textarea
                  name="address"
                  className="form-control"
                  placeholder="Address *"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  required
                  style={invalidStyle(fieldInvalid.address)}
                />

                <div style={ROW_2COL}>
                  <div>
                    <label style={FIELD_LABEL_STYLE}>Organization</label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        minHeight: '40px',
                        padding: '10px 16px',
                        borderRadius: '50px',
                        background: '#16181C',
                        border: '1px solid #312D23',
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '14px',
                      }}
                    >
                      <span>
                        {orgStatus === 'error' ? 'Organization not found' : organization?.name || ''}
                      </span>
                      <i className="fa-solid fa-lock" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}></i>
                    </div>
                  </div>
                  <div>
                    <label style={FIELD_LABEL_STYLE}>State *</label>
                    <SearchableSelect
                      value={state}
                      onChange={setState}
                      options={stateOptions}
                      placeholder={stateOptions.length ? 'Select state' : 'No locations configured'}
                      disabled={!stateOptions.length}
                      error={fieldInvalid.state}
                      dark
                    />
                  </div>
                </div>

                <div>
                  <label style={FIELD_LABEL_STYLE}>League</label>
                  <SearchableSelect
                    value={leagueId}
                    onChange={setLeagueId}
                    options={leagueOptions}
                    placeholder={leaguePlaceholder}
                    disabled={!state || stateLeagues.length === 0}
                    dark
                  />
                </div>

                <div>
                  <label style={FIELD_LABEL_STYLE}>Registering as</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {REGISTRATION_TYPES.map((t) => {
                      const active = registrationType === t.value;
                      return (
                        <label key={t.value} style={radioPillStyle(active)}>
                          <input
                            type="radio"
                            name="registrationType"
                            value={t.value}
                            checked={active}
                            onChange={() => setRegistrationType(t.value)}
                            style={{ accentColor: '#F13B26', width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{t.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {registrationType === 'team' && (
                  <>
                    <div>
                      <label style={FIELD_LABEL_STYLE}>Team Name *</label>
                      <input
                        type="text"
                        name="teamName"
                        className="form-control"
                        placeholder="Team Name *"
                        value={form.teamName}
                        onChange={handleChange}
                        required
                        style={invalidStyle(fieldInvalid.teamName)}
                      />
                    </div>

                    <div>
                      <label style={FIELD_LABEL_STYLE}>How will the team pay?</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {[
                          { value: 'deposit' as const, label: `Team Deposit (${currency(teamDepositAmount)})` },
                          { value: 'playerFees' as const, label: 'Team Fee' },
                        ].map((opt) => {
                          const active = teamPaymentMethod === opt.value;
                          return (
                            <label key={opt.value} style={radioPillStyle(active)}>
                              <input
                                type="radio"
                                name="teamPaymentMethod"
                                value={opt.value}
                                checked={active}
                                onChange={() => setTeamPaymentMethod(opt.value)}
                                style={{ accentColor: '#F13B26', width: '16px', height: '16px', cursor: 'pointer' }}
                              />
                              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {teamPaymentMethod === 'playerFees' && (
                      <div>
                        <label style={FIELD_LABEL_STYLE}>Number of Players *</label>
                        <input
                          type="number"
                          name="playerCount"
                          className="form-control"
                          placeholder="e.g. 12"
                          value={form.playerCount}
                          onChange={handleChange}
                          min="1"
                          step="1"
                          required
                          style={invalidStyle(fieldInvalid.playerCount)}
                        />
                        <div style={{ marginTop: '8px', fontSize: '13px', color: playerFeesShortfall ? '#f87171' : 'rgba(255,255,255,0.5)' }}>
                          {playerFeesShortfall
                            ? `Team Fee must be greater than ${currency(teamDepositAmount)} (the team deposit) — currently ${currency(playerFeesTotal)}.`
                            : `${currency(playerFeesTotal)} total at ${currency(selectedLeague?.playerFee || 0)}/player.`}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {registrationType === 'payment' && (
                  <>
                    <div>
                      <label style={FIELD_LABEL_STYLE}>Team Name</label>
                      <input
                        type="text"
                        name="teamName"
                        className="form-control"
                        placeholder="Team Name (if applicable)"
                        value={form.teamName}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label style={FIELD_LABEL_STYLE}>Amount *</label>
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        placeholder="Enter amount to pay *"
                        value={form.amount}
                        onChange={handleChange}
                        min="1"
                        step="0.01"
                        required
                        style={invalidStyle(fieldInvalid.amount)}
                      />
                    </div>
                  </>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                    paddingTop: '16px',
                    marginTop: '4px',
                  }}
                >
                  <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>Your Total Amount Due Is</span>
                  <span style={{ color: '#F13B26', fontSize: '22px', fontWeight: 700 }}>{currency(total)}</span>
                </div>

                <textarea
                  name="notes"
                  className="form-control"
                  placeholder={
                    registrationType === 'payment'
                      ? 'Comments / Reason for payment *'
                      : 'Any Special Details, Questions, Comments?'
                  }
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  required={registrationType === 'payment'}
                  style={invalidStyle(fieldInvalid.notes)}
                />
              </div>
            </div>
          </div>

          {/* ── Right: order summary + Pay Now ── */}
          <div className="signup-checkout-summary">
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                Registering with
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                {organization?.name || '...'}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {lineItems.map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                    <span>{item.label}</span>
                    <span>{currency(item.amount)}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  marginTop: '16px',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>Total</span>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '24px' }}>{currency(total)}</span>
              </div>

              {requiredFilled ? (
                <div style={{ marginTop: '20px' }}>
                  <PayPalCheckout
                    name={`${form.firstName} ${form.lastName}`.trim()}
                    email={form.email}
                    phone={form.phone}
                    amount={total}
                    note={paypalNote}
                    address={form.address}
                    state={state}
                    teamName={registrationType === 'team' ? form.teamName : ''}
                    organizationSlug={ORG_SLUG}
                    organizationName={organization?.name || ''}
                    organizationId={organization?._id || ''}
                    leagueId={leagueId}
                    leagueName={selectedLeague?.name || ''}
                    registrationType={registrationType}
                    teamPaymentMethod={registrationType === 'team' ? teamPaymentMethod : undefined}
                    playerCount={registrationType === 'team' && teamPaymentMethod === 'playerFees' ? playerCountNum : undefined}
                    onSuccess={() => setConfirmed(true)}
                    onError={(msg) => setError(msg)}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePayNow}
                  style={{
                    width: '100%',
                    marginTop: '20px',
                    borderRadius: '30px',
                    padding: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                  }}
                >
                  <i className="fa-solid fa-lock" style={{ marginRight: '8px' }}></i>
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
