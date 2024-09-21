import mongoose, { Schema, Document } from 'mongoose';

interface Level extends Document {
  id: number;
  expToLevel: number;
}

const LevelSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  expToLevel: { type: Number, required: true },
});

const Level = mongoose.model<Level>('Level', LevelSchema);
export default Level;
