import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Usuario } from "../models/usuario";

export class UsuarioController {
  private repo = AppDataSource.getRepository(Usuario);

  // ➤ Criar usuário
  create = async (req: Request, res: Response) => {
    try {
      const { nome, email, senha, cpf, registroConselho, cargo } = req.body;

      // Evita email duplicado
      const existing = await this.repo.findOne({ where: { email } });
      if (existing) {
         res.status(400).json({ error: "Email já cadastrado." });
         return
      }

      const user = this.repo.create({
        nome,
        email,
        senha,
        cpf,
        registroConselho,
        cargo
      });

      const saved = await this.repo.save(user);

      // Não retorna senha
      delete (saved as any).senha;

       res.status(201).json(saved);
       return
    } catch (err) {
      console.error(err);
       res.status(500).json({ error: "Erro ao criar usuário." });
       return
    }
  };

  // ➤ Listar todos
  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.repo.find();

      const sanitized = users.map((u) => {
        delete (u as any).senha;
         u;
         return
      });

       res.json(sanitized);
       return
    } catch (err) {
       res.status(500).json({ error: "Erro ao buscar usuários." });
       return
    }
  };

  // ➤ Buscar por ID
  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this.repo.findOne({ where: { id: Number(id) } });

      if (!user) {
         res.status(404).json({ error: "Usuário não encontrado." });
         return
      }

      delete (user as any).senha;

       res.json(user);
       return
    } catch (err) {
       res.status(500).json({ error: "Erro ao buscar usuário." });
       return
    }
  };

  // ➤ Atualizar
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const user = await this.repo.findOne({ where: { id: Number(id) } });

      if (!user) {
         res.status(404).json({ error: "Usuário não encontrado." });
         return
      }

      // Se senha nova vier, hash será tratado pelo @BeforeUpdate
      if (!data.senha) {
        data.senha = user.senha; // mantém a senha antiga
      }

      this.repo.merge(user, data);
      const updated = await this.repo.save(user);

      delete (updated as any).senha;

       res.json(updated);
       return
    } catch (err) {
      console.error(err);
       res.status(500).json({ error: "Erro ao atualizar usuário." });
       return
    }
  };

  // ➤ Deletar
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this.repo.findOne({ where: { id: Number(id) } });

      if (!user) {
         res.status(404).json({ error: "Usuário não encontrado." });
         return
      }

      await this.repo.remove(user);

       res.json({ message: "Usuário deletado com sucesso." });
       return
    } catch (err) {
       res.status(500).json({ error: "Erro ao deletar usuário." });
       return
    }
  };
}
