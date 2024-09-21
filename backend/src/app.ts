import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 3000;

const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`${process.env.MONGO_URI}`);
    console.log(`${process.env.MONGO_USERNAME}`);
    console.log(`${process.env.MONGO_PASSWORD}`);
    console.log(`${process.env.MONGO_HOST}`);
    console.log(`${process.env.MONGO_PORT}`);
    console.log('#########');
    
  })
  .catch(err => {
    console.error(`Error connecting to MongoDB ${mongoUri}`, err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});