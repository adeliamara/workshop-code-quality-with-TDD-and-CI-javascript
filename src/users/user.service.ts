import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
      return this.userRepository.find()   
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOne(id: number) {

    const result: User = await this.userRepository.findOneBy({id: id});

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return result;
  }

  async remove(id: number) {
    const user: User = await this.findOne(id)
    return this.userRepository.softRemove(user);
  }

  async count(){
    return await this.userRepository.count();
  }

}