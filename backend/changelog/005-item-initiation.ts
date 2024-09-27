import { Db } from 'mongodb';

export async function up(db: Db) {
  // await db.collection('items').insertMany([
  //   { id: 1, name: 'Sword of Testing', dropChance: 10, value: 100, type: 'equipable' },
  //   { id: 2, name: 'Shield of Testing', dropChance: 15, value: 150, type: 'equipable' },
  //   { id: 3, name: 'Potion of Testing', dropChance: 20, value: 50, type: 'consumable' },
  //   { id: 4, name: 'Helmet of Testing', dropChance: 5, value: 200, type: 'equipable' },
  //   { id: 5, name: 'Boots of Testing', dropChance: 8, value: 80, type: 'equipable' },
  // ]);
}

export async function down(db: Db) {
  // await db.collection('items').deleteMany({
  //   id: { $in: [1, 2, 3, 4, 5] }
  // });
}
