import itemServiceInstance from '../../src/service/itemService';
import Item from '../../src/model/Item';
import mongoose from 'mongoose';

describe('Item Service', () => {
  describe('generateRandomItems', () => {
    it('should generate and save 20 random items to the database', async () => {
      jest.spyOn(Item, 'insertMany').mockImplementation(() => Promise.resolve());

      itemServiceInstance.generateRandomItems();

      expect(Item.insertMany).toHaveBeenCalledTimes(1);
      expect(Item.insertMany).toHaveBeenCalledWith(expect.any(Array));
      expect(Item.insertMany.mock.calls[0][0].length).toBe(20);
    });

    it('should log an error if generating items fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(Item, 'insertMany').mockImplementation(() => Promise.reject(new Error('Failed to save items')));

      itemServiceInstance.generateRandomItems();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating items: Failed to save items');
    });
  });

  describe('getItem', () => {
    it('should retrieve an item by id', async () => {
      const item = new Item({
        name: 'Test Item',
        dropChance: 50,
        value: 100,
        type: 'equipable',
      });
      await item.save();

      const retrievedItem = await itemServiceInstance.getItem(item._id);

      expect(retrievedItem).toHaveProperty('name', 'Test Item');
      expect(retrievedItem).toHaveProperty('dropChance', 50);
      expect(retrievedItem).toHaveProperty('value', 100);
      expect(retrievedItem).toHaveProperty('type', 'equipable');
    });

    it('should throw an error if item is not found', async () => {
      await expect(itemServiceInstance.getItem('invalid-id')).rejects.toThrow('Item not found');
    });
  });

  describe('getRandomItem', () => {
    it('should retrieve a random item from the database', async () => {
      const items = [
        { name: 'Item 1', dropChance: 10, value: 50, type: 'equipable' },
        { name: 'Item 2', dropChance: 20, value: 100, type: 'consumable' },
        { name: 'Item 3', dropChance: 30, value: 150, type: 'equipable' },
      ];
      await Item.insertMany(items);

      const randomItem = await itemServiceInstance.getRandomItem();

      expect(randomItem).toHaveProperty('name');
      expect(randomItem).toHaveProperty('dropChance');
      expect(randomItem).toHaveProperty('value');
      expect(randomItem).toHaveProperty('type');
    });

    it('should throw an error if there is an issue retrieving a random item', async () => {
      jest.spyOn(Item, 'countDocuments').mockImplementation(() => Promise.reject(new Error('Failed to count documents')));

      await expect(itemServiceInstance.getRandomItem()).rejects.toThrow('Error retrieving random item: Failed to count documents');
    });
  });
});
