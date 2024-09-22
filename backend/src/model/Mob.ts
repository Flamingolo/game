import mongoose, { Schema, Document } from 'mongoose';

interface GoldDrop {
  min: number;
  max: number;
}

interface Resource {
  health: number;
  mana: number;
}

interface Mob extends Document {
  id: number;
  name: string;
  itemIDs: number[] | null;
  levelID: number;
  goldDrop: GoldDrop;
  resource: Resource;
}

const GoldDropSchema: Schema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
});

const ResourceSchema: Schema = new Schema({
  health: { type: Number, required: true },
  mana: { type: Number, required: true },
});

const MobSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  itemIDs: { type: [Number], default: null },
  levelID: { type: Number, required: true },
  goldDrop: { type: GoldDropSchema, required: true },
  resource: { type: ResourceSchema, required: true },
});

const Mob = mongoose.model<Mob>('Mob', MobSchema);
export default Mob;
