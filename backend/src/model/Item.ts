import mongoose, { Schema, Document } from 'mongoose';

interface Item extends Document {
  name: string;
  dropChance: number;
  value: number;
  type: Item;
}

type Type = 'equipable' | 'consumable';

const itemSchema = new Schema<Item>({
  name: { type: String, required: true },
  dropChance: { type: Number, required: true },
  value: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['equipable', 'consumable'],
    required: true 
  },
});

const ItemModel = mongoose.model<Item>('Item', itemSchema);

export default ItemModel;
