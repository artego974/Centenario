import { Router } from "express";
import { PessoaEsperaController } from "../controllers/esperaController";

const router = Router();
const pessoaEsperaController = new PessoaEsperaController();

router.put("/setor", pessoaEsperaController.update);


export default router;
