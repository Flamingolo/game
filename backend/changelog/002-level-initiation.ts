import { Db } from 'mongodb';

export async function up(db: Db) {
  // await db.collection('levels').insertMany([
  //   { id: 1, expToLevel: 100 },
  //   { id: 2, expToLevel: 200 },
  //   { id: 3, expToLevel: 300 },
  //   { id: 4, expToLevel: 400 },
  //   { id: 5, expToLevel: 500 },
  // ]);
}

export async function down(db: Db) {
  // await db.collection('levels').deleteMany({
  //   id: { $in: [1, 2, 3, 4, 5] }
  // });
}
