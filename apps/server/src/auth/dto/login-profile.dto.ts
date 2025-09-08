import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginProfileDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
