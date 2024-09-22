import Item from '../model/Item';
import mongoose from 'mongoose';

const generateRandomItem = (id: number): any => {
    const itemTypes: Array<'equipable' | 'consumable'> = ['equipable', 'consumable'];
    const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];

    return {
        name: `Random Item ${id}`,
        dropChance: Math.floor(Math.random() * 100),
        value: Math.floor(Math.random() * 200),
        type: randomType,
    };
};

class ItemService {

    generateRandomItems() {
        const items = Array.from({ length: 20 }, (_, index) => generateRandomItem(index + 1));

        try {
            Item.insertMany(items);
            console.log('20 random items generated and saved to the database.');
        } catch (error) {
            console.error(`Error generating items: ${error.message}`);
        }
    }

    async getItem(id: string) {
        try {
            const item = await Item.findById(new mongoose.Types.ObjectId(id));
            if (!item) {
                throw new Error('Item not found');
            }
            return item;
        } catch (error) {
            console.error(`Error retrieving item by ID: ${error.message}`);
            throw error;
        }
    }

    async getRandomItem() {
        try {
            const count = await Item.countDocuments();
            const random = Math.floor(Math.random() * count);
            const item = await Item.findOne().skip(random);
            return item;
        } catch (error) {
            console.error(`Error retrieving random item: ${error.message}`);
            throw error;
        }
    }
}

const itemServiceInstance = new ItemService();
export default itemServiceInstance;
