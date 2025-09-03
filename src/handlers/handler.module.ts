import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/auth/jwt/jwt.module';
import { UsersModule } from 'src/users/users.module';
import { RegHandler } from './authCase/reg.handler';
import { GetJwt } from './authCase/getJwt.handler';
import { LoginHandler } from './authCase/login.handler';
import { AddRoleHandler } from './authCase/addRole.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UsersModule, JwtConfigModule],
  providers: [RegHandler, GetJwt, LoginHandler, AddRoleHandler],
  exports: [RegHandler, GetJwt, LoginHandler, AddRoleHandler],
})
export class HandlerModule {}
