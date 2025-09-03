import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { AddRoleDto } from './dto/AddRole.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() regDto: RegDto) {
    return await this.authService.regUser(regDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto);
  }

  @Post('add-Role')
  async addAdmin(@Body() addRoleDto: AddRoleDto) {
    return await this.authService.addAdminRole(addRoleDto);
  }
}
