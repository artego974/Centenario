import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("pessoaEspera")
export class PessoaEspera {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  cor: string;

  @Column({ type: "int", nullable: false })
  quantidade: number; 

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  date: Date;

  constructor(cor: string, quantidade: number, data:Date) {
    this.cor = cor;
    this.quantidade = quantidade;
    this.date = data;
  }
}
