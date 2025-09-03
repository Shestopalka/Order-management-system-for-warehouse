import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { RegHandler } from 'src/handlers/authCase/reg.handler';
import * as bcrypt from 'bcrypt';
import { GetJwt } from 'src/handlers/authCase/getJwt.handler';
import { LoginHandler } from 'src/handlers/authCase/login.handler';
import { AddRoleDto } from './dto/AddRole.dto';
import { AddRoleHandler } from 'src/handlers/authCase/addRole.handler';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly regHandler: RegHandler,
    private readonly getJwt: GetJwt,
    private readonly loginHandler: LoginHandler,
    private readonly addRoleHandler: AddRoleHandler,
  ) {}

  async regUser(regDto: RegDto) {
    await this.regHandler.handle(regDto);

    const user = await this.userService.createUser(regDto);
    const access_token = await this.getJwt.handle({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    return { access_token };
  }

  async loginUser(loginDto: LoginDto) {
    const userId = await this.loginHandler.handle(loginDto);
    const user = await this.userService.getUserById(userId);
    const access_token = await this.getJwt.handle({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    console.log('this acces_token');

    return { access_token };
  }

  async addAdminRole(dto: AddRoleDto) {
    await this.addRoleHandler.handle(dto);
    await this.userService.updateUser({
      userId: dto.userId,
      updateData: { role: dto.role },
    });
    return { message: `Role ${dto.role}, added for user: ${dto.userId}` };
  }
}
