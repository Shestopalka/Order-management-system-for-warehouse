import { AddRoleDto } from 'src/auth/dto/AddRole.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { RegDto } from 'src/auth/dto/registration.dto';

export type TDto = RegDto | LoginDto | AddRoleDto | PayloadDto;
