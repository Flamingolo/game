import mongoose, { Schema, Document } from 'mongoose';

interface Character extends Document {
  name: string;
  levelId: number;
  progress: Progress;
  stats: Stats;
  gold: number;
  resource: Resource;
  unspentTalentPoints: number;
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

interface Resource {
  maxHealth: number;
  maxMana: number;
  currentHealth: number;
  currentMana: number;
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

const ResourceSchema: Schema = new Schema({
  maxHealth: { type: Number, required: true },
  maxMana: { type: Number, required: true },
  currentHealth: { type: Number, required: true },
  currentMana: { type: Number, required: true },
});

const CharacterSchema: Schema = new Schema({
  name: { type: String, required: true },
  levelId: { type: Number, required: true },
  progress: { type: ProgressSchema, required: true },
  stats: { type: StatsSchema, required: true },
  gold: { type: Number, required: true, default: 0 },
  resource: { type: ResourceSchema, required: true },
  unspentTalentPoints: { type: Number, required: true, default: 1 },
});

const Character = mongoose.model<Character>('Character', CharacterSchema);
export default Character;
