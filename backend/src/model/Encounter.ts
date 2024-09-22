import mongoose, { Schema, Document } from 'mongoose';

interface Encounter extends Document {
  RoomId: mongoose.Schema.Types.ObjectId;
  CharacterId: mongoose.Schema.Types.ObjectId;
  MobId: mongoose.Schema.Types.ObjectId;
  MobRemainingHealth: number;
  MobRemainingMana: number;
}

const EncounterSchema: Schema = new Schema({
  RoomId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Room' },
  CharacterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Character' },
  MobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mob' },
  MobRemainingHealth: { type: Number, required: true },
  MobRemainingMana: { type: Number, required: true },
});

const Encounter = mongoose.model<Encounter>('Encounter', EncounterSchema);
export default Encounter;
