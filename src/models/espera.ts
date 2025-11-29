import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("PessoaEspera")
export class PessoaEspera {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  cor: string;

  @Column({ type: "number", length: 50, nullable: false })
  quantidade: number; 

  constructor(cor: string, quantidade: number) {
    this.cor = cor;
    this.quantidade = quantidade;
  }
}
