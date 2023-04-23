import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



export type infoCupom2 = {
  numeroCnpj: number;
  nomeFantasia: string;
  endereco: string;
  dataHoraCupom: number;
  valorTotalCupom: string;
  itensdoCupom: string;
  user_id: string;
  sourceUrl: string
}



@Entity("cupons2")
export class Cupons2 {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "numeroCnpj", type: "varchar" })
  numeroCnpj!: number;
  @Column({ name: "nomeFantasia", type: "varchar" })
  nomeFantasia!: string;
  @Column({ name: "endereco", type: "varchar" })
  endereco!: string;

  @Column({ name: "dataHoraCupom", type: "varchar" })
  dataHoraCupom!: number;
  @Column({ name: "valorTotalCupom", type: "varchar" })
  valorTotalCupom!: string;
  @Column({ name: "itensdoCupom", type: "varchar" })
  itensdoCupom!: string;
  @Column({ name: "user_id", type: "varchar" })
  user_id!: string;
  @Column({ name: "sourceUrl", type: "varchar" })
  sourceUrl!: string;
}
