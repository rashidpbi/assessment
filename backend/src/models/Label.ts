import mongoose, { Schema, Document } from 'mongoose';

export interface ILabelUsage {
  page: string;
  component: string;
}

export interface ILabel extends Document {
  key: string;
  text: string;
  usages: ILabelUsage[];
}

const LabelSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  usages: [{
    page: { type: String, required: true },
    component: { type: String, required: true }
  }]
});

export default mongoose.model<ILabel>('Label', LabelSchema);
