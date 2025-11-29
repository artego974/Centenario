import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Setor } from "../models/setor";

export class SetorController {
  private repo = AppDataSource.getRepository(Setor);

  async create(req: Request, res: Response) {
    const { nome, qntdLeitos } = req.body;

    try {
      const setor = this.repo.create({
        nome,
        qntdLeitos,
      });

      await this.repo.save(setor);

       res.status(201).json({
        message: "Setor criado com sucesso!",
        setor,
      });
      return;
    } catch (error) {
      console.error(error);
       res.status(500).json({ message: "Erro ao criar setor." });
       return
    }
  }

  
  async listarNomes(req: Request, res: Response) {
    try {
      // Busca SOMENTE o campo nome
      const setores = await this.repo.find({
        select: ["nome"], // Apenas nome
      });

       res.json(setores);
       return
    } catch (error) {
      console.error(error);
       res.status(500).json({ message: "Erro ao buscar setores." });
       return
    }
  }
}
