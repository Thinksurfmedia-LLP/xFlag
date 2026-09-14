import mongoose, { Schema, type Document, type Model } from 'mongoose';

export type RegistrationType = 'free-agent' | 'team' | 'payment';
export type TeamPaymentMethod = 'deposit' | 'playerFees' | null;
export type PaymentStatus = 'created' | 'captured' | 'failed';

export interface PaymentDoc extends Document {
  name: string;
  email: string;
  phone: string;
  note: string;
  address: string;
  state: string;
  teamName: string;
  // Denormalized labels only — xFlag has no local Organization/League
  // collections (that data lives on flagmag; see lib/flagmag.ts), so these
  // are display-only strings captured at signup time rather than FK refs.
  organizationSlug: string;
  organizationName: string;
  organizationId: string;
  leagueId: string;
  leagueName: string;
  registrationType: RegistrationType;
  teamPaymentMethod: TeamPaymentMethod;
  playerCount: number | null;
  amount: number;
  currency: string;
  provider: string;
  paypalOrderId?: string;
  paypalCaptureId: string;
  capturedAmount: number | null;
  payerEmail: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<PaymentDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    note: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    teamName: { type: String, trim: true, default: '' },
    organizationSlug: { type: String, trim: true, default: '' },
    organizationName: { type: String, trim: true, default: '' },
    organizationId: { type: String, trim: true, default: '' },
    leagueId: { type: String, trim: true, default: '' },
    leagueName: { type: String, trim: true, default: '' },
    registrationType: {
      type: String,
      enum: ['free-agent', 'team', 'payment'],
      default: 'payment',
    },
    teamPaymentMethod: {
      type: String,
      enum: ['deposit', 'playerFees', null],
      default: null,
    },
    playerCount: { type: Number, default: null },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'USD' },
    provider: { type: String, default: 'paypal' },
    paypalOrderId: { type: String, unique: true, sparse: true },
    paypalCaptureId: { type: String, default: '' },
    capturedAmount: { type: Number, default: null },
    payerEmail: { type: String, default: '' },
    status: {
      type: String,
      enum: ['created', 'captured', 'failed'],
      default: 'created',
    },
  },
  { timestamps: true }
);

function getPaymentModel(): Model<PaymentDoc> {
  return (mongoose.models.Payment as Model<PaymentDoc>) || mongoose.model<PaymentDoc>('Payment', PaymentSchema);
}

export default getPaymentModel();
