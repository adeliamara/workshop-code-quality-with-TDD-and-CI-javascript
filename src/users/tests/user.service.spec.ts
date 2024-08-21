import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      softRemove: jest.fn(),
      count: jest.fn(),
    } as unknown as Repository<User>;

    userService = new UserService(userRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
          email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date(),
          id: 0,
          removed: false
      };
      const user: User = { id: 1, ...createUserDto } as unknown as User;

      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      expect(await userService.create(createUserDto)).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date() }] as User[];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      expect(await userService.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date() } as User;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      expect(await userService.findOne(1)).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(userService.findOne(1)).rejects.toThrow('User with ID 1 not found.');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = { id: 1, email: 'test@test.com', name: 'Test', phone: '1234567890', birthDate: new Date() } as User;

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'softRemove').mockResolvedValue(user);

      expect(await userService.remove(1)).toEqual(user);
    });
  });

  describe('count', () => {
    it('should return the user count', async () => {
      jest.spyOn(userRepository, 'count').mockResolvedValue(5);

      expect(await userService.count()).toBe(5);
    });
  });
});
