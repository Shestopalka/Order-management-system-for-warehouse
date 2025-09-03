import { IsNotEmpty } from 'class-validator';

export class AddRoleDto {
  @IsNotEmpty()
  secret_key: string;
  userId: number;
  role: string;
}
