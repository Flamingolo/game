import mongoose, { Schema, Document } from 'mongoose';

interface Vendor extends Document {
  name: string;
  itemIds: mongoose.Schema.Types.ObjectId[] | null;
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  itemIds: { type: [mongoose.Schema.Types.ObjectId], default: null },
});

const Vendor = mongoose.model<Vendor>('Vendor', VendorSchema);
export default Vendor;
