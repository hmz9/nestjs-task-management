import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'hamza',
  password: 'edkasa',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: [__dirname + '/../**/*.migrations.ts'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
