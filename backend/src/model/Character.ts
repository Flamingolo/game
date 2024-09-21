import mongoose, { Schema, Document } from 'mongoose';

interface Character extends Document {
  id: number;
  name: string;
  levelId: number;
  progress: Progress;
  stats: Stats;
  gold: number;
}

interface Progress {
    experience: number;
    level: number;
}
  
interface Stats {
    strength: number;
    dexterity: number;
    intellect: number;
    luck: number;
}

const ProgressSchema: Schema = new Schema({
  experience: { type: Number, required: true },
  level: { type: Number, required: true },
});

const StatsSchema: Schema = new Schema({
  strength: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  intellect: { type: Number, required: true },
  luck: { type: Number, required: true },
});

const CharacterSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  levelId: { type: Number, required: true },
  progress: { type: ProgressSchema, required: true },
  stats: { type: StatsSchema, required: true },
  gold: { type: Number, required: true, default: 0 },
});

const Character = mongoose.model<Character>('Character', CharacterSchema);
export default Character;
