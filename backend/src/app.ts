import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import levelServiceInstance from './service/levelService';
import characterRouter from './router/characterRouter';
import itemouter from './router/itemRouter';
import { clearDatabase } from './utility/dbHelper';
import itemServiceInstance from './service/itemService';
import userRouter from './router/userRouter';
import mobServiceInstance from './service/mobService';
import mobRouter from './router/mobRouter';
import dungeonRouter from './router/dungeonRouter';
import dungeonServiceInstance from './service/dungeonService';
import inventoryRouter from './router/inventoryRouter';
import roomRouter from './router/roomRouter';
import encounterRouter from './router/encounterRouter';
import locationRouter from './router/locationRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.use('/api', characterRouter);
app.use('/api', itemouter);
app.use('/api', userRouter);
app.use('/api', mobRouter);
app.use('/api', dungeonRouter);
app.use('/api', inventoryRouter);
app.use('/api', roomRouter);
app.use('/api', encounterRouter);
app.use('/api', locationRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB');
    await clearDatabase();
    levelServiceInstance.createPredefinedLevels();
    itemServiceInstance.generateRandomItems();
    mobServiceInstance.saveGeneratedMobsToDatabase();
    dungeonServiceInstance.saveGeneratedDungeonsToDatabase();
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
