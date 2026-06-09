import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  logo: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  rank: number;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 }
}, {
  timestamps: true,
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
