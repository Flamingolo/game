import { Db } from 'mongodb';

export async function up(db: Db) {
  // Insert predefined mobs into the mobs collection
  // await db.collection('mobs').insertMany([
  //   { id: 1, name: 'Goblin', itemIDs: null, levelID: 1, goldDrop: { min: 1, max: 5 }, resource: { health: 50, mana: 20 }, strength: 1, dexterity: 1, intellect: 1, baseDamage: 1, armor: 1 },
  //   { id: 2, name: 'Goblin Scout', itemIDs: null, levelID: 2, goldDrop: { min: 2, max: 6 }, resource: { health: 55, mana: 25 }, strength: 2, dexterity: 2, intellect: 2, baseDamage: 2, armor: 2 },
  //   { id: 3, name: 'Goblin Shaman', itemIDs: null, levelID: 3, goldDrop: { min: 3, max: 7 }, resource: { health: 60, mana: 30 }, strength: 3, dexterity: 3, intellect: 3, baseDamage: 3, armor: 3 },
  //   { id: 4, name: 'Goblin Grunt', itemIDs: null, levelID: 4, goldDrop: { min: 4, max: 8 }, resource: { health: 65, mana: 35 }, strength: 4, dexterity: 4, intellect: 4, baseDamage: 4, armor: 4 },
  //   { id: 5, name: 'Hobgoblin', itemIDs: null, levelID: 5, goldDrop: { min: 5, max: 9 }, resource: { health: 70, mana: 40 }, strength: 5, dexterity: 5, intellect: 5, baseDamage: 5, armor: 5 },
  // ]);
}

export async function down(db: Db) {
  // Remove predefined mobs from the mobs collection
  // await db.collection('mobs').deleteMany({
  //   id: { $in: [1, 2, 3, 4, 5] }
  // });
}
