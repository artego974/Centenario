import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Patologia } from "../models/patologia";

export class PatologiaController {
  private repo = AppDataSource.getRepository(Patologia);

  criar = async (req: Request, res: Response) => {
    try {
      const patologia = this.repo.create(req.body);
      await this.repo.save(patologia);
      res.status(201).json(patologia);
    } catch (err) {
      res.status(400).json({ erro: "Erro ao cadastrar patologia", detalhes: err });
    }
  };

  listar = async (req: Request, res: Response) => {
    const patologias = await this.repo.find({ relations: ["leitos"] });
    res.json(patologias);
  };

  buscarPorId = async (req: Request, res: Response) => {
    const patologia = await this.repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["leitos"]
    });

    if (!patologia){
        res.status(404).json({ erro: "Patologia não encontrada" });
        return
    }  
    res.json(patologia);
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
    res.json({ mensagem: "Patologia removida" });
  };
}
