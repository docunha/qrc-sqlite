import * as SQLite from "expo-sqlite";
import { DataSource, DataSourceOptions } from "typeorm";
import { entities } from "../models";

const config: DataSourceOptions = {
  database: "QRCupons.db",
  type: "expo",
  driver: SQLite,
  entities: entities,
  logging: true,
  synchronize: true,
};

export const dataSource = new DataSource(config);
