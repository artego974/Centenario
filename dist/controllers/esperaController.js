"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaEsperaController = void 0;
const data_source_1 = require("../config/data-source");
const espera_1 = require("../models/espera");
class PessoaEsperaController {
    async list(req, res) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(espera_1.PessoaEspera);
            const lista = await repo.find();
            return res.json(lista);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao listar triagem." });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const { quantidade } = req.body;
        try {
            const repo = data_source_1.AppDataSource.getRepository(espera_1.PessoaEspera);
            const pessoa = await repo.findOne({
                where: { id: Number(id) },
            });
            if (!pessoa) {
                return res.status(404).json({ message: "Registro não encontrado." });
            }
            pessoa.quantidade = quantidade ?? pessoa.quantidade;
            // ⭐ AQUÍ! Atualiza a data da última alteração ⭐
            pessoa.date = new Date();
            await repo.save(pessoa);
            return res.status(200).json({
                message: "Atualizado com sucesso!",
                pessoa,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar." });
        }
    }
    async ultimaAtualizacao(req, res) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(espera_1.PessoaEspera);
            const resultado = await repo
                .createQueryBuilder("espera")
                .select("MAX(espera.date)", "ultima")
                .getRawOne();
            return res.json({
                ultimaAtualizacao: resultado.ultima
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter última atualização." });
        }
    }
}
exports.PessoaEsperaController = PessoaEsperaController;
