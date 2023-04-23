import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Task } from "./Task";

// interface TodoParams extends Partial<Urls> {}
import { Urls } from "./Urls";

export type infoCupom = {
  infoHeader: headerCupom;
  dataHoraCupom: string;
  valorTotalCupom: string;
  itensdoCupom: string;
  user_id: string;
  sourceUrl: string
}

export type headerCupom = {
  numeroCnpj: number;
  nomeFantasia: string;
  endereco: string
}

@Entity("cupons")
export class Cupons {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "cabecalhoCupom", type: "varchar" })
  infoHeader!: headerCupom;
  @Column({ name: "dataHoraCupom", type: "varchar" })
  dataHoraCupom!: string;
  @Column({ name: "valorTotalCupom", type: "varchar" })
  valorTotalCupom!: string;
  @Column({ name: "itensdoCupom", type: "varchar" })
  itensdoCupom!: string;
  @Column({ name: "user_id", type: "varchar" })
  user_id!: string;
  @Column({ name: "sourceUrl", type: "varchar" })
  sourceUrl!: string;

  // @Column({ name: "is_completed", type: "boolean" })
  // isCompleted: boolean = false;

//  @ManyToOne(() => Urls)
// @JoinColumn({ name: "url_id" })
// tasks?: Task[];

  // @OneToOne(() => Urls)
  // @JoinColumn()
  // url!: Urls;

  @OneToOne(type => Urls)
    @JoinColumn()
    urls: Urls;
}
