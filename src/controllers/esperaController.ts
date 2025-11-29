import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { PessoaEspera } from "../models/espera";

export class PessoaEsperaController {

  async list(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(PessoaEspera);
      const lista = await repo.find();

      return res.json(lista);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar triagem." });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params; 
    const { quantidade } = req.body;

    try {
      const repo = AppDataSource.getRepository(PessoaEspera);

      const pessoa = await repo.findOne({
        where: { id: Number(id) },
      });

      if (!pessoa) {
        return res.status(404).json({ message: "Registro não encontrado." });
      }

      pessoa.quantidade = quantidade ?? pessoa.quantidade;

      // ⭐ ISSO QUE FAZIA FUNCIONAR ⭐
      pessoa.date = new Date();

      await repo.save(pessoa);

      return res.status(200).json({
        message: "Atualizado com sucesso!",
        pessoa,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar." });
    }
  }

  // ⭐ O ENDPOINT QUE FUNCIONAVA ⭐
  async ultimaAtualizacao(req: Request, res: Response) {
  try {
    const repo = AppDataSource.getRepository(PessoaEspera);

    const { ultima } = await repo
      .createQueryBuilder("espera")
      .select("MAX(espera.date)", "ultima")
      .getRawOne();

    return res.json({ ultimaAtualizacao: ultima }); // IGUAL AO LEITOS
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar última atualização." });
  }
}

}
