import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegDto } from 'src/auth/dto/registration.dto';
import { Users } from 'src/db/entities/user.entity';
import { IHandler } from 'src/interfaces/handler.interface';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class RegHandler implements IHandler<RegDto, void> {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}
  async handle(dto: RegDto): Promise<void> {
    const existUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existUser) throw new BadRequestException('This email already exist!');
  }
}
