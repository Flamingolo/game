import mongoose, { Schema, Document } from 'mongoose';

interface Dungeon extends Document {
  name: string;
  roomAmount: number;
  experience: number;
  endBossId: mongoose.Schema.Types.ObjectId | null;
  minMobLevel: number;
  maxMobLevel: number;
}

const DungeonSchema: Schema = new Schema({
  name: { type: String, required: true },
  roomAmount: { type: Number, required: true, min: 3, max: 5 },
  experience: { type: Number, required: true, min: 10, max: 200 },
  endBossId: { type: mongoose.Schema.Types.ObjectId, default: null },
  minMobLevel: { type: Number, required: true },
  maxMobLevel: { type: Number, required: true },
});

const Dungeon = mongoose.model<Dungeon>('Dungeon', DungeonSchema);
export default Dungeon;
