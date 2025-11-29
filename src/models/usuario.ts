import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad, BeforeInsert, BeforeUpdate} from "typeorm";
import bcrypt from "bcrypt"

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  senha: string;

  @Column({ type: "number", length: 255, nullable: false })
  cpf: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  registroConselho: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  cargo: string;

  private originalPassword: string;

  constructor(nome: string, email: string, senha: string, cpf: number, registroConselho:string, cargo:string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.registroConselho = registroConselho;
    this.cargo = cargo;
    this.originalPassword = senha;
  }
  @AfterLoad()
  setOriginalPassword() {
    this.originalPassword = this.senha;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.senha !== this.originalPassword) {
      const salt = await bcrypt.genSalt(10);
      this.senha = await bcrypt.hash(this.senha, salt);
    }
  }
}