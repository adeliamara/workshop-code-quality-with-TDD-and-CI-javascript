import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(process.env.DB_NAME)

client.connect()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  })
  .finally(() => {
    client.end();
  });
