import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  ForbiddenException,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import * as path from 'path';

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // คุณอาจต้องสร้างโฟลเดอร์นี้
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateProfile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    if (!(req as any).user) {
      throw new ForbiddenException('User not found');
    }

    const imagePath = file ? `uploads/${file.filename}` : undefined;

    return this.usersService.updateProfile(
      (req as any).user.id,
      body.username,
      body.email,
      body.phone,
      imagePath,
    );
  }
}