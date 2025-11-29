"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const esperaController_1 = require("../controllers/esperaController");
const router = (0, express_1.Router)();
const pessoaEsperaController = new esperaController_1.PessoaEsperaController();
router.put("/espera/:id", pessoaEsperaController.update);
router.get("/espera", pessoaEsperaController.list);
exports.default = router;
