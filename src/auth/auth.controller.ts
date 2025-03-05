import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify')
  async verifyUser(@Req() req) {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = await this.authService.verifyToken(token);
      await this.authService.saveUser(decodedToken.uid, decodedToken.email);
      return { uid: decodedToken.uid, email: decodedToken.email };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
