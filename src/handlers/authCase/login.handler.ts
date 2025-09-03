import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { IHandler } from 'src/interfaces/handler.interface';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginHandler implements IHandler<LoginDto, number> {
  constructor(private readonly usersService: UsersService) {}
  async handle(dto: LoginDto): Promise<number> {
    try {
      const existUser = await this.usersService.getUserByEmail(dto.email);
      const isValidPass = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!isValidPass) throw new BadRequestException('Password is not valid');

      return existUser.id;
    } catch (err) {
      throw err;
    }
  }
}
