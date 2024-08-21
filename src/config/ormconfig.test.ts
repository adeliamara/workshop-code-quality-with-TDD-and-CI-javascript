import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import 'dotenv/config'

export const testDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_TEST,
  port: Number(process.env.DB_PORT_TEST),
  username:process.env.DB_USER_TEST,
  password:String(process.env.DB_PASSWORD_TEST),
  database: process.env.DB_NAME_TEST,
  synchronize: true,
  entities: [User]
});
