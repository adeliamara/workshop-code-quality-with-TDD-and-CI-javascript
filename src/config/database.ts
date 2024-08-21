import { DataSourceOptions } from 'typeorm';
import 'dotenv/config'
import { User } from '../users/entities/user.entity';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username:process.env.DB_USER,
  password:String(process.env.DB_PASSWORD),
  database: process.env.NODE_ENV === 'test' ? `${process.env.DB_NAME}_test` : process.env.DB_NAME,
  synchronize: true,
  entities: [User],
  extra: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  },
};
