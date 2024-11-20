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
import ResourceRegenerationJob from './jobs/ResourceRegenerationJob';
import jwtMiddleware from './utility/jwtMiddleware';
import { executeChangelog } from './utility/changelogHelper';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.use('/api', jwtMiddleware, characterRouter);
app.use('/api', jwtMiddleware, itemouter);
app.use('/api', userRouter);
app.use('/api', jwtMiddleware, mobRouter);
app.use('/api', jwtMiddleware, dungeonRouter);
app.use('/api', jwtMiddleware, inventoryRouter);
app.use('/api', jwtMiddleware, roomRouter);
app.use('/api', jwtMiddleware, encounterRouter);
app.use('/api', jwtMiddleware, locationRouter);
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

    const db = mongoose.connection.db as any;
    const changelogs = [
      require('../changelog/001-initial-setup'),
      require('../changelog/002-level-initiation'),
      require('../changelog/003-dungeon-initiation'),
      require('../changelog/004-mob-initiation'),
      require('../changelog/005-item-initiation'),
      require('../changelog/006-vendor-initiation')
    ];

    for (const changelog of changelogs) {
      await executeChangelog(db, changelog);
    }
  })
  .catch(err => {
    console.error(`Error connecting to MongoDB ${mongoUri}`, err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript!');
});

const resourceRegenerationJob = new ResourceRegenerationJob();
resourceRegenerationJob.run();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
