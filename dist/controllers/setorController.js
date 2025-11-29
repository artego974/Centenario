"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetorController = void 0;
const data_source_1 = require("../config/data-source");
const setor_1 = require("../models/setor");
class SetorController {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(setor_1.Setor);
    }
    async create(req, res) {
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao criar setor." });
            return;
        }
    }
    async listarNomes(req, res) {
        try {
            // Busca SOMENTE o campo nome
            const setores = await this.repo.find({
                select: ["nome"], // Apenas nome
            });
            res.json(setores);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar setores." });
            return;
        }
    }
}
exports.SetorController = SetorController;
