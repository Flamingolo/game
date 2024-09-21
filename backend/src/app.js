"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const levelService_1 = require("./service/levelService");
const characterRouter_1 = __importDefault(require("./router/characterRouter"));
const itemRouter_1 = __importDefault(require("./router/itemRouter"));
const dbHelper_1 = require("./utility/dbHelper");
const itemService_1 = __importDefault(require("./service/itemService"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', characterRouter_1.default);
app.use('/api', itemRouter_1.default);
const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
mongoose_1.default.connect(mongoUri)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    yield (0, dbHelper_1.clearDatabase)();
    (0, levelService_1.createPredefinedLevels)();
    itemService_1.default.generateRandomItems();
}))
    .catch(err => {
    console.error(`Error connecting to MongoDB ${mongoUri}`, err);
});
app.get('/', (req, res) => {
    res.send('Hello from TypeScript!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
