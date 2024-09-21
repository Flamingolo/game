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
exports.getCharacter = exports.createCharacter = void 0;
const Character_1 = __importDefault(require("../model/Character"));
const Level_1 = __importDefault(require("../model/Level"));
const createCharacter = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const levelOne = yield Level_1.default.findOne({ id: 1 });
    if (!levelOne) {
        throw new Error('Level 1 does not exist. Initialize levels first.');
    }
    const defaultStats = {
        strength: 1,
        dexterity: 1,
        intellect: 1,
        luck: 1,
    };
    const defaultProgress = {
        experience: 0,
        level: 1,
    };
    const newCharacter = new Character_1.default({
        id: Date.now(),
        name: name,
        levelId: levelOne.id,
        progress: defaultProgress,
        stats: defaultStats,
        gold: 0,
    });
    yield newCharacter.save();
    return newCharacter;
});
exports.createCharacter = createCharacter;
const getCharacter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const character = yield Character_1.default.findById(id).populate('levelId');
        if (!character) {
            throw new Error('Character not found');
        }
        return character;
    }
    catch (error) {
        throw new Error(`Error retrieving character: ${error.message}`);
    }
});
exports.getCharacter = getCharacter;
