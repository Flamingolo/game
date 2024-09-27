import { Db } from 'mongodb';

export async function up(db: Db) {
  // await db.createCollection('levels');
  // await db.createCollection('dungeons');
  // await db.createCollection('mobs');
  // await db.createCollection('items');
}

export async function down(db: Db) {
  // await db.collection('levels').drop();
  // await db.collection('dungeons').drop();
  // await db.collection('mobs').drop();
  // await db.collection('items').drop();
}
