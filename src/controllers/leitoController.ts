import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Leito } from "../models/leitos";
import { Setor } from "../models/setor";
import { Patologia } from "../models/patologia";

export class LeitoController {
  private leitoRepo = AppDataSource.getRepository(Leito);
  private setorRepo = AppDataSource.getRepository(Setor);
  private patologiaRepo = AppDataSource.getRepository(Patologia);


  async list(req: Request, res: Response) {
    try {
      const leitos = await this.leitoRepo.find({
        relations: ["setor", "patologia"]
      });

       res.json(leitos);
       return
    } catch (err) {
       res.status(500).json({ error: "Erro ao listar leitos" });
       return
    }
  }

  // Atualizar status (ocupado / livre)
  async atualizarStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const leito = await this.leitoRepo.findOne({ where: { id: Number(id) } });
      if (!leito){
        res.status(404).json({ error: "Leito não encontrado" });
        return
      } 

      leito.status = status;
      await this.leitoRepo.save(leito);

       res.json({ message: "Status atualizado", leito });
       return
    } catch (err) {
       res.status(500).json({ error: "Erro ao atualizar status" });
       return
    }
  }

  // Atualizar patologia (ou remover)
  async atualizarPatologia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { patologiaId } = req.body;

      const leito = await this.leitoRepo.findOne({ where: { id: Number(id) } });
      if (!leito) return res.status(404).json({ error: "Leito não encontrado" });

      if (patologiaId) {
        const patologia = await this.patologiaRepo.findOne({
          where: { id: patologiaId }
        });
        if (!patologia)
          return res.status(404).json({ error: "Patologia não encontrada" });

        leito.patologia = patologia;
      } else {
        leito.patologia = null; // remove patologia
      }

      await this.leitoRepo.save(leito);

      return res.json({ message: "Patologia atualizada", leito });
    } catch (err) {
      return res.status(500).json({ error: "Erro ao atualizar patologia" });
    }
  }
}
