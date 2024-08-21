import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { testDataSource } from '../../config/ormconfig.test'; // Importe a configuração do SQLite

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = testDataSource;
    await dataSource.initialize();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: dataSource.getRepository(User),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  beforeEach(async () => {
    await userRepository.clear(); // Limpa a tabela antes de cada teste
  });

  describe('Basic CRUD Operations', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a user', async () => {
      const userDto = { email: 'test@example.com', name: 'test',birthDate: new  Date() } as CreateUserDto;
      const user = await service.create(userDto);

      expect(user).toHaveProperty('id');
      expect(user.email).toEqual(userDto.email);
    });

    it('should find a user by email', async () => {
      const userDto = { email: 'test@example.com', name: 'test',birthDate: new  Date() } as CreateUserDto;
      await service.create(userDto);

      const foundUser = await service.findOneByEmail(userDto.email);
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toEqual(userDto.email);
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      const email = 'nonexistent@example.com';

      await expect(service.findOneByEmail(email)).rejects.toThrow(NotFoundException);
    });

    it('should remove a user', async () => {
      const userDto = { email: 'test@example.com', name: 'test',birthDate: new  Date() } as CreateUserDto;
      const user = await service.create(userDto);

      await service.remove(user.id);

      await expect(service.findOne(user.id)).rejects.toThrow(NotFoundException);
    });
  });
});
