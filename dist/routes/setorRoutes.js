"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const setorController_1 = require("../controllers/setorController");
const router = (0, express_1.Router)();
const setorController = new setorController_1.SetorController();
router.post("/setor", setorController.create);
router.get("/setor", setorController.listarNomes);
exports.default = router;
