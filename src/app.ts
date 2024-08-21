import express from 'express';
import { UserController } from './users/user.controller'; // Exemplo de importação de um controlador
import { User } from './users/entities/user.entity';
import { AppDataSource } from './config/data-source';
import { UserService } from './users/user.service';

const app = express();

app.use(express.json()); // Para analisar JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Para analisar dados de formulário

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
app.use('/users', new UserController(userService).getRouter()); // Exemplo de uso de um controlador

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
