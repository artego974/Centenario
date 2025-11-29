import { Router } from "express";
import { PessoaEsperaController } from "../controllers/esperaController";

const router = Router();
const pessoaEsperaController = new PessoaEsperaController();

router.put("/:id", pessoaEsperaController.update.bind(pessoaEsperaController));

router.get("/", pessoaEsperaController.list.bind(pessoaEsperaController));

router.get(
  "/ultima/atualizacao",
  pessoaEsperaController.ultimaAtualizacao.bind(pessoaEsperaController)
);

export default router;