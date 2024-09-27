import { Db } from 'mongodb';

export async function up(db: Db) {
  // Insert predefined dungeons into the dungeons collection
  // await db.collection('dungeons').insertMany([
  //   { id: 1, name: 'Goblin Cave', roomAmount: 3, experience: 50, endBossId: null },
  //   { id: 2, name: 'Spider Nest', roomAmount: 4, experience: 75, endBossId: null },
  //   { id: 3, name: 'Haunted Crypt', roomAmount: 5, experience: 100, endBossId: null },
  // ]);
}

export async function down(db: Db) {
  // Remove predefined dungeons from the dungeons collection
  // await db.collection('dungeons').deleteMany({
  //   id: { $in: [1, 2, 3] }
  // });
}
