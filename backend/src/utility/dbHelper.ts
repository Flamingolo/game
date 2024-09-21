import mongoose from 'mongoose';

export const clearDatabase = async () => {
  const connection = mongoose.connection;

  if (connection.readyState === 0) {
    throw new Error('Database connection not established');
  }

  const collections = connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  console.log('Database cleared.');
};
