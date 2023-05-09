import * as SQLite from 'expo-sqlite';
import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from '../models';

const config: DataSourceOptions = {
  database: 'QRCupons.db',
  type: 'expo',
  driver: SQLite,
  entities: entities,
  logging: true,
  // synchronize: true,
};
// const config: DataSourceOptions = {
//   type: 'mongodb',
//   url: 'mongodb+srv://android:2rURiRoKekPtPz5d@cupons.bnw3d.mongodb.net/QrC?retryWrites=true&w=majority',
//   useNewUrlParser: true,
//   synchronize: true,
//   logging: true,
//   entities: entities,
// };

// const myDataSource = new DataSource({
//     type: "mongodb",
//     host: "localhost",
//     port: 27017,
//     database: "test",
// })

export const dataSource = new DataSource(config);
