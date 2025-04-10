import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'default_secret',
      });
      (req as any).user = decoded;
      return true;
    } catch (error) {
      console.log('❌ Token ไม่ถูกต้อง:', error.message);
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
