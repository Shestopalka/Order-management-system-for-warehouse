import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { HandlerModule } from 'src/handlers/handler.module';

console.log('Jwt secret', process.env.JWT_SECRET);

@Module({
  imports: [UsersModule, HandlerModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
