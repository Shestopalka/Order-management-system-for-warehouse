import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddRoleDto } from 'src/auth/dto/AddRole.dto';
import { Role } from 'src/enums/role.enum';
import { IHandler } from 'src/interfaces/handler.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddRoleHandler implements IHandler<AddRoleDto, void> {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}
  async handle(dto: AddRoleDto): Promise<void> {
    try {
      await this.usersService.getUserById(dto.userId);

      if (
        dto.role !== Role.WORKER &&
        dto.role !== Role.ADMIN &&
        dto.role !== Role.MANAGER
      ) {
        throw new BadRequestException('This role does not exist.');
      }
      if (dto.secret_key !== this.config.get<string>('SECRET_KEY')) {
        throw new BadRequestException('Invalid access key');
      }
    } catch (err) {
      throw err;
    }
  }
}
