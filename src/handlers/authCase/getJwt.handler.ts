import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/auth/dto/payload.dto';

import { IHandler } from 'src/interfaces/handler.interface';

@Injectable()
export class GetJwt implements IHandler<PayloadDto, string> {
  constructor(private readonly jwtService: JwtService) {}
  async handle(dto: PayloadDto): Promise<string> {
    const access_token = await this.jwtService.sign({
      email: dto.email,
      role: dto.role,
      userId: dto.userId,
    });
    return access_token;
  }
}
