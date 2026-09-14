// Pure, dependency-free amount validation for the signup/custom-payment
// flow.

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 5000;

export type AmountResult = { ok: true; value: number } | { ok: false; error: string };

/** Validate a user-submitted payment amount. */
export function normalizeAmount(input: unknown): AmountResult {
  if (input === null || input === undefined || input === '') {
    return { ok: false, error: 'Amount is required' };
  }

  const value = typeof input === 'string' ? Number(input.trim()) : (input as number);

  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    return { ok: false, error: 'Amount must be a valid number' };
  }

  // Reject more than 2 decimal places (e.g. 12.345) instead of silently
  // rounding — rounding money without the caller asking for it hides the
  // fact their input didn't mean what they typed.
  const rounded = Math.round(value * 100) / 100;
  if (Math.abs(rounded - value) > Number.EPSILON) {
    return { ok: false, error: 'Amount can have at most 2 decimal places' };
  }

  if (rounded < MIN_AMOUNT) {
    return { ok: false, error: `Amount must be at least $${MIN_AMOUNT.toFixed(2)}` };
  }

  if (rounded > MAX_AMOUNT) {
    return { ok: false, error: `Amount cannot exceed $${MAX_AMOUNT.toFixed(2)}` };
  }

  return { ok: true, value: rounded };
}

export { MIN_AMOUNT, MAX_AMOUNT };
