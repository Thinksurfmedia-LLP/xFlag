import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  date: Date;
  teamA: mongoose.Types.ObjectId;
  teamB: mongoose.Types.ObjectId;
  time: string;
  location: string;
  isCompleted: boolean;
  scoreA: number;
  scoreB: number;
}

const MatchSchema: Schema = new Schema({
  date: { type: Date, required: true },
  teamA: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 }
}, {
  timestamps: true,
});

export default mongoose.models.Match || mongoose.model<IMatch>('Match', MatchSchema);
