import mongoose, { Schema, Document } from 'mongoose';

interface Inventory extends Document {
  characterId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
}

const InventorySchema: Schema = new Schema({
  characterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Character' },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' },
});

const Inventory = mongoose.model<Inventory>('Inventory', InventorySchema);
export default Inventory;
