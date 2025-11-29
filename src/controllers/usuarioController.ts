import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Usuario } from "../models/usuario";
import bcrypt from "bcrypt";

export class UsuarioController {
  private repo = AppDataSource.getRepository(Usuario);

  async cadastrar(req: Request, res: Response) {
    const { nome, email, senha, cpf, registroConselho, cargo } = req.body;

    try {
      // Verifica se email já existe
      const existente = await this.repo.findOne({ where: { email } });

      if (existente) {
        return res.status(400).json({ message: "Email já cadastrado." });
      }

      // Cria usuário (hash acontece automaticamente pela entidade)
      const usuario = this.repo.create({
        nome,
        email,
        senha,
        cpf,
        registroConselho,
        cargo,
      });

      await this.repo.save(usuario);

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
  }

  // ===============================
  // LOGIN
  // ===============================
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const usuario = await this.repo.findOne({ where: { email } });

      if (!usuario) {
        return res.status(400).json({ message: "Email ou senha inválidos." });
      }

      // Compara senhas
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(400).json({ message: "Email ou senha inválidos." });
      }

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao realizar login." });
    }
  }
      
  };

