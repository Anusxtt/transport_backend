import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsController } from './rating.controller';
import { RatingsService } from './rating.service';
import { Driver } from 'src/driver/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Driver])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}
