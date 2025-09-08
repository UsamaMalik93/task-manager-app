import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SendResetPasswordEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
