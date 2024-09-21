"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characterController_1 = require("../controller/characterController");
const router = (0, express_1.Router)();
router.get('/character/:id', characterController_1.fetchCharacter);
router.post('/character', characterController_1.addCharacter);
exports.default = router;
