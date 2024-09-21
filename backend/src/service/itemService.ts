import Item from '../model/Item';

const generateRandomItem = (id: number): any => {
  const itemTypes: Array<'equipable' | 'consumable'> = ['equipable', 'consumable'];
  const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
  
  return {
    id,
    name: `Random Item ${id}`,
    dropChance: Math.floor(Math.random() * 100),
    value: Math.floor(Math.random() * 200),
    type: randomType,
  };
};

class ItemService {

  static generateRandomItems() {
    const items = Array.from({ length: 20 }, (_, index) => generateRandomItem(index + 1));
    
    try {
      Item.insertMany(items);
      console.log('20 random items generated and saved to the database.');
    } catch (error) {
      console.error(`Error generating items: ${error.message}`);
    }
  }

  static getItem(id: number) {
    try {
      const item = Item.findOne({ id });
      if (!item) {
        throw new Error('Item not found');
      }
      return item;
    } catch (error) {
      console.error(`Error retrieving item by ID: ${error.message}`);
      throw error;
    }
  }
}

export default ItemService;
