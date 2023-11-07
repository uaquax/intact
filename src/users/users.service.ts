import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateUser(id: string, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
