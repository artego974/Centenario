import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Leito } from "./leito";

@Entity("patologia")
export class Patologia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  cid: string;

  @OneToMany(() => Leito, (leito) => leito.patologia)
  leitos!: Leito[];

  constructor(nome: string, cid: string) {
    this.nome = nome;
    this.cid = cid;
  }
}
