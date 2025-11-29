import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Setor } from "../models/setor";

export class SetorController {
  private repo = AppDataSource.getRepository(Setor);

  criar = async (req: Request, res: Response) => {
    try {
      const setor = this.repo.create(req.body);
      await this.repo.save(setor);
      res.status(201).json(setor);
    } catch (err) {
      res.status(400).json({ erro: "Erro ao cadastrar setor", detalhes: err });
    }
  };

  listar = async (req: Request, res: Response) => {
    const setores = await this.repo.find({ relations: ["leitos"] });
    res.json(setores);
  };

  buscarPorId = async (req: Request, res: Response) => {
    const setor = await this.repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["leitos"]
    });

    if (!setor){
        res.status(404).json({ erro: "Setor não encontrado" });
        return
    }  
    res.json(setor);
  };

  atualizar = async (req: Request, res: Response) => {
    await this.repo.update(req.params.id, req.body);
    const atualizado = await this.repo.findOne({
      where: { id: Number(req.params.id) }
    });

    res.json(atualizado);
  };

  deletar = async (req: Request, res: Response) => {
    await this.repo.delete(req.params.id);
    res.json({ mensagem: "Setor removido" });
  };
}
