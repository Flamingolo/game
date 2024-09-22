import mongoose, { Schema, Document } from 'mongoose';

interface Room extends Document {
  characterId: mongoose.Schema.Types.ObjectId;
  dungeonId: mongoose.Schema.Types.ObjectId;
  mobId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
}

const RoomSchema: Schema = new Schema({
  characterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Character' },
  dungeonId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Dungeon' },
  mobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mob' },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' },
});

const Room = mongoose.model<Room>('Room', RoomSchema);
export default Room;
