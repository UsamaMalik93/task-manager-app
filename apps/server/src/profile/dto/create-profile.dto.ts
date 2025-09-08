import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

import { APP_ROLES } from 'src/app/app.roles';
import { BaseModel } from 'src/common/models/base.model';
import { PROFILE_STATUS } from 'src/utils/constants';

export class CreateProfileDto extends BaseModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  avatar: string;

  isVerified: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEnum(APP_ROLES, { each: true })
  roles: APP_ROLES[];

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}
