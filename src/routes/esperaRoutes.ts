import { Router } from "express";
import { PessoaEsperaController } from "../controllers/esperaController";

const router = Router();
const pessoaEsperaController = new PessoaEsperaController();


router.put("/espera/:id", pessoaEsperaController.update);
router.get("/espera", pessoaEsperaController.list);


export default router;
