import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService, ITokenReturnBody, ITokenShape } from './auth.service';
import { SignupPayload } from './auth.types';
import { LoginProfileDto } from './dto/login-profile.dto';
import { JwtAuthGuard } from './decorators/jwt-auth.guard';
import { User } from './decorators/user.decorator';
import { Profile } from '../profile/profile.model';
import {
  ResetPasswordDto,
  SendResetPasswordEmailDto,
} from './dto/password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginProfileDto, @Res() res: Response) {
    const result = await this.authService.login(payload, res);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    const result = await this.authService.logout(res);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('me')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
    }
    
    const user = await this.authService.getProfileFromToken(token);
    return res.status(HttpStatus.OK).json({ user });
  }

  @Post('register')
  register(@Body() signupPayload: SignupPayload): Promise<ITokenShape> {
    return this.authService.register(signupPayload);
  }

  @Post('reset-password-email')
  sendResetPasswordEmail(
    @Body() payload: SendResetPasswordEmailDto,
  ): Promise<boolean> {
    return this.authService.sendResetPasswordEmail(payload);
  }

  @Patch('reset-password')
  resetPassword(@Body() payload: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(payload);
  }

  @Get('verify-email/:token')
  verifyEmail(@Param('token') token: string): Promise<boolean> {
    return this.authService.verifyEmail(token);
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.authService.refreshTokenFromRequest(req as any, res);
  }
}
