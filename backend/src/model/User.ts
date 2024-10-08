import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  id: number;
  email: string;
  password: string;
  created: Date;
  deleted: Date | null;
}

const UserSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now },
  deleted: { type: Date, default: null },
});

const User = mongoose.model<User>('User', UserSchema);
export default User;
