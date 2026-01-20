import mongoose, { Schema, Document } from 'mongoose';

export interface ISale extends Document {
  date: Date;
  amount: number;
  region: string;
  product: string;
  category: string;
}

const SaleSchema: Schema = new Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  region: { type: String, required: true },
  product: { type: String, required: true },
  category: { type: String, required: true }
});

export default mongoose.model<ISale>('Sale', SaleSchema);
