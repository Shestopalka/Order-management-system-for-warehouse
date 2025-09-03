import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  userId: number;

  updateData: {
    role?: string;
    email?: string;
    userName?: string;
  };
}
