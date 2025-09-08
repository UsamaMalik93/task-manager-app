import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { VALID_ORGANIZATION_IDS } from 'src/utils/organizations';

export class RegisterProfileDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(VALID_ORGANIZATION_IDS, { message: 'Invalid organization ID' })
  organizationId: string;

  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsPhoneNumber('US')
  @IsNotEmpty()
  phone: string;
}
