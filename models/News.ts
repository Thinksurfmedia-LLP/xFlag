import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  image: string;
  date: Date;
  excerpt: string;
  content: string;
  author: string;
}

const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'XFLAGFOOTBALL' }
}, {
  timestamps: true,
});

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
