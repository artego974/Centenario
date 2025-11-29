import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Leito } from "./leito";

@Entity("setor")
export class Setor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  nome: string;

  @Column({ type: "int", nullable: false })
  qntdLeitos: number;

  @OneToMany(() => Leito, (leito) => leito.setor)
  leitos!: Leito[];   

  constructor(nome: string, qntdLeitos: number) {
    this.nome = nome;
    this.qntdLeitos = qntdLeitos;
  }
}
