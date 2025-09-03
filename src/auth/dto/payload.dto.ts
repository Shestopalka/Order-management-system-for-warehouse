import { IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  userId: number;
  email: string;
  role: string;
}
