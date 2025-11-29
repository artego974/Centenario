"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
const authController = new usuarioController_1.UsuarioController();
router.post("/cadastro", authController.cadastrar);
router.post("/login", authController.login);
exports.default = router;
