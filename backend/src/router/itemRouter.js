"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = __importDefault(require("../controller/itemController"));
const router = (0, express_1.Router)();
router.get('/item/:id', itemController_1.default.getItem);
exports.default = router;
