import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export type CreateSaveUrlsParams = {
  sourceUrl : string
}

export type IdParameter = {
  id : number
}

export type infoUrls = {
  id: number;
  sourceUrl: string;
  isCompleted: boolean;
};

@Entity("urls")
export class Urls {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "sourceUrl", type: "varchar" })
  sourceUrl!: string;

  @Column({ name: "isCompleted", type: "boolean" })
  isCompleted: boolean = false;

}
