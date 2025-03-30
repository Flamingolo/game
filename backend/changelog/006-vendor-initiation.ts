import { Db } from 'mongodb';

export async function up(db: Db) {
  await db.createCollection('vendors');
}

export async function down(db: Db) {
  await db.collection('vendors').drop();
}
