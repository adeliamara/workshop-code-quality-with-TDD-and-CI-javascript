import express from 'express';
import request from 'supertest';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let app: express.Express;
  let userService: UserService;

  beforeEach(() => {
    userService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      count: jest.fn(),
    } as unknown as UserService;

    const userController = new UserController(userService);
    app = express();
    app.use(express.json());
    app.use('/users', userController.getRouter());
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
        email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date(),
        id: 0,
        removed: false
    };
    const user = { id: 1, ...createUserDto } as unknown as User;

    jest.spyOn(userService, 'create').mockResolvedValue(user);

    const response = await request(app)
      .post('/users')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toEqual({ id: user.id });
  });

  it('should return an array of users', async () => {
    const users = [{ id: 1, email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date() }] as User[];
  
    jest.spyOn(userService, 'findAll').mockResolvedValue(users);
  
    const response = await request(app)
      .get('/users')
      .expect(200);
  
    expect(response.body).toEqual(users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthDate: user.birthDate.toISOString(), 
    })));
  });
  
  it('should return a user by ID', async () => {
    const user = { id: 1, email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date() } as User;

    jest.spyOn(userService, 'findOne').mockResolvedValue(user);

    const response = await request(app)
      .get('/users/1')
      .expect(200);

    expect(response.body).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthDate: user.birthDate.toISOString(), 
    });
  });

  it('should return 404 if user not found', async () => {
    jest.spyOn(userService, 'findOne').mockRejectedValue(new NotFoundException('User with ID 1 not found.'));

    await request(app)
      .get('/users/1')
      .expect(404);
  });

  it('should delete a user', async () => {
    jest.spyOn(userService, 'remove').mockResolvedValue({} as User);

    await request(app)
      .delete('/users/1')
      .expect(204);
  });

  it('should return user count', async () => {
    jest.spyOn(userService, 'count').mockResolvedValue(5);

    const response = await request(app)
      .get('/users/count')
      .expect(200);

    expect(response.body).toEqual({ count: 5 });
  });
});
