import { DataSource } from 'typeorm';
import { config } from './database';

export const AppDataSource = new DataSource(config); 