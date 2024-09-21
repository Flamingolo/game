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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCharacter = exports.addCharacter = void 0;
const characterService_1 = require("../service/characterService");
const addCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const character = yield (0, characterService_1.createCharacter)(name);
        res.status(201).json(character);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create character', message: error.message });
    }
});
exports.addCharacter = addCharacter;
const fetchCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const character = yield (0, characterService_1.getCharacter)(id);
        res.status(200).json(character);
    }
    catch (error) {
        res.status(404).json({ error: 'Character not found', message: error.message });
    }
});
exports.fetchCharacter = fetchCharacter;
