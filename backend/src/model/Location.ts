import mongoose, { Schema, Document } from 'mongoose';

interface Location extends Document {
  CharacterId: mongoose.Schema.Types.ObjectId;
  LocationId: mongoose.Schema.Types.ObjectId;
}

const LocationSchema: Schema = new Schema({
  CharacterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Character' },
  LocationId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Location = mongoose.model<Location>('Location', LocationSchema);
export default Location;
