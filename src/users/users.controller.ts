import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UsersService } from "./users.service";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("last_active/update")
  async updateLastActive(@GetUser("sub") id: string) {
    await this.usersService.updateLastActive(id);
  }

  @Get("last_active")
  async getLastActive(@GetUser("sub") id: string) {
    return {
      last_active: (await this.usersService.findById(id)).lastActive,
    };
  }

  @Public()
  @Get("last_active/:id")
  async getUserLastActive(@Param() id: string) {
    return {
      last_active: (await this.usersService.findById(id)).lastActive,
    };
  }

  @Public()
  @Get(":id")
  getUserById(@Param("id") id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() user: User): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
