import express, { Request, Response, NextFunction, Router } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export class UserController {
  private router: Router;

  constructor(private readonly userService: UserService) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.createUser.bind(this));
    this.router.get('/', this.findAllUsers.bind(this));
    this.router.get('/count', this.getUserCount.bind(this));
    this.router.get('/:id', this.findUserById.bind(this));
    this.router.delete('/:id', this.deleteUserById.bind(this));
    this.router.use(this.errorHandler); // Certifique-se de que o errorHandler está configurado após todas as rotas
  }

  private async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDto: CreateUserDto = req.body;
      const user: User = await this.userService.create(createUserDto);
      const safeResponse: Partial<CreateUserDto> = {
        id: user.id,
      };
      res.status(201).json(safeResponse);
    } catch (error) {
      next(error); 
    }
  }

  private async findAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await this.userService.findAll();
      const safeResponse = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        birthDate: user.birthDate,
      }));
      res.json(safeResponse);
    } catch (error) {
      next(error); 
    }
  }

  private async getUserCount(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await this.userService.count();
      res.json({ count });
    } catch (error) {
      next(error); 
    }
  }

  private async findUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw { statusCode: 400, message: 'Invalid user ID' };
      }
      const user: User = await this.userService.findOne(id);
      if (!user) {
        throw { statusCode: 404, message: 'User not found' };
      }
      const safeResponse: any = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        birthDate: user.birthDate
      };
      res.json(safeResponse);
    } catch (error) {
      next(error); 
    }
  }

  private async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id, 10);
      await this.userService.remove(id);
      res.status(204).send();
    } catch (error) {
      next(error); 
    }
  }

  private errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode).json({ error: message });
  }

  public getRouter(): Router {
    return this.router;
  }
}
