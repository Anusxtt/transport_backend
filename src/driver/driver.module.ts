import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
