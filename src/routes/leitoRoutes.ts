import { Router } from "express";
import { LeitoController } from "../controllers/leitoController";

const router = Router();
const leitoController = new LeitoController();

router.put("/:id/patologia", leitoController.atualizarPatologia);
router.put("/:id/status", leitoController.atualizarStatus);
router.get("/leito", leitoController.list);


export default router;
