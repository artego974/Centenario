import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Setor } from "./setor";
import { Patologia } from "./patologia";

@Entity("leito")
export class Leito {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  status!: string;

  @ManyToOne(() => Setor, (setor) => setor.leitos, { onDelete: "CASCADE" })
  setor!: Setor;

  @ManyToOne(() => Patologia, (patologia) => patologia.leitos, {
    onDelete: "SET NULL",
    nullable: true
  })
  patologia!: Patologia | null;

  
  constructor(init?: Partial<Leito>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
