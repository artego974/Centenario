import { Router } from "express";
import { LeitoController } from "../controllers/leitoController";

const router = Router();
const leitoController = new LeitoController();

router.put("/:id/patologia", leitoController.atualizarPatologia);
router.put("/:id/status", leitoController.atualizarStatus);
router.get("/", (req, res) => leitoController.list(req, res));



export default router;
