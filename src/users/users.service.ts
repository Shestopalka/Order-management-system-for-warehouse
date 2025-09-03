import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegDto } from 'src/auth/dto/registration.dto';
import { Users } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async createUser(dto: RegDto) {
    try {
      const hashedPass = await bcrypt.hash(dto.password, 10);
      dto.password = hashedPass;
      const user = this.userRepo.create({ ...dto });
      return await this.userRepo.save(user);
    } catch (err) {
      throw err;
    }
  }
  async getUserById(userId: number) {
    const existUser = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
    if (!existUser) throw new BadRequestException('User not found');
    return existUser;
  }

  async getUserByEmail(email: string) {
    const existUser = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });
    if (!existUser) throw new BadRequestException('User not found');
    return existUser;
  }

  async getAllUser() {
    return await this.userRepo.find();
  }
  async updateUser(dto: UpdateUserDto) {
    const existUser = await this.getUserById(dto.userId);
    await this.userRepo.update({ id: existUser.id }, { ...dto.updateData });
  }
  async deleteUser(userId: number) {
    return await this.userRepo.delete(userId);
  }
}
