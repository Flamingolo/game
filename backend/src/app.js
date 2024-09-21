"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env
const app = (0, express_1.default)();
const port = 3000;
const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
mongoose_1.default.connect(mongoUri)
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
    console.log(`${process.env.MONGO_URI}`);
    console.log(`${process.env.MONGO_USERNAME}`);
    console.log(`${process.env.MONGO_PASSWORD}`);
    console.log(`${process.env.MONGO_HOST}`);
    console.log(`${process.env.MONGO_PORT}`);
    console.log('#########');
    console.error(`Error connecting to MongoDB ${mongoUri}`, err);
});
app.get('/', (req, res) => {
    res.send('Hello from TypeScript!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
