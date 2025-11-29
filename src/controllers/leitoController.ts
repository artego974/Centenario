import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Leito } from "../models/leitos";
import { Setor } from "../models/setor";
import { Patologia } from "../models/patologia";

export class LeitoController {
  private repo = AppDataSource.getRepository(Leito);
  private setorRepo = AppDataSource.getRepository(Setor);
  private patologiaRepo = AppDataSource.getRepository(Patologia);

  criar = async (req: Request, res: Response) => {
    try {
      const { status, setorId, patologiaId } = req.body;

      const setor = await this.setorRepo.findOne({ where: { id: setorId } });
      const patologia = await this.patologiaRepo.findOne({ where: { id: patologiaId } });

      if (!setor){
        res.status(404).json({ erro: "Setor não encontrado" });
        return
      }  

      const leito = this.repo.create({
        status,
        setor,
        patologia: patologia || null
      });

      await this.repo.save(leito);
      res.status(201).json(leito);
    } catch (err) {
      res.status(400).json({ erro: "Erro ao cadastrar leito", detalhes: err });
    }
  };

  listar = async (req: Request, res: Response) => {
    const leitos = await this.repo.find({
      relations: ["setor", "patologia"]
    });
    res.json(leitos);
  };

  buscarPorId = async (req: Request, res: Response) => {
    const leito = await this.repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["setor", "patologia"]
    });

    if (!leito){
        res.status(404).json({ erro: "Leito não encontrado" });
        return
    } 
    res.json(leito);
  };

  atualizar = async (req: Request, res: Response) => {
    const { status, setorId, patologiaId } = req.body;

    const leito = await this.repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["setor", "patologia"]
    });

    if (!leito){
        res.status(404).json({ erro: "Leito não encontrado" });
        return
    }  

    if (status){
        leito.status = status;
    } 

    if (setorId) {
      const setor = await this.setorRepo.findOne({ where: { id: setorId } });
      if (!setor){
        res.status(404).json({ erro: "Setor não encontrado" });
        return
      }  
      leito.setor = setor;
    }

    if (patologiaId !== undefined) {
      const patologia = await this.patologiaRepo.findOne({ where: { id: patologiaId } });
      leito.patologia = patologia || null;
    }

    await this.repo.save(leito);
    res.json(leito);
  };

  deletar = async (req: Request, res: Response) => {
    await this.repo.delete(req.params.id);
    res.json({ mensagem: "Leito removido" });
  };
}
