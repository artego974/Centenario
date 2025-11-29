import { Router } from "express";
import { SetorController } from "../controllers/setorController";

const router = Router();
const setorController = new SetorController();

router.post("/setor", setorController.create);
router.get("/setor", setorController.listarNomes);

export default router;
