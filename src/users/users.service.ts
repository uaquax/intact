import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SerializedUser, User } from "../entities/user.entity";
import { plainToClass } from "class-transformer";
import { encode } from "src/utils/bcrypt";
import { UserParams } from "./user.params";

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

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateUser(id: string, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.findById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateRtHash(id: string, hash: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.hashedRt = hash;

    return await this.usersRepository.save(user);
  }

  async signUp(userParams: UserParams): Promise<SerializedUser> {
    const password = await encode(userParams.password);
    const user = await this.usersRepository.create({
      ...userParams,
      createdAt: new Date(),
      password: password,
    });
    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async logout(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.hashedRt = "";

    return plainToClass(SerializedUser, this.usersRepository.save(user));
  }

  async updateLastActive(id: string) {
    console.log(id);
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException();

    user.lastActive = new Date();

    return await this.usersRepository.save(user);
  }
}
