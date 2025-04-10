import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  ForbiddenException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body) {
    return this.usersService.register(
      body.username,
      body.email,
      body.password,
      body.phone,
    );
  }

  @Post('login')
  async login(@Body() body) {
    return this.usersService.login(body.identifier, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    console.log('✅ Log: req.user ->', (req as any).user);

    if (!(req as any).user) {
      throw new ForbiddenException('User not found');
    }

    return this.usersService.getUserById((req as any).user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Req() req: Request, @Body() body) {
    console.log('📌 Log: กำลังอัปเดตข้อมูล ->', body);

    if (!(req as any).user) {
      throw new ForbiddenException('User not found');
    }

    return this.usersService.updateProfile(
      (req as any).user.id,
      body.username,
      body.email,
      body.phone,
    );
  }
}
