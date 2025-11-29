import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { PessoaEspera } from "../models/espera";

export class PessoaEsperaController {
  private pessoaRepository = AppDataSource.getRepository(PessoaEspera);

  async update(req: Request, res: Response) {
    const { id } = req.params; 
    const { cor, quantidade } = req.body;

    try {
      const pessoa = await this.pessoaRepository.findOne({
        where: { id: Number(id) },
      });

      if (!pessoa) {
         res.status(404).json({ message: "Registro não encontrado." });
         return
      }

      pessoa.cor = cor ?? pessoa.cor;
      pessoa.quantidade = quantidade ?? pessoa.quantidade;

      await this.pessoaRepository.save(pessoa);

       res.status(200).json({
        message: "Atualizado com sucesso!",
        pessoa,
      });
      return
    } catch (error) {
      console.error(error);
       res.status(500).json({ message: "Erro ao atualizar." });
       return
    }
  }
}
