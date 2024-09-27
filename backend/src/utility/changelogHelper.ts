import { Db } from 'mongodb';

export async function executeChangelog(db: Db, changelog: any) {
  console.log("executing changelog");
  const changelogCollection = db.collection('changelog');
  const changelogEntry = await changelogCollection.findOne({ name: changelog.name });

  if (!changelogEntry) {
    await changelog.up(db);
    await changelogCollection.insertOne({ name: changelog.name, executedAt: new Date() });
  }
}

export async function rollbackChangelog(db: Db, changelog: any) {
  console.log("rolling back changelog");
  const changelogCollection = db.collection('changelog');
  const changelogEntry = await changelogCollection.findOne({ name: changelog.name });

  if (changelogEntry) {
    await changelog.down(db);
    await changelogCollection.deleteOne({ name: changelog.name });
  }
}
