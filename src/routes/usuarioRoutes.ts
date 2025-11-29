import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";

const router = Router();
const authController = new UsuarioController();

router.post("/cadastro", authController.cadastrar);
router.post("/login", authController.login);

export default router;
