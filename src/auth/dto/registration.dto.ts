import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(4)
  username: string;
}
